from flask import Flask, jsonify, request
from flask_cors import CORS
import weave
from openai import OpenAI
import os

# Setup
app = Flask(__name__)
CORS(app, origins=[os.getenv("ALLOWED_ORIGIN")])
client = OpenAI()

# Weave ops to trace
@weave.op()
def get_answer(question):
    # Get completion from OpenAI
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user",
            "content": question
        }]
    )
    return completion.choices[0].message.content

@app.route('/ping')
def ping():
    return 'pong'

@app.route('/qa-bot', methods=['POST'])
def qa_bot_completion():
    try:
        weave.init(f"{os.getenv("WANDB_ENTITY")}/components")
        # Get question from request body
        data = request.get_json()
        if not data or 'question' not in data:
            return jsonify({'error': 'No question provided'}), 400

        question = data['question']

        result, call = get_answer.call(question)
        url = f"https://wandb.ai/{call.project_id}/r/call/{call.id}"
        print(url)

        # Return the response
        return jsonify({
            'answer': result,
            'url': url,
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

