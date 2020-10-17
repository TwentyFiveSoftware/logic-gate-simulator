import React, {Component} from 'react';
import Draggable from 'react-draggable';
import {ReactSVG} from 'react-svg';

export default class Node extends Component {
    toggleSwitch = () => {
        this.props.nodeInfo.switchEnabled = !this.props.nodeInfo.switchEnabled;
        this.props.simulate();
    }

    render() {
        const {nodeInfo, connections} = this.props;

        return (
            <Draggable handle={'.node__container'} defaultPosition={nodeInfo.defaultPos} positionOffset={this.props.positionOffset}>
                <div className={'node'} id={nodeInfo.id}>
                    <div className={'node__container ' + (nodeInfo.status ? 'node__container--active' : '')}>
                        <div className={'node__name'}>{nodeInfo.nodeType.name}</div>

                        {nodeInfo.nodeType.svg !== null &&
                        <div className={'node__svg ' + (nodeInfo.status ? 'node__svg--active' : '')}>
                            <ReactSVG src={`assets/${nodeInfo.nodeType.svg}`} />
                        </div>
                        }

                        {nodeInfo.nodeType.hasSwitch &&
                        <div className={'switch ' + (nodeInfo.switchEnabled ? 'switch--active' : '')} onClick={() => this.toggleSwitch()}>
                            <div className={'switch__inner'}/>
                        </div>
                        }
                    </div>

                    <div className={'node__inputs'}>
                        {nodeInfo.inputs.map((id, index) =>
                            <div key={index} id={id} className={'node__point ' + (nodeInfo.hasIncomingConnectionsOnPort(id, connections) ? 'node__point--filled' : '')}
                                 onMouseUp={_ => this.props.connectLine(id)}
                                 onContextMenu={() => this.props.removeConnections(id)}
                            />
                        )}
                    </div>

                    <div className={'node__outputs'}>
                        {nodeInfo.outputs.map((id, index) =>
                            <div key={index} id={id} className={'node__point node__point--filled'}
                                 onMouseDown={() => this.props.startLine(id)}
                                 onContextMenu={() => this.props.removeConnections(id)}
                            />
                        )}
                    </div>
                </div>
            </Draggable>
        );
    }
}
