




var neuralNet;

var nodes;
var edges;

document.getElementById("makeNet").onclick = function() {
  neuralNet = new NeuralNet();
  neuralNet.FromJson(document.getElementById("netUploader").value, {});
  DrawNetwork();
}

var DrawNetwork = function() {
  nodes = new vis.DataSet(neuralNet.GetVisNodeArray());
  edges = new vis.DataSet(neuralNet.GetVisEdgeArray());

  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};
  var network = new vis.Network(container, data, options);

  network.on("click", function (params) {
    var nodeId = this.getNodeAt(params.pointer.DOM);
    for(var i = 0; i < neuralNet.nodes.length; i++) {
      if(neuralNet.nodes[i].id == nodeId) {
        neuralNet.nodes[i].value = 1.0;
      }
    }
    ReDrawNetwork();
  });
}

document.getElementById("loopNet").onclick = function () {
  neuralNet.DoIteration();
  ReDrawNetwork();
}

var ReDrawNetwork = function() {
  nodes.update(neuralNet.GetVisNodeArray());
}


/*
var nodes = new vis.DataSet([//http://www.cse.unsw.edu.au/~mike/myrlibrary/visNetwork/doc/network/nodes.html
    {id: 1, label: '1', shape: "circle", fixed: true},
    {id: 2, label: '2', shape: "circle"},
    {id: 3, label: '3', shape: "circle"},
    {id: 4, label: '4', shape: "circle"},
    {id: 5, label: '5', shape: "circle"}
  ]);

  var edges = new vis.DataSet([//http://www.cse.unsw.edu.au/~mike/myrlibrary/visNetwork/doc/network/edges.html
    {from: 1, to: 3, width: 1, arrows:"to", label:"10"},
    {from: 1, to: 2, width: 6, arrows:"from"},
    {from: 2, to: 4, width: 1, label: "0.1"},
    {from: 2, to: 5, width: 3, label: "1.0"},
    {from: 2, to: 3, width: 1},
  ]);

  var container = document.getElementById('mynetwork');
  var data = {//http://www.cse.unsw.edu.au/~mike/myrlibrary/visNetwork/doc/network/
    nodes: nodes,
    edges: edges
  };
  var options = {};
  var network = new vis.Network(container, data, options);
  */