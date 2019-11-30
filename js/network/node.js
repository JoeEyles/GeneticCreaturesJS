class Node {
    constructor (id, inputType, outputType) {
        this.id = id;
        this.value = 0;
        this.value_buffer = 0;
        this.edges = [];
        this.inputType = inputType;
        this.outputType = outputType;
    }

    ToVisObject() {//http://www.cse.unsw.edu.au/~mike/myrlibrary/visNetwork/doc/network/nodes.html
        var color = "grey";
        if(this.inputType != "") {
            color = "rgb(255,155,155)";
        }
        if(this.outputType != "") {
            color = "rgb(155,155,255)";
        }
        return {
            id: this.id, 
            label: this.value + "",
            shape: "circle",
            color: color 
            //fixed: true
        };
    }

    AddEdge(edge) {
        this.edges.push(edge);
    }

    CalculateNewValueBuffer() {
        this.value_buffer = 0;
        for(var i = 0; i < this.edges.length; i++) {
            if(this.edges[i].IsEndNode(this.id)) {
                this.value_buffer += this.edges[i].weight * this.edges[i].GetStartNode().value;
            }
        }
    }

    SwapValueBuffer() {
        this.value = this.value_buffer;
    }
}