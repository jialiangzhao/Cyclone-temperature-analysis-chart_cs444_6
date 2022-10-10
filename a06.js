// 
// a06.js
// Skeleton for CSC444 Assignment 06
// Joshua A. Levine <josh@email.arizona.edu>
//
// This file provides the skeleton code for you to write for A06.  It
// generates (using index.html and data.js) grids of 50x50 rectangles 
// to visualize the Hurricane Isabel dataset.
//
// Your main task is to complete the four color functions.
// Additionally, you may want to add additional logic to insert color
// legends for each of the four plots.  These can be inserted as new svg
// elements in the spans colorlegend-X for X=1..4 
//



//////////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries to draw the grid of rectangles

var svgSize = 500;
var bands = 50;

var xScale = d3.scaleLinear().domain([0, bands]).  range([0, svgSize]);
var yScale = d3.scaleLinear().domain([-1,bands-1]).range([svgSize, 0]);

function createSvg(sel)
{
    return sel
        .append("svg")
        .attr("width", svgSize)
        .attr("height", svgSize);
}

function createRects(sel)
{
    return sel
        .append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScale(d.Col); })
        .attr("y", function(d) { return yScale(d.Row); })
        .attr("width", 10)
        .attr("height", 10)
       
}

d3.selection.prototype.callAndReturn = function(callable)
{
    return callable(this);
};

//////////////////////////////////////////////////////////////////////////////
// Color functions -- Implement these!


function colorT1(d) {
    let b=d3.scaleLinear()
    .domain([-70,-60])
    .range([d3.lab(20,80,0),d3.lab(110,90,0)])

    return b(d.T);

}

function colorT2(d) {
    let color1=d3.lab(20,80,0).darker();
    let color2=d3.lab(110,90,0).brighter(); 
    var compute = d3.interpolate(color1,color2);
    let b=d3.scaleLinear()
    .domain([-70,-60])
    .range([0,1]);
    

    return compute(b(d.T));
}

function colorP3(d) {
    let color1=d3.lab(50,100,0);
    let color2=d3.lab(50,-100,0);
    let b=d3.scaleLinear()
    .domain([-500,0,200])
    .range([color2,"black",color1])
     .interpolate(d3.interpolateLab);

    return b(d.P);
}

function colorPT4(d) {

    let T1=d3.scaleLinear().domain([-70,-60]).range([-80,80]);
    
    let color1=d3.lab(50,100,T1(d.T));
    let color2=d3.lab(50,-100,T1(d.T));
    let b=d3.scaleLinear()
    .domain([-500,0,200])
    .range([color2,"black",color1])
     .interpolate(d3.interpolateLab);

    return b(d.P);
}


//////////////////////////////////////////////////////////////////////////////
// Hook up the color functions with the fill attributes for the rects


d3.select("#plot1-temperature")
    .callAndReturn(createSvg)
    .callAndReturn(createRects)
    .attr("fill", colorT1);

d3.select("#plot2-temperature")
    .callAndReturn(createSvg)
    .callAndReturn(createRects)          
    .attr("fill", colorT2);

d3.select("#plot3-pressure")
    .callAndReturn(createSvg)
    .callAndReturn(createRects)
    .attr("fill", colorP3);

d3.select("#plot4-bivariate")
    .callAndReturn(createSvg)
    .callAndReturn(createRects)
    .attr("fill", colorPT4);

///////////////////////////////////////////1
let cxScale = d3.scaleLinear().domain([0,20]).range([80,480])
let cyScale = d3.scaleLinear().domain([-70,-60]).range([470,70]);
let height = Math.ceil((cyScale.range()[0] - cyScale.range()[1]) / (10-1));
let yAxis = d3.axisLeft().scale(cyScale).ticks(10)

option1=d3.select("#colorlegend-1")
.append("svg")
.attr("width",500)
.attr("height",500);

option1.selectAll("rect")
.data(data).enter().append("rect")
.attr("x",100)
.attr("y", d => cyScale(d.T) - height/2)
.attr("width", 30)
.attr("height", height)
.attr("fill", function(d) {
    return colorT1(d);
  });

option1.append("g")
.attr("transform", `translate(${cxScale(0)},0)`)
.call(yAxis);
//////////////////////////////////////////////////////2
option2=d3.select("#colorlegend-2")
.append("svg")
.attr("width",500)
.attr("height",500);

option2.selectAll("rect")
.data(data).enter().append("rect")
.attr("x",100)
.attr("y", d => cyScale(d.T) - height/2)
.attr("width", 30)
.attr("height", height)
.attr("fill", function(d) {
    return colorT2(d);
  });

option2.append("g")
.attr("transform", `translate(${cxScale(0)},0)`)
.call(yAxis);
//////////////////////////////////////////////// 3
cyScale = d3.scaleLinear().domain([-500,200]).range([470,70]);
yAxis = d3.axisLeft().scale(cyScale);

option3=d3.select("#colorlegend-3")
.append("svg")
.attr("width",500)
.attr("height",500);

option3.selectAll("rect")
.data(data).enter().append("rect")
.attr("x",100)
.attr("y", d => cyScale(d.P) - height/2)
.attr("width", 30)
.attr("height", height)
.attr("fill", function(d) {
    return colorP3(d);
  });

option3.append("g")
.attr("transform", `translate(${cxScale(0)},0)`)
.call(yAxis);
////////////////////////////////////////////////4
cxScale = d3.scaleLinear().domain([-500,200]).range([80,480]);
cyScale = d3.scaleLinear().domain([-70,-60]).range([470,70]);
height = Math.ceil((cyScale.range()[0] - cyScale.range()[1]) / (10-1));
width=Math.ceil((cxScale.range()[0] - cxScale.range()[1]) / (10-1));
yAxis = d3.axisLeft().scale(cyScale).ticks(10);
xAxis = d3.axisBottom().scale(cxScale).ticks(10);

option4=d3.select("#colorlegend-4")
.append("svg")
.attr("width",500)
.attr("height",500);
option4.selectAll("rect")
.data(data).enter().append("rect")
.attr("x",d => cxScale(d.P)-width/2)
.attr("y",145)
.attr("width", 20)
.attr("height", 20)
.attr("fill", function(d) {
    return colorPT4(d);
  });
option4.append("g").selectAll("rect")
.data(data).enter().append("rect")
.attr("x",90)
.attr("y", d => cyScale(d.T) - height/2)
.attr("width", 20)
.attr("height", 20)
.attr("fill", function(d) {
    return colorPT4(d);
  });
  option4.append("g")
.attr("transform", `translate(50,0)`)
.call(yAxis);
option4.append("g")
.attr("transform", `translate(0,0)`)
.call(xAxis);