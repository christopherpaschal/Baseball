// set the dimensions and margins of the graph
var margin = {top: 25, right: 25, bottom: 25, left: 35},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


// set the scales
var xScaleHM = d3.scaleLinear().range([0, width]);
var yScaleHM = d3.scaleLinear().range([height, 0]);


var svgHM = d3.select("#heatmap_view").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "main")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
  xScaleHM.domain([0, 162]);
  yScaleHM.domain([1900, 2020]);

  //xScaleHM.domain(d3.extent(data, function(d){return d.Games;}));
  //yScaleHM.domain(d3.extent(data, function(d){return d.Year;}).reverse());

  // Add the X Axis
  svgHM.append("g")
      .attr('class', 'xAxis')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScaleHM).tickFormat(d3.format("d")))
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .attr("fill", "black")
        .style("text-anchor", "end")
        .text("Game");

  // Add the Y Axis
  svgHM.append("g")
      .attr('class', 'axis')
      .call(d3.axisLeft(yScaleHM).tickFormat(d3.format("d")))
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("fill", "black")
        .style("text-anchor", "end")
        .text("Year");

  // append tiles for each game
  svg.selectAll(".HMtile")
      .data(data)
    .enter().append("rect")
      .attr("class", "HMtile")
      .attr("x", function(d) { return xHM(d.Year); })
      .attr("y", function(d) { return yHM(d.Rank-1); })
      .attr("width", width / 50)
      .attr("height",  height / 100)
      .style("fill", function(d) { return z(d.Sentiment); })
      .attr("opacity", 0)
      .attr("display", "none")
      .on("mouseover", function(d) {
        tooltip.style("opacity", 1);
        tooltip.html("Song: " + d.Song + "<br/>" + "Artist: " + d.Artist)
          .style("left", d3.event.pageX + 5 + "px")
          .style("top", d3.event.pageY + 5 + "px")
      })
      .on("mouseout", function(d) {
          tooltip.style("opacity", 0)
      });


});
