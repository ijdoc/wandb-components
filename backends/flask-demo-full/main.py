from flask import Flask, jsonify, request

# Setup
app = Flask(__name__)

@app.route('/ping')
def ping():
    return 'pong'

@app.route('/qa-bot', methods=['POST'])
def qa_bot_completion():
    from openai import OpenAI
    import weave
    weave.init("components")
    client = OpenAI()
    try:
        # Get question from request body
        data = request.get_json()
        if not data or 'question' not in data:
            return jsonify({'error': 'No question provided'}), 400
            
        question = data['question']
        
        # Get completion from OpenAI
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": question
            }]
        )
        
        # Return the response
        return jsonify({
            'answer': completion.content[0].text
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

