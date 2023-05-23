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
  return park.Designation == "National Park" || park.Designation == "National Historical Park" || park.Designation == "National Park & Preserve"
}
function selectMonument(park) {
  return park.Designation == "National Monument"
}
function selectHistoricSites(park) {
  return park.Designation == "National Historic Site"
}
function selectMemorials(park) {
    return park.Designation == "National Memorial"
}
function selectRecreation(park) {
  return park.Designation == "National Recreation Area"
}

let nationalParks = data.filter(selectPark);
let nationalMonuments = data.filter(selectMonument);
let nationalHistoricSites = data.filter(selectHistoricSites);
let nationalMemorials = data.filter(selectMemorials);
let nationalRecreation = data.filter(selectRecreation);


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
        radius: Math.sqrt(park.totalVisitors2022*5000)
    })
    .bindPopup(`<h3>${park.Park}</h3><hr><h4>Number of Visitors in 2022: ${park.totalVisitors2022}</h4><hr><h5>Entrance Fee: ${park.entranceFee}</h5><h5>Entrance Fee Info: ${park.entranceFeeDesc}</h5>`);
    
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
      color: "brown",
      fillColor: "brown",
      weight: 0.1,
      fillOpacity: 0.5,
      radius: Math.sqrt(park.totalVisitors2022*5000)
  })
      .bindPopup(`<h3>${park.Park}</h3><hr><h4>Number of Visitors in 2022: ${park.totalVisitors2022}</h4><hr><h5>Entrance Fee: ${park.entranceFee}</h5><h5>Entrance Fee Info: ${park.entranceFeeDesc}</h5>`);
  
  //Add each "circle" info to the nationalParkCircles array
  nationalMonumentCircles.push(circle);
}

//Initialize an empty array to store the national Park circle data
let nationalHistoricSitesCircles = [];

//Run through the list of dictionaries (this is called data in the park_info.js file)
for (let i = 0; i < nationalHistoricSites.length; i++) {
  let park = nationalHistoricSites[i];

  //Create the circle information - eventually we want radius to be visitor numbers
  let circle = L.circle([park.Latitude, park.Longitude], {
      color: "blue",
      fillColor: "blue",
      weight: 0.1,
      fillOpacity: 0.5,
      radius: Math.sqrt(park.totalVisitors2022*5000)
  })
      .bindPopup(`<h3>${park.Park}</h3><hr><h4>Number of Visitors in 2022: ${park.totalVisitors2022}</h4><hr><h5>Entrance Fee: ${park.entranceFee}</h5><h5>Entrance Fee Info: ${park.entranceFeeDesc}</h5>`);
  
  //Add each "circle" info to the nationalParkCircles array
  nationalHistoricSitesCircles.push(circle);
}

//Initialize an empty array to store the national Park circle data
let nationalMemorialsCircles = [];

//Run through the list of dictionaries (this is called data in the park_info.js file)
for (let i = 0; i < nationalMemorials.length; i++) {
  let park = nationalMemorials[i];

  //Create the circle information - eventually we want radius to be visitor numbers
  let circle = L.circle([park.Latitude, park.Longitude], {
      color: "purple",
      fillColor: "purple",
      weight: 0.1,
      fillOpacity: 0.5,
      radius: Math.sqrt(park.totalVisitors2022*5000)
  })
  .bindPopup(`<h3>${park.Park}</h3><hr><h4>Number of Visitors in 2022: ${park.totalVisitors2022}</h4><hr><h5>Entrance Fee: ${park.entranceFee}</h5><h5>Entrance Fee Info: ${park.entranceFeeDesc}</h5>`);
  
  //Add each "circle" info to the nationalParkCircles array
  nationalMemorialsCircles.push(circle);
}

//Initialize an empty array to store the national Park circle data
let nationalRecreationCircles = [];

//Run through the list of dictionaries (this is called data in the park_info.js file)
for (let i = 0; i < nationalRecreation.length; i++) {
  let park = nationalRecreation[i];

  //Create the circle information - eventually we want radius to be visitor numbers
  let circle = L.circle([park.Latitude, park.Longitude], {
      color: "yellow",
      fillColor: "yellow",
      weight: 0.1,
      fillOpacity: 0.5,
      radius: Math.sqrt(park.totalVisitors2022*5000)
  })
  .bindPopup(`<h3>${park.Park}</h3><hr><h4>Number of Visitors in 2022: ${park.totalVisitors2022}</h4><hr><h5>Entrance Fee: ${park.entranceFee}</h5><h5>Entrance Fee Info: ${park.entranceFeeDesc}</h5>`);
  
  //Add each "circle" info to the nationalParkCircles array
  nationalRecreationCircles.push(circle);
}

//Initialize an empty array to store the national Park circle data
let allCircles = [];

//Run through the list of dictionaries (this is called data in the park_info.js file)
for (let i = 0; i < data.length; i++) {
    let park = data[i];

    //Set the color based on the Designation of the park
    //let designation = park.Designation;
    let color = "gray";

    //Create the circle information - eventually we want radius to be visitor numbers
    let circle = L.circle([park.Latitude, park.Longitude], {
        color: color,
        weight: 0.1,
        fillColor: color,
        fillOpacity: 0.25,
        radius: Math.sqrt(park.totalVisitors2022*5000)
    })
    .bindPopup(`<h3>${park.Park}</h3><hr><h4>Number of Visitors in 2022: ${park.totalVisitors2022}</h4><hr><h5>Entrance Fee: ${park.entranceFee}</h5><h5>Entrance Fee Info: ${park.entranceFeeDesc}</h5>`);
    
    //Add each "circle" info to the allCircles array
    allCircles.push(circle);
}


//Include thie national park circles in the overlaymaps
let overlayMaps = {
    "All National Lands": L.layerGroup(allCircles),
    "National Parks": L.layerGroup(nationalParkCircles),
    "National Monuments": L.layerGroup(nationalMonumentCircles),
    "National Historic Sites": L.layerGroup(nationalHistoricSitesCircles),
    "National Memorials": L.layerGroup(nationalMemorialsCircles),
    "National Recreation Areas": L.layerGroup(nationalRecreationCircles)
};

// Create the map object with streetmap and national parks on as standard
let myMap = L.map("map", {
    center: [44.58207622, -103.461760283],
    zoom: 3.3,
    layers: [streetMap, L.layerGroup(nationalParkCircles)]
});


//Add the layer options
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);

// // Adding a legend.
// var legend = L.control({
//     position: "bottomright"
//   });

//   legend.onAdd = function () {
//     var div = L.DomUtil.create("div", "info legend");

//     var grades = ["National Parks", "National Monuments", "National Historic Sites", "National Memorials", "All National Lands"];
//     var colors = [
//       "green",
//       "brown",
//       "blue",
//       "purple",
//       "gray"];

//     // Loop through our intervals and generate a label with a colored square for each interval.
//     for (var i = 0; i < grades.length; i++) {
//       div.innerHTML += "<i style='background: "
//         + colors[i]
//         + "'></i> "
//         + grades[i]
//         + "<br>";
//     //    + ("<br>" : "");
//     }
//     return div;
//   };

//   legend.addTo(myMap);