import React from "react";
import {Switch, Route, Link, BrowserRouter} from "react-router-dom";
import About from "components/pages/about/About";
import Description from "Description.jsx";

class App extends React.Component {

    render () {

        return (

            <BrowserRouter>
                <div className="content">
                    <h1>Hello world Uasia</h1>
                    <img src={require("assets/img/ford.png")}/>
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

export default App;