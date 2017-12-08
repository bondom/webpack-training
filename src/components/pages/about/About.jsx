import React, {Component, Fragment} from 'react';
import AboutItem from 'components/widgets/about-item/AboutItem';
import ErrorBoundary from 'ErrorBoundary';

class About extends Component {
    render() {

        //instead of <Fragment> can be used <> but babel 7 is required
        return (
            <Fragment>
                <div>About page</div>
                <ErrorBoundary>
                    <AboutItem/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <AboutItem/>
                </ErrorBoundary>
            </Fragment>
        );
    }
}

About.propTypes = {};

export default About;