// set the dimensions and margins of the graph
var margin = {top: 25, right: 25, bottom: 25, left: 25},
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// set the scales
var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);

var svg = d3.select("#main_view").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "main")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Get the data
d3.csv("data/Teams.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.G = +d.G;
      d.HomeWins = +d.Ghome;
      d.Wins = +d.W;
      d.Year = +d.yearID;
      d.Team = d.franchID;

  });

  var dataBOS = data.filter(function(d) {
    return d.Team == "BOS" && d.Year >= 1900;
  }).sort(function(a,b) {return b.Year - a.Year;});

  var dataATL = data.filter(function(d) {
    return d.Team == "ATL" && d.Year >= 1900;
  }).sort(function(a,b) {return b.Year - a.Year;});

  xScale.domain([1900, 2016]);
  yScale.domain([0, 162]);

  // define the line
  var line = d3.line()
      .x(function(d) { return xScale(d.Year); })
      .y(function(d) { return yScale(d.Wins); });

  //Add the valueline path.
  svg.append("path")
      .data([dataBOS])
      .attr("class", "line")
      .attr("stroke", "#ff0000")
      .attr("d", line);

  //Add the valueline path.
  svg.append("path")
      .data([dataATL])
      .attr("class", "line")
      .attr("stroke", "#0000ff")
      .attr("d", line);

  // Add the X Axis
  svg.append("g")
      .attr('class', 'axisX')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .attr("fill", "black")
        .style("text-anchor", "end")
        .text("Year");

  // Add the Y Axis
  svg.append("g")
      .attr('class', 'axis')
      .call(d3.axisLeft(yScale))
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("fill", "black")
        .style("text-anchor", "end")
        .text("Wins");

  //add scatterplot to overlay on line graph
  svg.selectAll("dot")
      .data(dataBOS)
  .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("cx", function(d) { return xScale(d.Year); })
      .attr("cy", function(d) { return yScale(d.Wins); })
      .attr("fill", "#ff0000")
      .attr("opacity", function(d) {
        if (d.WSWin == "Y") {
          return 1;
        } else {
          return 0;
        }
      }).on("mouseover", function(d) {
        d3.select(this).attr("opacity", 1)
        tooltip.style("opacity", 1);
        tooltip.html("Year: " + d.Year + "<br/>" + "Wins: " + d.Wins)
          .style("left", d3.event.pageX + 5 + "px")
          .style("top", d3.event.pageY + 5 + "px")
      })
      .on("mouseout", function(d) {
          d3.select(this).attr("opacity",  function(d) {
            if (d.WSWin == "Y") {
              return 1;
            } else {
              return 0;
            }
          });
          tooltip.style("opacity", 0);
      });

    //add scatterplot to overlay on line graph
    svg.selectAll("dot")
        .data(dataATL)
    .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function(d) { return xScale(d.Year); })
        .attr("cy", function(d) { return yScale(d.Wins); })
        .attr("fill", "#0000ff")
        .attr("opacity", function(d) {
          if (d.WSWin == "Y") {
            return 1;
          } else {
            return 0;
          }
        }).on("mouseover", function(d) {
          d3.select(this).attr("opacity", 1)
          tooltip.style("opacity", 1);
          tooltip.html("Year: " + d.Year + "<br/>" + "Wins: " + d.Wins)
            .style("left", d3.event.pageX + 5 + "px")
            .style("top", d3.event.pageY + 5 + "px");
        })
        .on("mouseout", function(d) {
            d3.select(this).attr("opacity",  function(d) {
              if (d.WSWin == "Y") {
                return 1;
              } else {
                return 0;
              }
            });
            tooltip.style("opacity", 0);
        });

})
