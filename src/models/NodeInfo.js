import {v4} from 'uuid';
import NodeType from "./NodeType";

export class NodeInfo {
    constructor(nodeType, id = v4(), defaultPos = {x: 50, y: 50}, startStatus = false, startSwitchEnabled = false) {
        this.id = id;
        this.nodeType = nodeType;
        this.defaultPos = defaultPos;

        this.switchEnabled = startSwitchEnabled;
        this.status = startStatus;

        this.inputs = [];
        this.outputs = [];

        for (let i = 0; i < nodeType.inputs; i++)
            this.inputs.push(`NODE-${this.id}_INPUT-${i}`);

        for (let o = 0; o < nodeType.outputs; o++)
            this.outputs.push(`NODE-${this.id}_OUTPUT-${o}`);
    }

    hasIncomingConnectionsOnPort = (id, connections) => connections.find(c => c.to.id === id) !== undefined;

    getProcessedInput = connections => {
        const processedInput = connections.filter(c => c.to.nodeInfo.id === this.id).map(c => c.from.nodeInfo.status);
        return [...processedInput, ...Array(this.nodeType.inputs - processedInput.length).fill(false)];
    }

    simulate = connections => {
        this.status = this.nodeType.transform(this.getProcessedInput(connections), this.switchEnabled);
    }

    getStorageObject = () => {
        if (document.getElementById(this.id) === null) return null;

        const pos = document.getElementById(this.id).getBoundingClientRect();

        return {
            id: this.id,
            nodeTypeKey: Object.keys(NodeType).find(k => NodeType[k] === this.nodeType),
            pos: {x: pos.x, y: pos.y},
            status: this.status,
            switchEnabled: this.switchEnabled
        };
    }
}
