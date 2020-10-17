import React, {Component} from 'react';
import Desktop from './components/Desktop';

export default class App extends Component {
    state = {
        desktopX: 0,
        desktopY: 0
    }

    mouseStartPos = null;

    mouseDown = (mouseX, mouseY, button) => {
        if(button !== 1) return;
        this.mouseStartPos = {x: mouseX, y: mouseY, desktopX: this.state.desktopX, desktopY: this.state.desktopY};
    }

    mouseMove = (mouseX, mouseY) => {
        if (this.mouseStartPos === null) return;

        const {x, y, desktopX, desktopY} = this.mouseStartPos;
        this.setState({desktopX: desktopX - (x - mouseX), desktopY: desktopY - (y - mouseY)});
    }

    mouseUp = () => {
        this.mouseStartPos = null;
    }

    render() {
        return (
            <div className={'app'}
                 onMouseDown={e => this.mouseDown(e.clientX, e.clientY, e.button)}
                 onMouseMove={e => this.mouseMove(e.clientX, e.clientY)}
                 onMouseUp={() => this.mouseUp()}
            >
                <Desktop position={{x: this.state.desktopX, y: this.state.desktopY}}/>
            </div>
        );
    }
}
