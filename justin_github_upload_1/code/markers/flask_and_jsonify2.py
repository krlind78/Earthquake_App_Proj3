from flask import Flask, render_template, jsonify
from pymongo import MongoClient
import json
from bson import json_util
from pprint import pprint
from flask_cors import CORS

app = Flask(__name__, template_folder='/Users/j/Desktop/Bootcamp/project_3/github_upload_1/code/markers/templates')

# Connect to MongoDB
CORS(app, resources={r"/*": {"origins": "*"}})


client = MongoClient("mongodb://localhost:27017/")
db = client["earthquake_github"]
collection = db["quake_github"]

# Read the .geojson file
with open("/Users/j/Desktop/Bootcamp/project_3/github_upload_1/code/cleaned.geojson", "r") as file:
    geojson_data = json.load(file)

# Insert the GeoJSON features into the collection
inserted_ids = []
for feature in geojson_data["features"]:
    # print(feature['properties']['magnitude'])
    result = collection.insert_one(feature)
    inserted_ids.append(result.inserted_id)

# Print the IDs of the inserted documents
# print("Inserted document IDs:", inserted_ids)




@app.route("/")
def index():


    # Retrieve data from MongoDB



    data = list(collection.find())

    # Format data as a GeoJSON FeatureCollection
    geojson_data = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [document['geometry']['coordinates'][0], document['geometry']['coordinates'][1]]
                },
                "properties": {
                "magnitude": document['properties']['magnitude'],
                "country": document['properties']['country']
                }
            }
            for document in data
        ]
    }




    
    # print(data)
    serialized_geojson = json_util.dumps(geojson_data)
    # pprint(serialized_geojson)
    # jsonify(serialized_geojson)? 
    return serialized_geojson

if __name__ == "__main__":
    app.run(debug=True)