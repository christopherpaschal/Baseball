// set the dimensions and margins of the graph
var margin = {top: 25, right: 25, bottom: 25, left: 35},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var formatDecimal = d3.format(".3f");

var radius = Math.min(200, 200) / 2;

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 40)
    .padAngle(.03);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.percent; });

var svgTS1 = d3.select("#donut_1").append("svg")
    .attr("width", 200 + margin.left + margin.right)
    .attr("height", 200 + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + 200 / 2 + "," + 200 / 2 + ")");

var svgTS2 = d3.select("#donut_2").append("svg")
    .attr("width", 200 + margin.left + margin.right)
    .attr("height", 200 + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + 200 / 2 + "," + 200 / 2 + ")");

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

  var team1 = d3.select("#team_selector_1");

  var teamHistory = d3.nest()
    .key(function(d) { return d.Team; })
    .rollup(function(v) {
      return [
        {avg: formatDecimal(d3.mean(v, function(d) { return d.Games; }))},
        {name:"total_pos", percent: d3.sum(v, function(d) { return +d.Wins; })},
        {name:"total_neg", percent: d3.sum(v, function(d) { return +d.Losses; })}
      ]
    })
    .object(data);

  team1.on("change", function() {

    svgTS1.selectAll(".arc").remove()
    svgTS1.selectAll("text").remove()

    var b = svgTS1.selectAll(".arc")
        .data(pie(teamHistory[document.getElementById("team_selector_1").value]))
      .enter().append("g")
        .attr("class", "arc");

    var path = b.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return (d.data.name == "total_pos") ? "green" : "red"; });

    path.transition()
      .duration(1000)
      .attrTween('d', function(d) {
          var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
          return function(t) {
              return arc(interpolate(t));
          };

    b.append("text")
        .transition()
        .duration(200)
        .delay(1000)
        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".4em")
        .attr("text-anchor", "middle")
        .text(function(d) { if(d.data.percent) {return d.data.percent; } });

    b.append("text")
        .attr("class", "avg")
        .transition()
        .duration(200)
        .delay(1000)
        .attr("dy", ".4em")
        .attr("text-anchor", "middle")
        .attr("fill", function(d) { return z(d.data.avg); })
        .text(function(d) { return d.data.avg; });
    });


  });

});
