function buildCharts (id) {
    var hozChart = "samples.json";
    d3.json(hozChart).then(function(data){
        console.log(data)
        //var Samples = data.samples.filter(s => s.id.toString() === id)[0];
        var Samples = data.samples.filter(s => s.id == id)[0];
        console.log(Samples)
        var sampleValues = (Samples.sample_values.slice(0,10)).reverse()
        console.log(sampleValues)
        var otuIDs = (Samples.otu_ids.slice(0,10)).reverse()
        console.log(otuIDs)
        var Otu_IDs= otuIDs.map(id => "UTO" + id)
        var otuLabels = (Samples.otu_labels.slice(0,10)).reverse();
    // var Samples= data.sample.map( m => m.sample_values[0])
        var Gauge=data.metadata.filter(g => g.id == id)[0];
        console.log(Gauge)
        var wfreq= Gauge.wfreq;
            console.log(wfreq)
        

    var hozBar= {
        x: sampleValues,
        y: Otu_IDs,
        text: otuLabels,
        orientation: "h",
        type: "bar"
    };

    var hozLayout={
        title: 'Bacteria',
        xAxis: "Amount of Bacteria"

    }
    var barData= [hozBar]

    Plotly.newPlot("bar", barData, hozLayout);
  





    var Trace2 = {
        x: Samples.otu_ids,
        y: Samples.sample_values,
        text: Samples.otu_labels,
        mode: 'markers',
        marker:{
            size: Samples.sample_values,
            color: Samples.otu_ids,
            //opacity: Samples.otu_ids
        },
        text: Samples.otu_labels,
    };
    var bubble=[Trace2];
  
    Plotly.newPlot("bubble", bubble)


    var dataGauge = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: `Weekly Washing Frequency ` },
        type: "indicator",
        mode: "gauge+number",
        gauge: { axis: { range: [null, 9] },
                 steps: [
                  { range: [0, 1], color: "AliceBlue" },
                  { range: [1, 2], color: "LightYellow" },
                  { range: [2, 3], color: "LemonChiffon" },
                  { range: [3, 4], color: "PaleTurquoise" },
                  { range: [4, 5], color: "PowderBlue" },
                  { range: [5, 6], color: "SkyBlue" },
                  { range: [6, 7], color: "MediumTurquoise" },
                  { range: [7, 8], color: "RoyalBlue" },
                  { range: [8, 9], color: "Navy" }
                ]}
            
        }
      ];
      var layoutGauge = { 
          width: 600, 
          height: 400, 
          margin: { t: 10, b: 40, l:100, r:100 } 
        };
      Plotly.newPlot("gauge", dataGauge, layoutGauge);


});
}

function getMetadata (id) {
    d3.json("samples.json").then(function(data) {
        console.log(data);
        // Create the path to metadata
        var metadata= data.metadata
        console.log(metadata)
        //Grabing the first line of code in samples 
        var metaResults= metadata.filter(m => m.id == id)[0];
         // Grabs the id tag for the demographic's panel 
         var dePanel = d3.select("#sample-metadata");
         // Clears the demographic's panel 
         dePanel.html("");
        // Use a forEach to grab each key & values in the array
    // Object.entries(metaResults).forEach((value) => {
    //     console.log(value)
    //     dePanel.append("p").text(value[0].toUpperCase() + ": " + value[1] + "\n"); 
    // });
    Object.entries(metaResults).forEach(([key, value]) => {
        console.log(value)
        dePanel.append("p").text(`${key} : ${value}`);
    });
    });
}







// create the change event
function optionChanged(id) {
    buildCharts(id);
    getMetadata(id);
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
  buildCharts(data.names[0]);
  getMetadata(data.names[0]);
});


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

