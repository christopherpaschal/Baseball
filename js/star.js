// set the dimensions and margins of the graph
var margin = {top: 25, right: 25, bottom: 25, left: 55},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


var svgS = d3.select("#star_1").append("svg")
    .attr("width", 500 + margin.left + margin.right)
    .attr("height", 500 + margin.top + margin.bottom)
    .attr("class", "main")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

for (year = 2016; year >= 1900; year--) {
  var option = document.createElement("option");
  option.text = year;
  var select = document.getElementById("year_star_selector_1").add(option);
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

  var rangeH = d3.extent(data, function(d) { return d.H; });
  var rangeR = d3.extent(data, function(d) { return d.R; });
  var rangeHR = d3.extent(data, function(d) { return d.HR; });
  var rangeHA = d3.extent(data, function(d) { return d.HA; });
  var rangeRA = d3.extent(data, function(d) { return d.RA; });
  var rangeSOA = d3.extent(data, function(d) { return d.SOA; });

  var scaleH = d3.scaleLinear().domain(rangeH).range([0, 100]);
  var scaleR = d3.scaleLinear().domain(rangeR).range([0, 100]);
  var scaleHR = d3.scaleLinear().domain(rangeHR).range([0, 100]);
  var scaleHA = d3.scaleLinear().domain(rangeHA).range([0, 100]);
  var scaleRA = d3.scaleLinear().domain(rangeRA).range([0, 100]);
  var scaleSOA = d3.scaleLinear().domain(rangeSOA).range([0, 100]);

  var team1 = document.getElementById("team_star_selector_1");
  var year1 = document.getElementById("year_star_selector_1");

  var team2 = document.getElementById("team_star_selector_2");
  var year2 = document.getElementById("year_star_selector_2");

  team1.onchange = function() {

    var team = team1.options[team1.selectedIndex].value;
    var year = year1.options[year1.selectedIndex].value;

    if (team == "select a team" || year1.selectedIndex == 0) {
      return
    }

    svgS.selectAll(".star-origin").remove();
    svgS.selectAll(".star-label").remove();
    svgS.selectAll(".star-axis").remove();
    svgS.selectAll(".star-path").remove();
    svgS.selectAll(".star-title").remove();

    teamData = data.filter(function(d) {
        return d.Year == year && d.Team == team;
    });

    var star = d3.starPlot()
        .width(350)
        .properties([
          "H",
          "R",
          "HR",
          "HA",
          "RA",
          "SOA"
        ])
        .scales([scaleH, scaleR, scaleHR, scaleHA, scaleRA, scaleSOA])
        .labels([
          "Hits",
          "Runs",
          "HRs",
          "Hits Allowed",
          "Runs Against",
          "Strikeouts"
        ])
        .title(function(d) { return d.Year + " " + d.Team; })
        .margin(margin)
        .labelMargin(8)
        .includeGuidelines(true)
        .fillColor(teamColor(team));

    var starG = svgS
        .datum(teamData[0])
        .call(star)
  }

  year1.onchange = function() {

    var team = team1.options[team1.selectedIndex].value;
    var year = year1.options[year1.selectedIndex].value;

    if (team == "select a team" || year1.selectedIndex == 0) {
      return
    }

    svgS.selectAll(".star-origin").remove();
    svgS.selectAll(".star-label").remove();
    svgS.selectAll(".star-axis").remove();
    svgS.selectAll(".star-path").remove();
    svgS.selectAll(".star-title").remove();

    teamData = data.filter(function(d) {
        return d.Year == year && d.Team == team;
    });

    if (!teamData[0]) {
      return
    }

    var star = d3.starPlot()
        .width(350)
        .properties([
          "H",
          "R",
          "HR",
          "HA",
          "RA",
          "SOA"
        ])
        .scales([scaleH, scaleR, scaleHR, scaleHA, scaleRA, scaleSOA])
        .labels([
          "Hits",
          "Runs",
          "HRs",
          "Hits Allowed",
          "Runs Against",
          "Strikeouts"
        ])
        .title(function(d) { return d.Year + " " + d.Team; })
        .margin(margin)
        .labelMargin(8)
        .includeGuidelines(true)
        .fillColor(teamColor(team));

    var starG = svgS
        .datum(teamData[0])
        .call(star)
  }






});
