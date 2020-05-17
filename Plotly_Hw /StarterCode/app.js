//Define function for metadata panel containing demographic info
//Read in json file
function buildMetadata(sample) {
    d3.json("samples.json").then(function(data) {
        console.log(data);
        // Grabs the id tag for the demographic's panel 
        var dePanel = d3.select("#sample-metadata");
        // Clears the demographic's panel 
        dePanel.html("");
        // Create the path to metadata
        var metadata= data.metadata
        console.log(metadata)
        // Use a forEach to grab each key & values in the array
    Object.entries(data.metadata[0]).forEach(([key, value]) => {
        console.log(`${key} : ${value}`)
        //dePanel.append("p").text(`${key} : ${value}`);
    });
    });
}

function buildCharts (sample) {
    var hozChart = "samples.json";
    d3.json(hozChart).then(function(data){
        console.log(data)
        const sampleValues = data.samples.map( s => s.sample_values.slice(0,10));
        console.log(sampleValues)
        const otuIDs = data.samples.map( o => o.otu_ids.slice(0,10));
        const otuLabels = data.samples.map(otu => otu.otu_labels.slice(0,10));
    
    //Slice the top 10 sample values for each individual for bar chart
    
    //var dataSlice = sampleValues.sort((a,b) => b - a);
    //var slicedData = sampleValues.slice(0, 10);
    //var dataOtu = sample.sort((a,b) => b.otu_ids - a.otu_ids);
    //var slicedOtuID = otuIDs.slice(0, 10);
    // var Trace1 = [{
    //     x: slicedData.map(object => object.sampleValues),
    //     y: slicedOtuID.map(object => object.otuIDs),
    //     hoverovertext: otuLabels,
    //     orientation: "h",
    //     type: "bar"
    // }]

    var hozBar= [{
        x: sampleValues,
        y: otuIDs,
        hoverovertext: otuLabels,
        orientation: "h",
        type: "bar"
    }];

    Plotly.newPlot("bar", hozBar);
    });
}








// Function for the intial data
function init(){
    // Read the JSON file 
    d3.json("samples.json").then(function (data){
        console.log(data.names)
    
    //Select the drop down menu
   var dropDownMenu= d3.select ("#selDataset");
    //Add the Id's to the drop down menu
    data.names.forEach(function (name){
        dropDownMenu.append("option")
        .text(name)
        .property("value", name)
    });

    // Use the first sample from the list to build the initial plots
  const firstSample = data.samples[0];
  console.log(firstSample)
  buildCharts(firstSample);
  buildMetadata(firstSample);
});


function optionChanged(newSample) {
// Fetch new data each time a new sample is selected
buildCharts(newSample);
buildMetadata(newSample)



    // filiter sample by the corrlating id tags
    // var filter_sample_values= data.samples.filter(value => value.id.toString() === id[0]);

    // console.log(filter_sample_values)
    // // find sample values form the filter data
    // var sample_values= filter_sample_values.
    // var otu_ids= data.samples.map(o_ids => o_ids.otu_ids);


    }
}
init();




















// gode code 
// d3.json("samples.json").then(function(data){
//     console.log(data)

//     function unpack(rows, index) {
//         return rows.map(function(row) {
//           return row[index];
//         });
//       }
//       // Grab Values from the response json object 
//       var idName= unpack(data.samples,0);
//       var sampleValues= unpack(data.samples,2);
//       var otu_ids= unpack(data.samples,1)
//       var otu_labels= unpack(data.samples,3)
//       // grab dropdown menu
//       var dropDownMenu= d3.select("#selDataset");
//       //making option and values
//       var options= dropDownMenu.selectAll("option")
//         .data(data.names)
//         .enter()
//         .append("option")
//         .text(function (d){return d;})
//         .attr("value", function (d){return d});
//         d3.select("#selDataset")
// 	    .on("change", function(d) {
// 		index = this.value;
// 		update();
// 	})

//         var dataset= options.property("value")
//         //   //Initialize x and y arrays
//         //   var x = [];
//         //   var y = [];

//           if( dataset === 'data.names'){ 
//               var trace1= {
//               x: sampleValues,
//               y: otu_ids,
//               type: "bar"
//           }
//         var hChart = [trace1]

//         Plotly.newPlot("bar", hChart)
//           }
 

// });




// d3.json("samples.json").then(function(data){
//     console.log(data)

//     function unpack(rows, index) {
//         return rows.map(function(row) {
//           return row[index];
//         });
//       }
//       // Call updatePlotly when a change takes place to the DOM
//       d3.selectAll("#selDataset").on("change, updatePlotly");
//       // Call the dropDown menu item 
//       function updatePlotly(){
//           // Select the dropdown menu item 
//           var dropDownMenu= d3.select("#selDataset");
//           //Assign the values
//           var dataset = dropDownMenu.property("value");

//           // Initialize x and y arrays
//           var x = [];
//           var y = [];

//           // Grab Values from the response json object 
//           var idName= unpack(data.samples,1);
//           var sampleValues= unpack(data.samples,2);
//           var otu_ids= unpack(data.samples,1)
//           var otu_labels= unpack(data.samples,3)

//           if( dataset === idName){ 
//               var trace1= {
//               x: sampleValues,
//               y: otu_ids,
//               type: "bar"
//           }
//         var data = [trace1]

//         Plotly.newPlot("bar", data)
//           }

          
          
//       }
    

    

// });


// // Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);
// // Call the dropdown menu item 
// function updatePlotly(){
//     // Select the dropdown menu item 
//     var dropDownMenu= d3.select("#selDataset");
//     //Assign the values 
//     var dataset = dropDownMenu.property("value")
//     // Grab the JSON from the local Path 
//     d3.json("../data/samples.json", function (data) {
//         console.log(data)
//         });














// // Grab the JSON from the local path 
// d3.json("samples.json").then((bellyData) => {
// // Create A trace 
//     var trace1 = {
//         x: bellyData.sample_values,
//         y: bellyData.otu_ids,
//         type: "bar",
//     };
//     var data = [trace1];

//     Plotly.newPlot("bar", data);
// });

