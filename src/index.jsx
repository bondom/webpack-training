
// ES2015 imports work out of the box, so no babel is required, but babel is required to transform code to be supported in browsers
import React from 'react';
import ReactDOM from "react-dom";
import App from './App';
//import configA from './configA'; - if uncomment, this module will be eliminated in build mode(tree shaking)

// Installing react preset: npm install --save-dev babel-loader babel-core babel-preset-react webpack
// - for Babel v6 and babel-loader v7

//import "./index.html"; - if we use file loader for html files,  as another option CopyWebpackPlugin can be used

import 'assets/styles/global.scss';


if(process.env.NODE_ENV === 'development') {
    console.log('Development mode!!!');
} else if(process.env.NODE_ENV === 'production') {
    console.log('Production mode!!!');
} else {
    console.log('Strange mode:' + process.env.NODE_ENV);
}




ReactDOM.render(
    <App/>,
    document.getElementById("root")
);


if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        ReactDOM.render(
            <NextApp/>,
            document.getElementById("root")
        );
    });
}