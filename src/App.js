import React, {Component} from 'react';
import {NodeInfo} from './models/NodeInfo';
import Node from './components/Node';
import NodeType from './models/NodeType';

export default class App extends Component {

    state = {
        points: '',

        connections: [],

        nodes: [
            new NodeInfo(NodeType.INPUT),
            new NodeInfo(NodeType.INPUT),
            new NodeInfo(NodeType.NOT_GATE),
            new NodeInfo(NodeType.NOT_GATE),
            new NodeInfo(NodeType.AND_GATE),
        ]
    }

    fromNode = null;

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
                    connections: [...this.state.connections, {from: this.fromNode, to: {nodeInfo, id}, active: false}]
                },
                () => this.simulate()
            );
        }

        this.fromNode = null;
    }

    getConnectionLineOfConnection = connection => {
        const fromPos = document.getElementById(connection.from.id).getBoundingClientRect();
        const toPos = document.getElementById(connection.to.id).getBoundingClientRect();
        return `${fromPos.x + fromPos.width / 2},${fromPos.y + fromPos.height / 2} ${toPos.x + toPos.width / 2},${toPos.y + toPos.height / 2}`;
    }

    simulate = () => {
        const connections = this.state.connections;

        for (let c of connections)
            c.active = false;

        for (let c of connections)
            if (c.from.nodeInfo.isFirstNodeInLine(connections))
                c.from.nodeInfo.simulate(connections);

        this.setState({connections});
    }

    render() {
        return (
            <div className={'app'} onMouseMove={e => this.mouseMove(e.clientX, e.clientY)} onMouseUp={() => this.mouseUp()}>
                <svg className={'line'}>
                    <polyline points={this.state.points}/>
                </svg>

                {this.state.connections
                    .map(connection => ({connection, line: this.getConnectionLineOfConnection(connection)}))
                    .map(({connection, line}, i) =>
                        <svg className={'line ' + (connection.active ? 'line--active' : '')} key={i}>
                            <polyline points={line}/>
                        </svg>
                    )}

                {this.state.nodes.map((node, index) => (
                    <Node key={index}
                          startLine={id => this.startLine(node, id)}
                          connectLine={id => this.connectLine(node, id)}
                          nodeInfo={node}
                          connections={this.state.connections}
                          simulate={() => this.simulate()}
                    />
                ))}

            </div>
        );
    }
}
