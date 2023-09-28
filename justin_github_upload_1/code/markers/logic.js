// Create a map object.

let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


let url = "http://127.0.0.1:5000";

fetch(url)
  .then(response => { // Parse the response as JSON
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
    }) 
  .then(data => {
    console.log(data); // JSON data is now parsed and available as 'data'
  
    let features = data.features;

    for (let i = 0; i < features.length; i++) {
      if (features && features[i]) {
        let varOne = features[i].geometry;
        console.log(varOne);

      //console.log(location);
        let lat = varOne.coordinates[1];
        let lon = varOne.coordinates[0];
        // heatArray.push([location.coordinates[0], location.coordinates[1], features[i].properties.location, features[i].properties.magnitude]);
        L.marker([lat, lon])
        .bindPopup(`<h1>${features[i].properties.country}</h1> <hr> <h3>Magnitude ${features[i].properties.magnitude.toLocaleString()}</h3>`)
        .addTo(myMap);
        
    
      } else {
        // Handle cases where the data or property is not defined
        console.log("Data or property is not defined:", features[i]);
        
      }


  }
}).catch(error => {
  console.error("Error fetching or parsing data:", error);
});