class JVis {
    constructor(neuralNet, container) {
        this.neuralNet = neuralNet;
        this.container = container;
        
        this.nodes = new vis.DataSet(neuralNet.GetVisNodeArray());
        this.edges = new vis.DataSet(neuralNet.GetVisEdgeArray());

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

}