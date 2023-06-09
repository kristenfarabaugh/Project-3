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
let dataCopy = data.slice();

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
    var gaugeData = [
        {
            domain: { x: [0, 0.5], y: [0.4, 1.0] },
            value: acadiaData[0].yelpRating,
            title: { text: `Average Yelp Rating for <br><b>${acadiaData[0].parkName}</b>` },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 5] },
                bar: { color: "rgba(0, 0, 255, 0.5)", thickness: 0.3},
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

    // Find the index of how the park ranks in terms of visitorship park in the list
    var parkIndex = parksSortedByVisitors.findIndex(function(park) {
        return park.parkName === acadiaData[0].parkName;
      });
      


    // Update the text box with the park info
    d3.select("#park-info").html(`Park: <b>${acadiaData[0].parkName}</b> <br>
                                        Total Visitors in 2022: <b>${acadiaData[0].totalVisitors2022.toLocaleString()}</b> <br>
                                        Base Entrance Fee: <b> $${acadiaData[0].entranceFee}</b><br>
                                        Most visited NPS property ranking: <br><b>${parkIndex + 1} out of ${parksSortedByVisitors.length}</b><br>
                                        <br>
                                        <i> <font size="-2">Please be aware that some of these monthly visitor numbers may be affected by natural disasters or other closures. Please see NPS.gov for more detail. <br>
                                        National Land Visitor Numbers are still not back up to their pre-COVID peaks, so make sure to go!</i></font>`);


    // Plotting a bar graph to plot the least visited 5 star parks
    // In the init function, this takes all park info and plots it

    // Filter only for parks that have a yelp rating of 5
    function selectHighlyRated(park) {
        return park.yelpRating == 5.0;
    }

    let highlyRatedParks = initDropdownParks.filter(selectHighlyRated);

    console.log(highlyRatedParks);

    let orderedHighlyRatedParks = highlyRatedParks.sort(function compareFunction(firstNum, secondNum) {
        return firstNum.totalVisitors2022 - secondNum.totalVisitors2022;
    });

    let leastVisitedHighlyRated = orderedHighlyRatedParks.slice(0, 10).reverse()

    // Set monthly visitors (an array of a single array) to a variable
    let parkVisitors2022 = leastVisitedHighlyRated.map((item) => item.totalVisitors2022);
    let yelpRatings = leastVisitedHighlyRated.map((item) => item.yelpRating);
    let parkNames = leastVisitedHighlyRated.map((item) => item.parkName);

    // Define the data trace
    let hiddenGemsBarTrace = {
        x: parkVisitors2022,
        y: parkNames,
        mode: 'markers',
        type: 'bar',
        orientation: 'h',
        //Assign the hover text
        text: parkNames.map((name, index) => `Park: ${name}<br>Average Yelp Rating: ${yelpRatings[index]}<br>Visitors: ${parkVisitors2022[index]}`) 
    };
    
    // Define the layout options
    let hiddenGemsBarLayout = {
        title: `<b>The Hidden Gems:</b>
                <br>Visitor numbers for the <b>least visited National Parks</b>
                <br>with <b>5 star Yelp Reviews</b>`,
        xaxis: {
            title: 'Number of visitors (2022)',
        },
        yaxis: {
            title: '',
        },
        margin: {
            l: 250
        }
    };
    
    // Create a data array
    var hiddenGemsBarData = [hiddenGemsBarTrace];
    
    // Plot the scatter plot
    Plotly.newPlot('bubble', hiddenGemsBarData, hiddenGemsBarLayout);

    // Filter only for parks that have no admission fee
    function selectFreeEntrance(park) {
        return park.entranceFee == "Free";
    }

    // Store these free parks as a variable
    let freeParks = initDropdownParks.filter(selectFreeEntrance);

    // Return in order of number of visitors
    let orderedfreeParks = freeParks.sort(function compareFunction(firstNum, secondNum) {
        return firstNum.totalVisitors2022 - secondNum.totalVisitors2022;
    });

    // Set monthly visitors and names of free parks to variables
    let freeParkVisitors2022 = orderedfreeParks.map((item) => item.totalVisitors2022);
    let freeParkNames = orderedfreeParks.map((item) => item.parkName);

    // Define the data trace
    let freeParksBarTrace = {
        x: freeParkVisitors2022,
        y: freeParkNames,
        mode: 'markers',
        type: 'bar',
        orientation: 'h' 
    };
    
    // Define the layout options
    let freeParksBarLayout = {
        title: `<b>Free Visits:</b>
                <br>Visitor numbers for the <b>National Parks</b> with <b>no Entrance Fee</b>`,
        xaxis: {
            title: 'Number of visitors (2022)',
        },
        yaxis: {
            title: '',
        },
        margin: {
            l: 250
        }
    };
    
    // Create a data array
    var freeParksBarData = [freeParksBarTrace];
    
    // Plot the bar chart
    Plotly.newPlot('bar2', freeParksBarData, freeParksBarLayout);


};

// When the first Drop Down Menu (#selDataset) is changed, then run the function "updateDropdown"
// This will populate the second drop down list with parks that match the designation selected
// It will also update the "Hidden Gems" and "Free Visits" graphs for this category 

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
    //And replace them with the new ones

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

    // Plotting a bar graph to plot the least visited 5 star parks
    // In this function, it plots the least visited parks for this designation

    // Filter only for parks that have a yelp rating of 5
    function selectHighlyRated(park) {
        return park.yelpRating == 5;
    }

    //Assign these to a variable
    let highlyRatedParks = dropdownParks.filter(selectHighlyRated);

    // Sort the Highly rated parks in ascending order.
    let orderedHighlyRatedParks = highlyRatedParks.sort(function compareFunction(firstNum, secondNum) {
        return firstNum.totalVisitors2022 - secondNum.totalVisitors2022;
    });

    // Take the sorted version and take only the top ten least visited. Then list them in reverse order for plotly to plot them in order.
    let leastVisitedHighlyRated = orderedHighlyRatedParks.slice(0, 10).reverse()

    // Set monthly visitors (an array of a single array) to a variable
    let parkVisitors2022 = leastVisitedHighlyRated.map((item) => item.totalVisitors2022);
    let yelpRatings = leastVisitedHighlyRated.map((item) => item.yelpRating);
    let parkNames = leastVisitedHighlyRated.map((item) => item.parkName);

    // Define the data trace
    let hiddenGemsBarTrace = {
        x: parkVisitors2022,
        y: parkNames,
        mode: 'markers',
        type: 'bar',
        orientation: 'h',
         // Create the hover text
        text: parkNames.map((name, index) => `Park: ${name}<br>Average Yelp Rating: ${yelpRatings[index]}<br>Visitors: ${parkVisitors2022[index]}`)
    };
    
    // Define the layout options
    let hiddenGemsBarLayout = {
        title: `<b>The Hidden Gems:</b>
                <br>Visitor numbers for the <b>least visited ${selectedDesignation}s</b>
                <br>with <b>5 star Yelp Reviews</b>`,
        xaxis: {
            title: 'Number of visitors (2022)',
        },
        yaxis: {
            title: '',
        },
        margin: {
            l: 250
        }
    };
    
    // Create a data array
    var hiddenGemsBarData = [hiddenGemsBarTrace];
    
    // Plot the bar chart
    Plotly.newPlot('bubble', hiddenGemsBarData, hiddenGemsBarLayout);


    // Filter only for parks that have no admission fee
    function selectFreeEntrance(park) {
        return park.entranceFee == "Free";
    }

    // Store these free parks as a variable
    let freeParks = dropdownParks.filter(selectFreeEntrance);

    // Return in order of number of visitors
    let orderedfreeParks = freeParks.sort(function compareFunction(firstNum, secondNum) {
        return firstNum.totalVisitors2022 - secondNum.totalVisitors2022;
    });

    // Set monthly visitors and names of free parks to variables
    let freeParkVisitors2022 = orderedfreeParks.map((item) => item.totalVisitors2022);
    let freeParkNames = orderedfreeParks.map((item) => item.parkName);

    // Define the data trace
    let freeParksBarTrace = {
        x: freeParkVisitors2022,
        y: freeParkNames,
        mode: 'markers',
        type: 'bar',
        orientation: 'h' 
    };
    
    // Define the layout options
    let freeParksBarLayout = {
        title: `<b>Free Visits:</b>
                <br>Visitor numbers for the <b>${selectedDesignation}s</b> with <b>no Entrance Fee</b>`,
        xaxis: {
            title: 'Number of visitors (2022)',
        },
        yaxis: {
            title: '',
        },
        margin: {
            l: 250
        }
    };
    
    // Create a data array
    var freeParksBarData = [freeParksBarTrace];
    
    // Plot the bar chart
    Plotly.newPlot('bar2', freeParksBarData, freeParksBarLayout);

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
            title: { text: `Average Yelp Rating for <br><b>${chosenPark[0].parkName}</b>` },
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
                                        <i> <font size="-2">Please be aware that some of these monthly visitor numbers may be affected by natural disasters or other closures. Please see NPS.gov for more detail. <br>
                                        <br>National Land Visitor Numbers are still not back up to their pre-COVID peaks, so make sure to go!</i></font>`);


};


//Run the init function regardless of whether anything is clicked.
init();

