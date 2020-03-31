d3.json("./data/samples.json").then(function(data) {
    console.log(data);
});

const dataPromise = d3.json("./data/samples.json");
console.log("Data Promise: ", dataPromise);