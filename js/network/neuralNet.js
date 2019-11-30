class NeuralNet {
constructor() {
    this.nodes = [];
    this.edges = [];
}

FromJson(fromJson, randomizeOptions) {//TODO: randomize!
    var jsonObject = JSON.parse(fromJson);

    for(var i = 0; i < jsonObject.nodes.length; i++) {
        this.nodes.push(new Node(jsonObject.nodes[i].id, jsonObject.nodes[i].inputType, jsonObject.nodes[i].outputType));
    }
    for(var i = 0; i < jsonObject.edges.length; i++) {
        var startNode = this.GetNodeById(jsonObject.edges[i].startId);
        var endNode = this.GetNodeById(jsonObject.edges[i].endId);
        var edge = new Edge(jsonObject.edges[i].id, jsonObject.edges[i].weight, startNode, endNode)
        this.edges.push(edge);
        startNode.AddEdge(edge);
        endNode.AddEdge(edge);
    }
}

GetNodeById(id) {
    for(var i = 0; i < this.nodes.length; i++) {
        if(this.nodes[i].id == id)
            return this.nodes[i];
    }
}

GetUnusedNodeId() {
    var max = 0;
    for(var i = 0; i < this.nodes.length; i++) {
        max = Math.max(this.nodes[i].id, max);
    }
    return max + 1;
}

GetUnusedEdgeId() {
    var max = 0;
    for(var i = 0; i < this.edges.length; i++) {
        max = Math.max(this.edges[i].id, max);
    }
    return max + 1;
}

ToJson() {
    var jsonObject = {
        nodes: [],
        edges: []
    };
    for(var i = 0; i < this.nodes.length; i++) {
        jsonObject.nodes.push({
            id: this.nodes[i].id,
            inputType: this.nodes[i].inputType,
            outputType: this.nodes[i].outputType,
        });
    }
    for(var i = 0; i < this.edges.length; i++) {
        jsonObject.edges.push({
            id: this.edges[i].id,
            weight: this.edges[i].weight,
            startId: this.edges[i].startNode.id,
            endId: this.edges[i].endNode.id
        });
    }
    return JSON.stringify(jsonObject);
}

DoIteration() {
    for(var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].CalculateNewValueBuffer();
    }
    for(var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].SwapValueBuffer();
    }
}

SetNodeInputs(inputs) {
    for(var i = 0; i < this.nodes.length; i++) {
        for(var j = 0; j < inputs.length; j++) {
            if(this.nodes[i].inputType == inputs[j].type)
                this.nodes[i].value = inputs[j].value;
        }
    }
}

GetNodeOutputs() {
    var outputs = {};
    for(var i = 0; i < this.nodes.length; i++) {
        if(this.nodes[i].outputType != "") {
            outputs[this.nodes[i].outputType] = this.nodes[i].value;
        }
    }
    return outputs;
}

GetVisNodeArray() {
    var output = [];
    for(var i = 0; i < this.nodes.length; i++) {
        output.push(this.nodes[i].ToVisObject());
    }
    return output;
}

GetVisEdgeArray() {
    var output = [];
    for(var i = 0; i < this.edges.length; i++) {
        output.push(this.edges[i].ToVisObject());
    }
    return output;
}

}