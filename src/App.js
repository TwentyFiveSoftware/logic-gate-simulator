import React, {Component} from 'react';
import {NodeInfo} from './models/NodeInfo';
import Node from './components/Node';
import NodeType from './models/NodeType';

export default class App extends Component {

    state = {
        points: '',

        connections: [],

        nodes: [
            // new NodeInfo(NodeType.NOT_GATE),
            // new NodeInfo(NodeType.INPUT),
            // new NodeInfo(NodeType.INPUT),
            // new NodeInfo(NodeType.OUTPUT),
            // new NodeInfo(NodeType.NAND_GATE),
            // new NodeInfo(NodeType.NAND_GATE),
            // new NodeInfo(NodeType.NAND_GATE),
            // new NodeInfo(NodeType.NAND_GATE),
            // new NodeInfo(NodeType.NOT_GATE),
            // new NodeInfo(NodeType.AND_GATE),
            // new NodeInfo(NodeType.OR_GATE),
        ]
    }

    fromNode = null;
    loadedFromLocalStorage = false;

    startLine = (nodeInfo, id) => {
        this.fromNode = {nodeInfo, id};
    }

    mouseMove = (mouseX, mouseY) => {
        if (this.fromNode === null) return;

        const {x, y, width, height} = document.getElementById(this.fromNode.id).getBoundingClientRect();

        this.setState({points: `${x + width / 2},${y + height / 2} ${mouseX},${mouseY}`});
    }

    mouseUp = () => {
        this.fromNode = null;
        this.setState({points: ''});
    }

    connectLine = (nodeInfo, id) => {
        if (this.fromNode === null) return;

        if (this.state.connections.find(c => c.to.id === id) === undefined) {
            this.setState({
                    points: '',
                    connections: [...this.state.connections, {from: this.fromNode, to: {nodeInfo, id}}]
                },
                () => this.simulate()
            );
        }

        this.fromNode = null;
    }

    getConnectionLineOfConnection = connection => {
        if (document.getElementById(connection.from.id) === null || document.getElementById(connection.to.id) === null) return '';

        const fromPos = document.getElementById(connection.from.id).getBoundingClientRect();
        const toPos = document.getElementById(connection.to.id).getBoundingClientRect();
        return `${fromPos.x + fromPos.width / 2},${fromPos.y + fromPos.height / 2} ${toPos.x + toPos.width / 2},${toPos.y + toPos.height / 2}`;
    }

    simulate = () => {
        for (let i = 0; i < 2; i++)
            for (let n of this.state.nodes)
                n.simulate(this.state.connections);

        this.setState({});
    }

    removeConnection = connection => {
        if (this.fromNode !== null) return;

        this.setState(
            {connections: this.state.connections.filter(c => c !== connection)},
            () => this.simulate()
        );
    }

    removeConnections = id => {
        if (this.fromNode !== null) return;

        this.setState(
            {connections: this.state.connections.filter(c => c.from.id !== id && c.to.id !== id)},
            () => this.simulate()
        );
    }

    getConnectionStorageObject = connection =>
        ({fromNodeId: connection.from.nodeInfo.id, fromPointId: connection.from.id, toNodeId: connection.to.nodeInfo.id, toPointId: connection.to.id});

    save = () => {
        if (!this.loadedFromLocalStorage) return;

        const storageNodes = JSON.stringify(this.state.nodes.map(n => n.getStorageObject()).filter(n => n !== null));
        localStorage.setItem('nodes', storageNodes);

        const storageConnections = JSON.stringify(this.state.connections.map(c => this.getConnectionStorageObject(c)));
        localStorage.setItem('connections', storageConnections);
    }

    load = () => {
        let nodes = [];
        let connections = [];

        if (localStorage.getItem('nodes') !== null)
            nodes = JSON
                .parse(localStorage.getItem('nodes'))
                .map(n => new NodeInfo(NodeType[n.nodeTypeKey], n.id, n.pos, n.status, n.switchEnabled));

        if (localStorage.getItem('connections') !== null)
            connections = JSON
                .parse(localStorage.getItem('connections'))
                .map(c => ({
                    from: {nodeInfo: nodes.find(n => n.id === c.fromNodeId), id: c.fromPointId},
                    to: {nodeInfo: nodes.find(n => n.id === c.toNodeId), id: c.toPointId}
                }));

        this.setState(
            {nodes, connections},
            () => {
                this.loadedFromLocalStorage = true;
                this.simulate();
            }
        );
    }

    componentDidMount() {
        this.load();

        window.addEventListener('keydown', e => {
            const type = Object.values(NodeType).find(t => t.key === e.key);
            if (type !== undefined)
                this.setState({nodes: [...this.state.nodes, new NodeInfo(type)]});
        });
    }

    render() {
        this.save();

        return (
            <div className={'app'}
                 onMouseMove={e => this.mouseMove(e.clientX, e.clientY)}
                 onMouseUp={() => this.mouseUp()} onContextMenu={e => e.preventDefault()}
            >
                <svg className={'line'}>
                    <polyline points={this.state.points}/>
                </svg>

                {this.state.connections
                    .map(connection => ({connection, line: this.getConnectionLineOfConnection(connection)}))
                    .map(({connection, line}, i) =>
                        <svg className={'line ' + (connection.from.nodeInfo.status ? 'line--active' : '')} key={i}>
                            <polyline points={line} onContextMenu={() => this.removeConnection(connection)}/>
                        </svg>
                    )}

                {this.state.nodes.map((node, index) => (
                    <Node key={index}
                          startLine={id => this.startLine(node, id)}
                          connectLine={id => this.connectLine(node, id)}
                          removeConnections={id => this.removeConnections(id)}
                          nodeInfo={node}
                          connections={this.state.connections}
                          simulate={() => this.simulate()}
                    />
                ))}

            </div>
        );
    }
}
