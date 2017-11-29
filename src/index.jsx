
// ES2015 imports work out of the box, so no babel is required, but babel is required to transform code to be supported in browsers
import React from "react";
import ReactDOM from "react-dom";
import {Switch, Route, Link, BrowserRouter} from "react-router-dom";
import About from "./About";
import Description from "./Description.jsx";

//import configA from './configA'; - if uncomment, this module will be eliminated in build mode(tree shaking)

// Installing react preset: npm install --save-dev babel-loader babel-core babel-preset-react webpack
// - for Babel v6 and babel-loader v7

//import "./index.html"; - if we use file loder for html files,  as another option CopyWebpackPlugin can be used

if(process.env.NODE_ENV !== 'production') {
    console.log('Development mode!!!');
}
class App extends React.Component {

    render () {

        return (

            <BrowserRouter>
                <div>
                    <h1>Hello world Uasia</h1>
                    <img src={require("./assets/img/ford.png")}/>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/description">Description</Link>
                    <Switch>
                        <Route exact path="/" render={() => <div>Home Page</div>}/>
                        <Route path="/about" component={About}/>
                        <Route path="/description" component={Description}/>
                        <Route path="/*" render={() => <div>404 Error</div>}/>
                    </Switch>
                </div>
            </BrowserRouter>

        )

    }

}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);