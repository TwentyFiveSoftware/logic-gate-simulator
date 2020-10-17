import React, {Component} from 'react';
import Draggable from 'react-draggable';

export default class Node extends Component {
    toggleSwitch = () => {
        this.props.nodeInfo.switchEnabled = !this.props.nodeInfo.switchEnabled;
        this.props.simulate();
        this.setState({});
    }

    render() {
        const {nodeInfo, connections} = this.props;

        return (
            <Draggable handle={'.node__container'}>
                <div className={'node'}>
                    <div className={'node__container ' + (nodeInfo.calculateState(connections) ? 'node__container--active' : '')}>
                        {nodeInfo.name}

                        {nodeInfo.hasSwitch &&
                        <div className={'switch ' + (nodeInfo.switchEnabled ? 'switch--active' : '')} onClick={() => this.toggleSwitch()}>
                            <div className={'switch__inner'}/>
                        </div>
                        }
                    </div>

                    <div className={'node__inputs'}>
                        {nodeInfo.inputs.map((id, index) =>
                            <div key={index} id={id} className={'node__point ' + (nodeInfo.hasIncomingConnectionsOnPort(id, connections) ? 'node__point--filled' : '')}
                                 onMouseUp={_ => this.props.connectLine(id)}
                            />
                        )}
                    </div>

                    <div className={'node__outputs'}>
                        {nodeInfo.outputs.map((id, index) =>
                            <div key={index} id={id} className={'node__point node__point--filled'}
                                 onMouseDown={() => this.props.startLine(id)}
                            />
                        )}
                    </div>
                </div>
            </Draggable>
        );
    }
}
