// setting up the d3.json to pull the data

function init() {
  d3.json("./data/samples.json").then(function(data) {
    console.log(data);


// setting up the datapromise and making sure it's pulling correctly
const dataPromise = d3.json("./data/samples.json");
console.log("Data Promise: ", dataPromise);

var dropDown = d3.select("#selDataset")
  .selectAll("option")
  .data(data.names)
  .enter()
  .append("option")
  .text(d => d);
});

optionChanged("940");

};

function changeOption(value) {
  console.log(value);
  updatePlotly(value);
};

function updatePlotly(value) {
  d3.json("./samples/json").then(function(data) {
    var samples = data.samples;
    var otuData = [];

    for (var i = 0; i < samples.length; i++) {
      if (samples[i].id === value) {
        for (var o = 0; o < samples[i].otu_ids.length; o++) {
          otuData.push({
            otu_id: samples[i].otu_ids[o],
            sample_value: samples[i].sample_values[o],
            otu_label: samples[i].otu_labels[o]
          });
        };
      };
    };
  });

// getting metadata for the demographic information
  var demoInfo = data.metadata;

// setting up the storage unit for that information
  var metaInfo = {};

// looping through the metadata to see if it matches the value given previously
  for (var i = 0; i < demoInfo.length; i++) {
      if (demoInfo[i].id == value) {
          metaInfo = demoInfo[i];
      };
  };

// if it matches it will pull the appropriate data here
  d3.select("#sample-metadata")
  .html(`ID: ${metaInfo.id}<br>Ethnicity: ${metaInfo.ethnicity}<br>Gender: ${metaInfo.gender}<br>Age: ${metaInfo.age}<br>Location: ${metaInfo.location}<br>BBType: ${metaInfo.bbtype}<br>W.Frequency: ${metaInfo.wfreq}`);

// sorting the data appropriately
var dataSort = otuData;
dataSort.sort((firstValue, secondValue) => secondValue.sample_values - firstValue.sample_values);

// taking the sorted info and slicing it up, then reversing the order
var dataslice = dataSort.slice(0, 10).reverse();

// slicing things up from the map
// x is the sample_values from the dataset
// y is the otu_ids from the dataset
// hoverLabel is the otu_labels from the dataset
var x = dataslice.map(d => d.sample_values);
var y = dataslice.map(d => `OTU ${d.otu_ids}`);
var hoverLabel = dataslice.map(d => d.otu_labels);

// setting up the trace information so it pulls the right info
// and makes it a horizontal bar chart
var trace1 = {
  x: x,
  y: y,
  hovertext: hoverLabel,
  type: "bar",
  orientation: "h"
};

// setting the title for the layout
var layout = {
  title: "Top 10 OTUs",
};

// setting the data variable for plotting purposes
var data = [trace1];

// rigging up ye olde plotly plot
Plotly.newPlot("bar-chart", data, layout);

// bubble chart is a go!
// all the trace variables, oh boy

var x = otuData.map(d => d.otu_ids);
var y = otuData.map(d => d.sample_values);
var size = otuData.map(d => d.sample_values);
var color = otuData.map(d => d.otu_ids);
var text = otuData.map(d => d.otu_labels);

// setting trace data

var trace1 = {
  x: x,
  y: y,
  mode: "markers",
  marker: { 
    color: color,
    size: size
  },
  hovertext: text
};

var layout = {
  xaxis: {
    title: "OTU ID"
  }
};

var data = [trace1];

Plotly.newPlot("bubble-chart", data, layout);

};


  init();