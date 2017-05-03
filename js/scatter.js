// set the dimensions and margins of the graph
var marginSC = {top: 40, right: 25, bottom: 25, left: 40},
    width = 1200 - marginSC.left - marginSC.right,
    height = 600 - marginSC.top - marginSC.bottom;


// set the scales
var xScaleSC = d3.scaleLinear().range([0, width]);
var yScaleSC = d3.scaleLinear().range([height, 0]);

var winScale = d3.scalePow().domain([35, 120]).range([2, 8]);

var svgSC = d3.select("#scatter_view").append("svg")
    .attr("width", width + marginSC.left + marginSC.right)
    .attr("height", height + marginSC.top + marginSC.bottom)
    .attr("class", "main")
    .append("g")
      .attr("transform", "translate(" + marginSC.left + "," + marginSC.top + ")");

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var teamColor = function(team) {
    if (team == "WSN") {
      return "#ab0003";
    } else if (team == "TOR") {
      return "#134a8e";
    } else if (team == "TEX") {
      return "#c0111f";
    } else if (team == "TBD") {
      return "#092c5c";
    } else if (team == "STL") {
      return "#c41e3a";
    } else if (team == "SFG") {
      return "#fd5a1e";
    } else if (team == "SEA") {
      return "#0c2c56";
    } else if (team == "SDP") {
      return "#002d62";
    } else if (team == "PIT") {
      return "#fdb827";
    } else if (team == "PHI") {
      return "#e81828";
    } else if (team == "OAK") {
      return "#003831";
    } else if (team == "NYM") {
      return "#ff5910";
    } else if (team == "NYY") {
      return "#003087";
    } else if (team == "MIN") {
      return "#002b5c";
    } else if (team == "MIL") {
      return "#0a2351";
    } else if (team == "FLA") {
      return "#ff6600";
    } else if (team == "LAD") {
      return "#005a9c";
    } else if (team == "ANA") {
      return "#ba0021";
    } else if (team == "KCR") {
      return "#004687";
    } else if (team == "HOU") {
      return "#eb6e1f";
    } else if (team == "DET") {
      return "#0c2c56";
    } else if (team == "COL") {
      return "#333366";
    } else if (team == "CLE") {
      return "#e31937";
    } else if (team == "CIN") {
      return "#c6011f";
    } else if (team == "CHC") {
      return "#0e3386";
    } else if (team == "CHW") {
      return "#000000";
    } else if (team == "BOS") {
      return "#bd3039";
    } else if (team == "BAL") {
      return "#df4601";
    } else if (team == "ARI") {
      return "#a71930";
    } else if (team == "ATL") {
      return "#ce1141";
    }
}

// Get the data
d3.csv("data/Teams.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.Year = +d.yearID;
      d.League = d.lgID;
      d.Team = d.franchID;
      d.Division = d.divID;
      d.Rank = +d.Rank;
      d.Games = +d.G;
      d.HomeGames = +d.Ghome;
      d.Wins = +d.W;
      d.Losses = +d.L;
      d.WonDivision = d.DivWin;
      d.WonWildCard = d.WCWin;
      d.WonLeague = d.LgWin;
      d.WonWS = d.WSWin;
      d.R = +d.R;
      d.AB = +d.AB;
      d.H = +d.H;
      d.DB = +d.DB;
      d.TP = +d.TP;
      d.HR = +d.HR;
      d.BB = +d.BB;
      d.SO = +d.SO;
      d.SB = +d.SB;
      d.CS = +d.CS;
      d.HBP = +d.HBP;
      d.SF = +d.SF;
      d.RA = +d.RA;
      d.ER = +d.ER;
      d.ERA = +d.ERA;
      d.CG = +d.CG;
      d.SHO = +d.SHO;
      d.SV = +d.SV;
      d.OP = +d.IPOuts;
      d.HA = +d.HA;
      d.HRA = +d.HRA;
      d.BBA = +d.BBA;
      d.SOA = +d.SOA;
      d.E = +d.E;
      d.DP = +d.DP;
      d.FP = +d.FP;
      d.Name = d.name;
      d.Park = d.park;
      d.Attendance = +d.attendance;
      d.BPF = +d.BPF;
      d.PPF = +d.PPF;

  });
  // filter out data before 1900 (kinda arbitrary)
  data = data.filter(function(d) {
      return d.Year >= 1900;
  });

  // set domains of scales
  xScaleSC.domain([0, 1800]);
  yScaleSC.domain([0, 300]);

  // Add the X Axis
  svgSC.append("g")
      .attr('class', 'xAxisSC')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScaleSC))
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .attr("fill", "black")
        .style("text-anchor", "end")

  // Add the Y Axis
  svgSC.append("g")
      .attr('class', 'yAxisSC')
      .call(d3.axisLeft(yScaleSC))
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("fill", "black")
        .style("text-anchor", "end")


  //add scatterplot to overlay on line graph
  svgSC.selectAll(".dot")
      .data(data)
  .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d) {
        return winScale(d.Wins);
      })
      .attr("cx", function(d) { return xScaleSC(d.H); })
      .attr("cy", function(d) { return yScaleSC(d.HR); })
      .attr("fill", function(d) {
        return teamColor(d.Team);
      })
      .on("mouseover", function(d) {
        d3.select(this).attr("opacity", 1)
        tooltip.style("opacity", 1);
        tooltip.html(d.Year + "<br/>" + d.Team + "<br/>" + "Wins: " + d.Wins)
          .style("left", d3.event.pageX + 5 + "px")
          .style("top", d3.event.pageY + 5 + "px")
      })
      .on("mouseout", function(d) {
          tooltip.style("opacity", 0);
      });

  var selectX = document.getElementById("select_x");
  var selectY = document.getElementById("select_y");

  selectX.onchange = function() {

    var yAxis = selectY.options[selectY.selectedIndex].value;

    if (selectX.options[selectX.selectedIndex].value == "H") {
      xScaleSC.domain([0, 1800]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.H / 1800) * 1000;
        })
        .attr("cx", function(d) {
            return xScaleSC(d.H);  // Circle's X
        })
        .attr("cy", function(d) {
            return yScaleSC(d[yAxis]);  // Circle's Y
        });

        svgSC.select(".xAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisBottom(xScaleSC));
    } else if (selectX.options[selectX.selectedIndex].value == "HR") {
      xScaleSC.domain([0, 300]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.HR / 300) * 1000;
        })
        .attr("cx", function(d) {
            return xScaleSC(d.HR);  // Circle's X
        })
        .attr("cy", function(d) {
            return yScaleSC(d[yAxis]);  // Circle's Y
        });

        svgSC.select(".xAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisBottom(xScaleSC));
    } else if (selectX.options[selectX.selectedIndex].value == "R") {
      xScaleSC.domain([0, 1200]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.R / 1200) * 1000;
        })
        .attr("cx", function(d) {
            return xScaleSC(d.R);  // Circle's X
        })
        .attr("cy", function(d) {
            return yScaleSC(d[yAxis]);  // Circle's Y
        });

        svgSC.select(".xAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisBottom(xScaleSC));
    } else if (selectX.options[selectX.selectedIndex].value == "HA") {
      xScaleSC.domain([0, 1700]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.HA / 1700) * 1000;
        })
        .attr("cx", function(d) {
            return xScaleSC(d.HA);  // Circle's X
        })
        .attr("cy", function(d) {
            return yScaleSC(d[yAxis]);  // Circle's Y
        });

        svgSC.select(".xAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisBottom(xScaleSC));
    } else if (selectX.options[selectX.selectedIndex].value == "RA") {
      xScaleSC.domain([0, 1400]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.RA / 1400) * 1000;
        })
        .attr("cx", function(d) {
            return xScaleSC(d.RA);  // Circle's X
        })
        .attr("cy", function(d) {
            return yScaleSC(d[yAxis]);  // Circle's Y
        });

        svgSC.select(".xAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisBottom(xScaleSC));
    } else if (selectX.options[selectX.selectedIndex].value == "SOA") {
      xScaleSC.domain([0, 1500]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.SOA / 1500) * 1000;
        })
        .attr("cx", function(d) {
            return xScaleSC(d.SOA);  // Circle's X
        })
        .attr("cy", function(d) {
            return yScaleSC(d[yAxis]);  // Circle's Y
        });

        svgSC.select(".xAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisBottom(xScaleSC));
    } else if (selectX.options[selectX.selectedIndex].value == "HRA") {
      xScaleSC.domain([0, 300]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.HRA / 300) * 1000;
        })
        .attr("cx", function(d) {
            return xScaleSC(d.HRA);  // Circle's X
        })
        .attr("cy", function(d) {
            return yScaleSC(d[yAxis]);  // Circle's Y
        });

        svgSC.select(".xAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisBottom(xScaleSC));
    } else if (selectX.options[selectX.selectedIndex].value == "Year") {
      xScaleSC.domain([1899, 2017]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.Year / 2016) * 1000;
        })
        .attr("cx", function(d) {
            return xScaleSC(d.Year);  // Circle's X
        })
        .attr("cy", function(d) {
            return yScaleSC(d[yAxis]);  // Circle's Y
        });

        svgSC.select(".xAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisBottom(xScaleSC).tickFormat(d3.format("d")));
    }
  }

  selectY.onchange = function() {

    var xAxis = selectX.options[selectX.selectedIndex].value;

    if (selectY.options[selectY.selectedIndex].value == "H") {
      yScaleSC.domain([0, 1800]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.H / 1800) * 1000;
        })
        .attr("cy", function(d) {
            return yScaleSC(d.H);  // Circle's X
        })
        .attr("cx", function(d) {
            return xScaleSC(d[xAxis]);  // Circle's Y
        });

        svgSC.select(".yAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisLeft(yScaleSC));
    } else if (selectY.options[selectY.selectedIndex].value == "HR") {
      yScaleSC.domain([0, 300]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.HR / 300) * 1000;
        })
        .attr("cy", function(d) {
            return yScaleSC(d.HR);  // Circle's X
        })
        .attr("cx", function(d) {
            return xScaleSC(d[xAxis]);  // Circle's Y
        });

        svgSC.select(".yAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisLeft(yScaleSC));
    } else if (selectY.options[selectY.selectedIndex].value == "R") {
      yScaleSC.domain([0, 1200]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.R / 1200) * 1000;
        })
        .attr("cy", function(d) {
            return yScaleSC(d.R);  // Circle's X
        })
        .attr("cx", function(d) {
            return xScaleSC(d[xAxis]);  // Circle's Y
        });

        svgSC.select(".yAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisLeft(yScaleSC));
    } else if (selectY.options[selectY.selectedIndex].value == "HA") {
      yScaleSC.domain([0, 1700]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.HA / 1700) * 1000;
        })
        .attr("cy", function(d) {
            return yScaleSC(d.HA);  // Circle's X
        })
        .attr("cx", function(d) {
            return xScaleSC(d[xAxis]);  // Circle's Y
        });

        svgSC.select(".yAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisLeft(yScaleSC));
    } else if (selectY.options[selectY.selectedIndex].value == "RA") {
      yScaleSC.domain([0, 1400]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.RA / 1400) * 1000;
        })
        .attr("cy", function(d) {
            return yScaleSC(d.RA);  // Circle's X
        })
        .attr("cx", function(d) {
            return xScaleSC(d[xAxis]);  // Circle's Y
        });

        svgSC.select(".yAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisLeft(yScaleSC));
    } else if (selectY.options[selectY.selectedIndex].value == "SOA") {
      yScaleSC.domain([0, 1500]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.SOA / 1500) * 1000;
        })
        .attr("cy", function(d) {
            return yScaleSC(d.SOA);  // Circle's X
        })
        .attr("cx", function(d) {
            return xScaleSC(d[xAxis]);  // Circle's Y
        });

        svgSC.select(".yAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisLeft(yScaleSC));
    } else if (selectY.options[selectY.selectedIndex].value == "HRA") {
      yScaleSC.domain([0, 300]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.HRA / 300) * 1000;
        })
        .attr("cy", function(d) {
            return yScaleSC(d.HRA);  // Circle's X
        })
        .attr("cx", function(d) {
            return xScaleSC(d[xAxis]);  // Circle's Y
        });

        svgSC.select(".yAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisLeft(yScaleSC));
    } else if (selectY.options[selectY.selectedIndex].value == "Wins") {
      yScaleSC.domain([0, 165]);
      svgSC.selectAll("circle")
        .data(data)
        .transition()
        .delay(function(d, i) {
          return i / data.length * 500;
        })
        .duration(function(d) {
          return (d.Wins / 162) * 1000;
        })
        .attr("cy", function(d) {
            return yScaleSC(d.Wins);  // Circle's X
        })
        .attr("cx", function(d) {
            return xScaleSC(d[xAxis]);  // Circle's Y
        });

        svgSC.select(".yAxisSC")
         .transition()
         .duration(1000)
         .call(d3.axisLeft(yScaleSC));
    }
  }

});
