



let url = "http://127.0.0.1:5000/";

let latArray = [];
let lonArray = [];
let magArray = [];
let hoverText = [];
let depthArray = [];


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
        let mag = features[i].properties.magnitude;
        let depth = features[i].properties.depth;
        // heatArray.push([location.coordinates[0], location.coordinates[1], features[i].properties.location, features[i].properties.magnitude]);
        latArray.push(lat);
        lonArray.push(lon);
        var mag2 = Math.pow(mag,3) / 30;
        magArray.push(mag2);
        hoverText.push('hello');
        depthArray.push(depth);
        
    
      } else {
        // Handle cases where the data or property is not defined
        console.log("Data or property is not defined:", features[i]);
        
      }
    var data = [{
        type: 'scattergeo',
        locationmode: 'world',
        lat: latArray,
        lon: lonArray,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
            size: magArray,
            color: depthArray,
            cmin: 0,
            cmax: 50,
            colorscale: 'Greens',
            colorbar: {
                title: 'Depth',
                ticksuffix: '%',
                showticksuffix: 'last'
            },
            line: {
                color: 'green',
                width: 2
            }
        }
    }];

    var layout = {
        title: 'Earthquakes',
        showlegend: false,
        geo: {
            scope: 'world',
            // projection: {
            //    type: 'albers usa'
            // },
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            subunitwidth: 1,
            countrywidth: 1,
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)'
        },
    };

    Plotly.newPlot("myDiv", data, layout, {showLink: false});


  }
}).catch(error => {
  console.error("Error fetching or parsing data:", error);
});

console.log(latArray);









