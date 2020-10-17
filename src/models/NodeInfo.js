import {v4} from 'uuid';

export class NodeInfo {
    constructor(nodeType) {
        this.id = v4();
        this.nodeType = nodeType;
        this.name = nodeType.name;

        this.hasSwitch = nodeType.hasSwitch;
        this.switchEnabled = false;

        this.inputs = [];
        this.outputs = [];

        for (let i = 0; i < nodeType.inputs; i++)
            this.inputs.push(`NODE-${this.id}_INPUT-${i}`);

        for (let o = 0; o < nodeType.outputs; o++)
            this.outputs.push(`NODE-${this.id}_OUTPUT-${o}`);
    }

    hasIncomingConnectionsOnPort = (id, connections) => connections.find(c => c.to.id === id) !== undefined;

    getIncomingConnections = connections => connections.filter(c => c.to.nodeInfo.id === this.id);
    getOutgoingConnections = connections => connections.filter(c => c.from.nodeInfo.id === this.id);

    isFirstNodeInLine = connections => this.getIncomingConnections(connections).length === 0 && this.getOutgoingConnections(connections).length > 0;

    getProcessedInput = connections => {
        const processedInput = this.getIncomingConnections(connections).map(c => c.active);
        return [...processedInput, ...Array(this.nodeType.inputs - processedInput.length).fill(false)];
    }

    calculateState = connections => this.nodeType.transform(this.getProcessedInput(connections), this.switchEnabled);

    simulate = connections => {
        const output = this.calculateState(connections);

        // console.log(this.nodeType.name);
        // console.log(this.getProcessedInput(connections));
        // console.log(output);

        this.getOutgoingConnections(connections).forEach(c => {
            c.active = output;
            c.to.nodeInfo.simulate(connections);
        });
    }
}
