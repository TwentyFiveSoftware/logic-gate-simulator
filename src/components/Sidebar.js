import React, {Component} from 'react';
import {ReactSVG} from 'react-svg';
import NodeType from '../models/NodeType';

export default class Sidebar extends Component {
    render() {
        return (
            <div className={'sidebar'}>
                {Object.values(NodeType).map((type, index) =>
                    <div className={'sidebar-item'} key={index} onClick={() => this.props.addNewNode(type)}>
                        <div className={'sidebar-item__name'}>{type.name}</div>
                        <div className={'sidebar-item__svg'}><ReactSVG src={`assets/${type.svg}`}/></div>
                    </div>
                )}
            </div>
        );
    }
}
