from flask import Flask
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

# Provide the static directory (the frontend/ flask instance?) path
# provide build of the react app
app = Flask (__name__, static_folder='frontend/build', static_url_path='')
cors = CORS(app)

@app.route('/api', methods=['GET'])
@cross_origin # so there is no CORS 4G request error when react communicate with the Flask Server 
def index():
    return {
        "flask": "This is the flask server ^^"
    }
    
# return index.html from the build folder inside react app
@app.route('/')
@cross_origin
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)