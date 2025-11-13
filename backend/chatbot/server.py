# from flask import Flask, request, jsonify
# from sentence_transformers import SentenceTransformer, util
# import json
# import random
# import os
# from dotenv import load_dotenv

# load_dotenv()

# app = Flask(__name__)

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# WHATSAPP_NUMBER = os.getenv("WHATSAPP_NUMBER", "+255657849224")
# CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", 0.60))

# # Load intents
# with open(os.path.join(BASE_DIR, 'intent.json'), 'r') as f:
#     intents = json.load(f)

# # Load embedding model
# model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# # Encode all patterns
# intent_patterns = []
# for intent in intents['intents']:
#     for pattern in intent['patterns']:
#         intent_patterns.append({
#             "embedding": model.encode(pattern, convert_to_tensor=True),
#             "tag": intent['tag'],
#             "responses": intent['responses']
#         })

# # Matching logic
# def get_response_and_intent(user_input: str):
#     user_embedding = model.encode(user_input, convert_to_tensor=True)

#     best_score = -1
#     best_match = None

#     for pattern in intent_patterns:
#         score = util.cos_sim(user_embedding, pattern['embedding']).item()
#         if score > best_score:
#             best_score = score
#             best_match = pattern

#     if best_score < CONFIDENCE_THRESHOLD or best_match["tag"] == "contact_agent":
#         return (
#             "I couldn't quite understand that. Would you like to speak with our agent on WhatsApp?",
#             "fallback",
#             True
#         )

#     response = random.choice(best_match["responses"])
#     return response, best_match["tag"], False

# @app.route('/chat', methods=['POST'])
# def chat():
#     data = request.get_json()
#     user_input = data.get('message', '')

#     if not user_input.strip():
#         return jsonify({'response': "Please type something to continue.", 'intent': 'fallback', 'showWhatsapp': False})

#     response_text, intent_tag, show_whatsapp = get_response_and_intent(user_input)

#     return jsonify({
#         'response': response_text,
#         'intent': intent_tag,
#         'showWhatsapp': show_whatsapp,
#         'whatsappNumber': WHATSAPP_NUMBER if show_whatsapp else None
#     })

# if __name__ == '__main__':
#     port = int(os.environ.get("PORT", 5000))
#     app.run(host="0.0.0.0", port=port)
from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer, util
import json
import random
import os
import numpy as np

# ======================
# Config
# ======================
WHATSAPP_NUMBER = os.getenv("WHATSAPP_NUMBER", "+255657849224")
CONFIDENCE_THRESHOLD = 0.6
MODEL_NAME = 'paraphrase-MiniLM-L6-v2'  # Small but accurate

# ======================
# Initialize App
# ======================
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INTENT_FILE = os.path.join(BASE_DIR, 'intent.json')

# Load intents
with open(INTENT_FILE, 'r') as f:
    intents = json.load(f)

# Load embedding model
embed_model = SentenceTransformer(MODEL_NAME)

# Precompute embeddings for all patterns
intent_patterns = []
for intent in intents['intents']:
    for pattern in intent['patterns']:
        intent_patterns.append({
            "tag": intent['tag'],
            "pattern": pattern,
            "embedding": embed_model.encode(pattern, convert_to_tensor=True),
            "responses": intent['responses']
        })

# ======================
# Response Logic
# ======================
def get_response(user_input: str):
    user_embedding = embed_model.encode(user_input, convert_to_tensor=True)
    
    # Compute cosine similarity with all patterns
    scores = [util.cos_sim(user_embedding, p['embedding']).item() for p in intent_patterns]
    best_idx = np.argmax(scores)
    best_score = scores[best_idx]
    best_pattern = intent_patterns[best_idx]

    # If confidence low or contact_agent intent → forward to WhatsApp
    if best_score < CONFIDENCE_THRESHOLD or best_pattern['tag'] == "contact_agent":
        return {
            "response": f"I'm forwarding you to a real agent on WhatsApp: {WHATSAPP_NUMBER}",
            "intent": "fallback",
            "showWhatsapp": True,
            "whatsappNumber": WHATSAPP_NUMBER
        }

    # Otherwise, return a random response from the best intent
    response_text = random.choice(best_pattern['responses'])
    return {
        "response": response_text,
        "intent": best_pattern['tag'],
        "showWhatsapp": False,
        "whatsappNumber": None
    }

# ======================
# Flask Routes
# ======================
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "").strip()

    if not message:
        return jsonify({
            "response": "Please type something to continue.",
            "intent": "fallback",
            "showWhatsapp": False,
            "whatsappNumber": None
        })

    result = get_response(message)
    return jsonify(result)

# ======================
# Run App
# ======================
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


