let myMap = L.map("map", {
  center: [53.966244, -1.076132],
  zoom: 7
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// let url = "https://opendata.arcgis.com/datasets/9c58741995174fbcb017cf46c8a42f4b_25.geojson";
let url = "http://127.0.0.1:5000/";

let heatArray = [];

fetch(url)
  .then(response => { // Parse the response as JSON
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
    }) 
  .then(data => {
    // console.log(data); // JSON data is now parsed and available as 'data'
  
    let features = data.features;
    

    for (let i = 0; i < features.length; i++) {
      if (features && features[i]) {
        let varOne = features[i].geometry;
        // console.log(varOne);
  
      //console.log(location);
        let lat = varOne.coordinates[1];
        let lon = varOne.coordinates[0];
        // heatArray.push([location.coordinates[0], location.coordinates[1], features[i].properties.location, features[i].properties.magnitude]);
        heatArray.push([lat, lon]);
        
    
      } else {
        // Handle cases where the data or property is not defined
        console.log("Data or property is not defined:", features[i]);
        
      }


  }
}).catch(error => {
  console.error("Error fetching or parsing data:", error);
});


let heat = L.heatLayer(heatArray, {

  minOpacity: 0.80,
  maxZoom: 10,
  radius: 10,
  blur: 1,
  max: 1.0
  // gradient: 0.4
}).addTo(myMap);


