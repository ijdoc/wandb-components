from flask import Flask, jsonify, request
from flask_cors import CORS
import weave
from openai import OpenAI
import os

# Setup
app = Flask(__name__)
CORS(app, origins=[os.getenv("ALLOWED_ORIGIN")])
weave.init("components")
client = OpenAI()

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
        # Get question from request body
        data = request.get_json()
        if not data or 'question' not in data:
            return jsonify({'error': 'No question provided'}), 400

        question = data['question']

        result, call = get_answer.call(question)

        # Return the response
        return jsonify({
            'answer': result,
            'url': f"https://wandb.ai/{call.project_id}/r/call/{call.id}",
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

