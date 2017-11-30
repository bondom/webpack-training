import React, {Component} from 'react';
import './AboutItem.scss';

class AboutItem extends Component {
    constructor(props){
        super(props);
        this.state = {className: "normal"};
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter() {
        this.setState({className: "unnormal"});
    }

    onMouseLeave() {
        this.setState({className: "normal"});
    }

    render() {
        return (
            <div
                className={this.state.className}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                    About item About item About item
            </div>
        )
    }
}

AboutItem.propTypes = {};

export default AboutItem;