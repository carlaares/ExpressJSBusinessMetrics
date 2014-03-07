function show_graphs(values, prefix) {
  if (data.length == 0) {
    document.getElementById(prefix+'y_axis');
  } else {
    var graph = new Rickshaw.Graph( {
        element: document.querySelector("#chart"),
        width: 580,
        height: 250,
        series: [ {
              color: 'steelblue',
              data: data
        } ]
    } );
    var axes = new Rickshaw.Graph.Axis.Time( { graph: graph } );
    var y_axis = new Rickshaw.Graph.Axis.Y( {
        graph: graph,
        orientation: 'left',
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        element: document.getElementById(prefix+'y_axis'),
    } );
    graph.render();
  }
}

function getLastWeek(){
  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  return lastWeek ;
}

function getLastMonth(){
  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 31);
  return lastWeek ;
}

function getUnixTime(today){
  return  (new Date(today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()+' 00:00:00')).getTime()/1000;
}