// setting up the d3.json to pull the data

d3.json("./data/samples.json").then(function(data) {
    console.log(data);
});
// setting up the datapromise and making sure it's pulling correctly
const dataPromise = d3.json("./data/samples.json");
console.log("Data Promise: ", dataPromise);

// setting up an unpack function
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  };

// setting the y axis and labels variables
var y = Object.values(data.samples);
var labels = Object.keys(data.otu_ids);

// setting up the dropdown menu
d3.selectAll("#selDataset").on("change", updatePlotly);
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    var id = dataset.id;
    var samples = dataset.samples;
    var labels = dataset.otu_labels;
  
function updatePlotly()

  init();