import React, {Component} from 'react';
import AboutItem from 'components/widgets/about-item/AboutItem';

class About extends Component {
    render() {
        return (
            <div>
                About page
                <AboutItem/>
                <AboutItem/>
            </div>
        )
    }
}

About.propTypes = {};

export default About;