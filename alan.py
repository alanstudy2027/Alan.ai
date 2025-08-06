from flask import Flask, request, jsonify, after_this_request
from flask_cors import CORS
import time
from google import genai

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
genai_client = genai.Client(api_key="AIzaSyD8JREBA3mlLwfacqE0_xNsOx7-VsnFVN8")

def get_response(user_input):
    response = genai_client.models.generate_content(
        model="gemini-1.5-flash",
        contents=user_input
    )
    return response.text

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    # Simulate processing delay
    time.sleep(1)
    response = {
        'id': data.get('id', 0) + 1,
        'text': get_response(user_message),
        'sender': 'ai'
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)