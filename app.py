from flask import Flask, request, jsonify
# handle the client-server communication
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
# for machine learning
import pickle
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity
import requests
# database
from pymongo import MongoClient
# base64
import base64

# Database Setting
conn = MongoClient('mongodb+srv://nirmalapusparatna20031107:npr20031107@cluster0.cqhgovi.mongodb.net/')
db = conn.dbfurnifit

# Provide the static directory (the frontend/ flask instance?) path
# provide build of the react app
app = Flask (__name__, static_folder='frontend/build', static_url_path='')
cors = CORS(app)

# Machine Learning handling process 
# Unpickling model process (?)
with open('static/model.pkl', 'rb') as model_file:            # Teteh isi picklenya pake lebih dari 2'table' -> tuple
    loaded_data = pickle.load(model_file)                     # Harus diubah kaya gini buat akses df yang isinya mau kita ambil di sini
vectorizer, tags_tfidf_matrix, df = loaded_data

# FUNCTIONS
# Funtion for text-preprocessing
def preprocess_text(text):                                                  # Implemented in Flask
    # Tokenization
    tokens = word_tokenize(text.lower())
    # Removes punctuation and numbers
    tokens = [token for token in tokens if token.isalpha()]
    # Removes stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    # Stemming
    stemmer = PorterStemmer()
    tokens = [stemmer.stem(token) for token in tokens]
    return " ".join(tokens)

# Function to recommend product names based on descriptions
def recommend_product_names(user_input, n=3):                              # Implemented in Flask
    # Preprocess query
    preprocessed_query = preprocess_text(user_input)
    # Calculates TF-IDF for input user
    user_input_vector = vectorizer.transform([preprocessed_query])
    # Calculating similarity with cosine similarity
    similarities = cosine_similarity(user_input_vector, tags_tfidf_matrix)
    # Get the product index with the highest similarity
    top_indices = similarities.argsort(axis=1)[:, -n:][:, ::-1]
    # Gets the name of the recommended product
    recommended_product_names = [df.iloc[idx]['name'] for idx in top_indices[0]]
    return recommended_product_names

@app.route('/api', methods=['GET'])
@cross_origin() # so there is no CORS 4G request error when react communicate with the Flask Server 
def index():
    "Fetch the name column list values"
    furniture_ids = df['name'].values
    
    furniture = []
    for furniture_id in furniture_ids:
        furniture_str = str(furniture_id)
        furniture.append(furniture_str)
    return {
        "furnitures":furniture
    }
    
# return index.html from the build folder inside react app
@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/furniAdd', methods=['POST'])
def new_furni():
    try:
        # Get the data from the request
        furni_data = request.json

        # Insert the data into MongoDB
        result = db.products_trial.insert_one(furni_data)

        # Check if the data was successfully inserted
        if result.inserted_id:
            return jsonify({'success': True, 'message': 'Data inserted successfully!'}), 200
        else:
            return jsonify({'success': False, 'message': 'Failed to insert data!'}), 500

    except Exception as e:
        # Log the exception for debugging
        print("An error occurred:", str(e))
        return jsonify({'success': False, 'message': 'Internal server error'}), 500
    
@app.route('/getFurni', methods=['GET'])
@cross_origin()
def get_furni():
    furnitures = list(db.products_trial.find({}, {'_id': False}))
    return jsonify({'success': True, 
                    'message': 'Data inserted successfully!',
                    'furnitures': furnitures})

if __name__ == "__main__":
    app.run(debug=True)