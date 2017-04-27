// set the dimensions and margins of the graph
var margin = {top: 25, right: 25, bottom: 25, left: 25},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


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
      return "#ef3e42";
    } else if (team == "ANA") {
      return "#ba0021";
    } else if (team == "KCR") {
      return "#004687";
    } else if (team == "HOU") {
      return "#002d62";
    } else if (team == "DET") {
      return "#0c2c56";
    } else if (team == "COL") {
      return "#333366";
    } else if (team == "CLE") {
      return "#e31937";
    } else if (team == "CIN") {
      return "#c6011f";
    } else if (team == "CHC") {
      return "#cc3433";
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
  xScale.domain([1900, 2016]);
  yScale.domain([0, 162]);

  // define the line
  var winsLine = d3.line()
      .x(function(d) { return xScale(d.Year); })
      .y(function(d) { return yScale(d.Wins); });

  // Add the line for each team
  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "WSN";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("WSN"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "TOR";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("TOR"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "TEX";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("TEX"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "TBD";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("TBD"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "STL";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("STL"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "SFG";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("SFG"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "SEA";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("SEA"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "SDP";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("SDP"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "PIT";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("PIT"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "PHI";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("PHI"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "OAK";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("OAK"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "NYM";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("NYM"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "NYY";
      })])
      .attr("class", "line")
      .attr("id", "NYYline")
      .attr("stroke", teamColor("NYY"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "MIN";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("MIN"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "MIL";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("MIL"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "FLA";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("FLA"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "LAD";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("LAD"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "ANA";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("ANA"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "KCR";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("KCR"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "HOU";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("HOU"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "DET";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("DET"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "COL";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("COL"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "CLE";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("CLE"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "CIN";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("CIN"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "CHC";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("CHC"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "CHW";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("CHW"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "BOS";
      })])
      .attr("class", "line")
      .attr("id", "BOSline")
      .attr("stroke", teamColor("BOS"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "BAL";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("BAL"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "ARI";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("ARI"))
      .attr("d", winsLine);

  svg.append("path")
      .data([data.filter(function(d) {
        return d.Team == "ATL";
      })])
      .attr("class", "line")
      .attr("stroke", teamColor("ATL"))
      .attr("d", winsLine);


  // Add the X Axis
  svg.append("g")
      .attr('class', 'axis')
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
      .data(data)
  .enter().append("circle")
      .attr("class", "dot")
      .attr("id", function(d) {
        return d.Team + "dot";
      })
      .attr("r", 4)
      .attr("cx", function(d) { return xScale(d.Year); })
      .attr("cy", function(d) { return yScale(d.Wins); })
      .attr("fill", function(d) {
        return teamColor(d.Team);
      })
      .attr("opacity", function(d) {
        if (d.WSWin == "Y") {
          return 1;
        } else {
          return 0;
        }
      }).on("mouseover", function(d) {
        d3.select(this).attr("opacity", 1)
        tooltip.style("opacity", 1);
        tooltip.html(d.Team + "<br/>" + "Year: " + d.Year + "<br/>" + "Wins: " + d.Wins)
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

    d3.selectAll("input[name='checkbox']").on("change", function() {

      // grey out all
      svg.selectAll(".line").style("opacity", 0.1);
      svg.selectAll(".dot").style("display", "none");

      // check all team's checkboxes, grey out accordingly
      if (document.getElementById("NYY").checked) {
        svg.selectAll("#NYYline").style("opacity", 1);
        svg.selectAll("#NYYdot").style("display", "inline")
          .style("opacity", function(d) {
            if (d.WSWin == "Y") {
              return 1;
            } else {
              return 0;
            }
          });
      }
      if (document.getElementById("BOS").checked) {
        svg.selectAll("#BOSline").style("opacity", 1);
        svg.selectAll("#BOSdot").style("display", "inline")
          .style("opacity", function(d) {
            if (d.WSWin == "Y") {
              return 1;
            } else {
              return 0;
            }
          });
      }

    });

});
