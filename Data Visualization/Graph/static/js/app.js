// Define the list of possible park Designations

let parkDesignations = ['National Park', 'National Historical Park', 'National Monument',
'National Historic Site', 'National Recreation Area',
'National Battlefield', 'National Lakeshore', 'National Memorial',
'National Seashore', 'National Preserve', 'National River', 'Park',
'National Military Park', 'National Park & Preserve', 'Memorial',
'National Monument and Historic Shrine', 'Memorial Parkway',
'National Battlefield Park', 'National Recreational River',
'National Scenic River', 'Wild & Scenic River',
'National Monument & Preserve',
'National Historical Park and Ecological Preserve',
'Ecological & Historic Preserve', 'Scenic & Recreational River']

// Define months for plotting bar graph
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

//Create a copy of the data to sort by visitor number
// (This leaves the original data in alphabetical order for the dropdowns)
let dataCopy = data.slice(); // Create a copy of the data array

// Sort the parks by most visited (2022) for use later
let parksSortedByVisitors = dataCopy.sort(function(a, b) {
    return b.totalVisitors2022 - a.totalVisitors2022;
});


// Create the first dropdown menu
// This one will store the list of park designations.
// The second one, added later, will store the list of park names that match those designations

let dropdownTypeMenu = d3.select("#selDataset");

//for each item in parkDesignations list
for (i =0; i < parkDesignations.length; i++) {

    //Create the option element
    let newOptionType = document.createElement("option");

    //Append the text and the value
    newOptionType.text = parkDesignations[i];
    newOptionType.value = parkDesignations[i];

    //Append this as a child function into the list
    dropdownTypeMenu.node().appendChild(newOptionType);
};


// Create an init function, which will populate the page with the first National Park (Acadia)'s data

function init() {

// Populate the second drop down list to show only National Parks when initialized

    // Create a function to only select designations = "National Park"
    function selectNationalParks(park) {
        return park.parkDesignation == "National Park";
    }

    // Create a variable to only store these parks
    let initDropdownParks = data.filter(selectNationalParks);

    //Select the second drop down
    let dropdownParkMenu = d3.select("#selDataset2");

    //for each item in the National Parks list:
    for (i = 0; i < initDropdownParks.length; i++) {

        // Create the element
        let newOptionPark = document.createElement("option");

        console.log(initDropdownParks[i].parkName)

        //Append the text and the value
        newOptionPark.text = initDropdownParks[i].parkName;
        newOptionPark.value = initDropdownParks[i].parkName;

        // Add the new item to the second drop down
        dropdownParkMenu.node().appendChild(newOptionPark);


    };

    // Initalize with Acadia information
    function selectAcadia(park) {
        return park.parkName == "Acadia NP";
    }

    // Store only the Acadia Data
    let acadiaData = data.filter(selectAcadia);

    // Set monthly visitors (an array of a single array) to a variable
    let monthlyVisitors = acadiaData.map((item) => item.monthlyVisitors)

    // Get the trace information ready for plotting the monthly visitors graph
    let Trace1 = {
    x: months,
    y: monthlyVisitors[0],
    type: "line",
    };

    // Data array
    let lineGraphData = [Trace1];

    // Apply titles to the layout
    let layout = {
        title: `Visitors Per Month at <br><b> ${acadiaData[0].parkName}</b><br>(2022)`,
        xaxis: {title: "Month"},
        yaxis: {title: "Number of Visitors"}
    };

    // Render the plot to the div tag with id "bar" since that's the name in the html file
    Plotly.newPlot("bar", lineGraphData, layout);  

    // Creating the Gauge Plot
    console.log(acadiaData)
    var gaugeData = [
        {
            domain: { x: [0, 0.5], y: [0.4, 1.0] },
            value: acadiaData[0].yelpRating,
            title: { text: `Yelp Rating for <br><b>${acadiaData[0].parkName}</b>` },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 5] },
                bar: { color: "rgba(0, 0, 255, 0.5)", thickness: 0.3},
                //marker: { color: 'rgb(255,130,189)'},
                steps: [
                { range: [0, 1], color: "rgb(255, 113, 113)"},
                { range: [1, 2], color: "rgb(244, 177, 131)" },
                { range: [2, 3], color: "rgb(255, 230, 153)" },
                { range: [3, 4], color: "rgb(197, 224, 180)" },
                { range: [4, 5], color: "rgb(145, 196, 110)" }
                ]
            }
        }
    ];
    
    var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 }};
    Plotly.newPlot('gauge', gaugeData, layout3);

    //Appending data to the Park Info section

    // Find the index of the park in the list
    var parkIndex = parksSortedByVisitors.findIndex(function(park) {
        return park.parkName === acadiaData[0].parkName;
      });

    // Update the text box with the park info
    d3.select("#park-info").html(`Park: <b>${acadiaData[0].parkName}</b> <br>
                                        Total Visitors in 2022: <b>${acadiaData[0].totalVisitors2022.toLocaleString()}</b> <br>
                                        Most visited NPS property ranking: <br><b>${parkIndex + 1} out of ${parksSortedByVisitors.length}</b><br>
                                        <br>
                                        <i>Please be aware that some of these monthly visitor numbers may be affected by natural disasters or other closures. Please see NPS.gov for more detail. <br>
                                        National Land Visitor Numbers are still not back up to their pre-COVID peaks, so make sure to go!</i>`);


};

//

// When the first Drop Down Menu (#selDataset) is changed, then run the function "updateDropdown"
// This will populate the second drop down list with parks that match the designation selected

d3.selectAll("#selDataset").on("change", updateDropdown);

// Defining the function updateDropdown
function updateDropdown(){

    //Select the dropdownmenu
    let dropdownMenu1 = d3.select("#selDataset");

    //Store the chosen initialized individual as a variable.
    let selectedDesignation = dropdownMenu1.property("value")

    console.log(selectedDesignation)

    // Search for parks with that designation
    function selectDesignation(park) {
        return park.parkDesignation == selectedDesignation;
    }

    // Create a variable to store the parks for that designation
    let dropdownParks = data.filter(selectDesignation);

    console.log(dropdownParks)

    // Select the second dropdown menu
    let dropdownParkMenu = d3.select("#selDataset2");

    // Clear existing options
    dropdownParkMenu.html("");

    //for each item in dropdownParks list
    for (i =0; i < dropdownParks.length; i++) {

        //Create the option element
        let newOptionPark = document.createElement("option");

        //Append the text and the value
        newOptionPark.text = dropdownParks[i].parkName;
        newOptionPark.value = dropdownParks[i].parkName;

        //Append this as a child function into the list
        dropdownParkMenu.node().appendChild(newOptionPark);
    };

};

// When the second Drop Down Menu (#selDataset2) is changed, then run the function "updateGraphs"
// This will change all the graphs based on what was selected.


// This function overcomes an error where the page was not updating when the first dropdown changed
// (since this does change the parkname)
// I'm not really sure why the timeout does work here, but I got this help from stackoverflow
function optionChanged() {
    setTimeout(updateGraphs, 0);
  }

// Then this runs the setTimeout, and which then runs the updateGraphs function
d3.selectAll("#selDataset2").on("change", optionChanged);

// Defining the function updateGraphs
function updateGraphs(){
    //Select the dropdownmenu
    let dropdownMenu2 = d3.select("#selDataset2");

    //Store the chosen initialized individual as a variable.
    let selectedPark = dropdownMenu2.property("value")

    // Search for the specific park
    function selectPark(park) {
        return park.parkName == selectedPark;
    }

    // Create a variable to store the selected park
    let chosenPark = data.filter(selectPark);

    console.log(chosenPark[0])

    // Set monthly visitors (an array of a single array) to a variable
    let monthlyVisitors = chosenPark.map((item) => item.monthlyVisitors)

    // Get the trace information ready for plotting the monthly visitors graph
    let Trace1 = {
    x: months,
    y: monthlyVisitors[0],
    type: "line",
    //text: monthlyVisitors[0]
    };

    // Data array
    let lineGraphData = [Trace1];

    // Apply titles to the layout
    let layout = {
        title: `Visitors Per Month at <br><b> ${chosenPark[0].parkName}</b><br>(2022)`,
        xaxis: {title: "Month"},
        yaxis: {title: "Number of Visitors"}
    };

    // Render the plot to the div tag with id "bar" since that's the name in the html file
    Plotly.newPlot("bar", lineGraphData, layout);  

    // Creating the Gauge Plot
    console.log(chosenPark)
    

    var gaugeData = [
        {
            domain: { x: [0, 0.5], y: [0.4, 1.0] },
            value: chosenPark[0].yelpRating,
            title: { text: `Yelp Rating for <br><b>${chosenPark[0].parkName}</b>` },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 5] },
                bar: { color: "rgba(0, 0, 255, 0.5)", thickness: 0.3},
                //marker: { color: 'rgb(255,130,189)'},
                steps: [
                { range: [0, 1], color: "rgb(255, 113, 113)"},
                { range: [1, 2], color: "rgb(244, 177, 131)" },
                { range: [2, 3], color: "rgb(255, 230, 153)" },
                { range: [3, 4], color: "rgb(197, 224, 180)" },
                { range: [4, 5], color: "rgb(145, 196, 110)" }
                ]
            }
        }
    ];
    
    var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 }};
    Plotly.newPlot('gauge', gaugeData, layout3);

    //Appending data to the Park Info section

    // Find the index of the park in the list
    var parkIndex = parksSortedByVisitors.findIndex(function(park) {
        return park.parkName === chosenPark[0].parkName;
      });

    // Update the text box with the park info
    d3.select("#park-info").html(`Park: <b>${chosenPark[0].parkName}</b> <br>
                                        Total Visitors in 2022: <b>${chosenPark[0].totalVisitors2022.toLocaleString()}</b> <br>
                                        Most visited NPS property ranking: <br><b>${parkIndex + 1} out of ${parksSortedByVisitors.length}</b><br>
                                        <br>
                                        <i>Please be aware that some of these monthly visitor numbers may be affected by natural disasters or other closures. Please see NPS.gov for more detail. <br>
                                        National Land Visitor Numbers are still not back up to their pre-COVID peaks, so make sure to go!</i>`);

};

//Run the init function regardless of whether anything is clicked.
init();

