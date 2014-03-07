function show_graphs(data, prefix) {
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

