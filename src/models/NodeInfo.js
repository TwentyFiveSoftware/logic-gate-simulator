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

        this.status = false;
    }

    hasIncomingConnectionsOnPort = (id, connections) => connections.find(c => c.to.id === id) !== undefined;

    getProcessedInput = connections => {
        const processedInput = connections.filter(c => c.to.nodeInfo.id === this.id).map(c => c.from.nodeInfo.status);
        return [...processedInput, ...Array(this.nodeType.inputs - processedInput.length).fill(false)];
    }

    simulate = connections => {
        this.status = this.nodeType.transform(this.getProcessedInput(connections), this.switchEnabled);
    }
}
