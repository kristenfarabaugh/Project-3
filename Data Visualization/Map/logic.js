// Set up the tile layers.
// StreetMap
let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
//Topographic Maps
let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>'
});

// Store these tile maps in the baseMaps function for display later
let baseMaps = {
    "Street": streetMap,
    "Topography": topoMap
};

function selectPark(park) {
  return park.Designation == "National Park"
}
function selectMonument(park) {
  return park.Designation == "National Monument"
}
function selectRiver(park) {
  return park.Designation == "National Wild and Scenic River" || park.Designation == "National River" || park.Designation == "National Scenic River" || park.Designation == "Wild River"
}

let nationalParks = data.filter(selectPark);
let nationalMonuments = data.filter(selectMonument);
let nationalRivers = data.filter(selectRiver);

console.log(nationalRivers)
//Options of remaining National Parks
      //'National Wild & Scenic River', 
      // 'National Preserve', 'National Historical Park',
      // 'National Recreation Area', 'National Historic Site',
      // 'National Memorial', 'National Parkway', 'National Seashore',
      // 'National Lakeshore', 'National River', 'National Military Park',
      //  'National Battlefield Park', 'National Battlefield',
      // 'Park (Other)', 'International Historic Site', 'National Reserve',
      //  'National Battlefield Site'

//Initialize an empty array to store the national Park circle data
let nationalParkCircles = [];

//Run through the list of dictionaries (this is called data in the park_info.js file)
for (let i = 0; i < nationalParks.length; i++) {
    let park = nationalParks[i];

    //Create the circle information - eventually we want radius to be visitor numbers
    let circle = L.circle([park.Latitude, park.Longitude], {
        color: "green",
        fillColor: "green",
        weight: 0.1,
        fillOpacity: 0.5,
        radius: 50000
    })
        .bindPopup(`<h3>${park.Name}</h3><hr><h4>Designation: ${park.Designation}</h4>`);
    
    //Add each "circle" info to the nationalParkCircles array
    nationalParkCircles.push(circle);
}

//Initialize an empty array to store the national Park circle data
let nationalMonumentCircles = [];

//Run through the list of dictionaries (this is called data in the park_info.js file)
for (let i = 0; i < nationalMonuments.length; i++) {
  let park = nationalMonuments[i];

  //Create the circle information - eventually we want radius to be visitor numbers
  let circle = L.circle([park.Latitude, park.Longitude], {
      color: "gray",
      fillColor: "gray",
      weight: 0.1,
      fillOpacity: 0.5,
      radius: 50000
  })
      .bindPopup(`<h3>${park.Name}</h3><hr><h4>Designation: ${park.Designation}</h4>`);
  
  //Add each "circle" info to the nationalParkCircles array
  nationalMonumentCircles.push(circle);
}

//Initialize an empty array to store the national Park circle data
let nationalRiverCircles = [];

//Run through the list of dictionaries (this is called data in the park_info.js file)
for (let i = 0; i < nationalRivers.length; i++) {
  let park = nationalRivers[i];

  //Create the circle information - eventually we want radius to be visitor numbers
  let circle = L.circle([park.Latitude, park.Longitude], {
      color: "blue",
      fillColor: "blue",
      weight: 0.1,
      fillOpacity: 0.5,
      radius: 50000
  })
      .bindPopup(`<h3>${park.Name}</h3><hr><h4>Designation: ${park.Designation}</h4>`);
  
  //Add each "circle" info to the nationalParkCircles array
  nationalRiverCircles.push(circle);
}


//Initialize an empty array to store the national Park circle data
let allCircles = [];

//Run through the list of dictionaries (this is called data in the park_info.js file)
for (let i = 0; i < data.length; i++) {
    let park = data[i];

    //Set the color based on the Designation of the park
    //let designation = park.Designation;
    let color = "yellow";

    // if (designation == "National Park") {
    //     color = "green";
    // } else if (designation == "National Wild & Scenic River") {
    //     color = "lightblue";
    // } else if (designation == "National Monument") {
    //     color = "white";
    // } else if (designation == "National Preserve") {
    //     color = "yellow";
    // } else {
    //     color = "gray";
    // }

    //Create the circle information - eventually we want radius to be visitor numbers
    let circle = L.circle([park.Latitude, park.Longitude], {
        color: color,
        weight: 0.1,
        fillColor: color,
        fillOpacity: 0.25,
        radius: 50000
    })
        .bindPopup(`<h3>${park.Name}</h3><hr><h4>Designation: ${park.Designation}</h4>`);
    
    //Add each "circle" info to the allCircles array
    allCircles.push(circle);
}


//Include thie national park circles in the overlaymaps
let overlayMaps = {
    "All National Lands": L.layerGroup(allCircles),
    "National Parks": L.layerGroup(nationalParkCircles),
    "National Monuments": L.layerGroup(nationalMonumentCircles),
    "National Rivers": L.layerGroup(nationalRiverCircles)
};

// Create the map object with streetmap and national parks on as standard
let myMap = L.map("map", {
    center: [44.58207622, -103.461760283],
    zoom: 3.3,
    layers: [streetMap, L.layerGroup(nationalParkCircles)]
});

//Add the layer options
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);