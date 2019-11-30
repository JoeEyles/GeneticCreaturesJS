class Edge {
    constructor(id, weight, startNode, endNode) {
        this.id = id;
        this.startNode = startNode;
        this.endNode = endNode;
        this.weight = weight;
    }

    GetStartNode() {
        return this.startNode;
    }

    IsEndNode(nodeId) {
        return this.endNode.id == nodeId;
    }

    ToVisObject() {//http://www.cse.unsw.edu.au/~mike/myrlibrary/visNetwork/doc/network/edges.html
        return {
            from: this.startNode.id,
            to: this.endNode.id,
            width: this.weight+1,
            arrows: "to",
            label: this.weight + ""
        }
    }
}