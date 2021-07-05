// import React, { Component } from "react";
// import ReactDOM from 'react-dom';
// import PropTypes from "prop-types";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Register from './components/userComponent/dangki';
// import Login from './components/login';
// class Index extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <Router>
//                 <div>
//                     <Switch>
//                         <Route path="/">
//                             < Login/>
//                         </Route>
//                     </Switch>
//                 </div>
//             </Router>
//         );
//     }
// }

// export default Index;
// if (document.getElementById('app')) {
//     ReactDOM.render(<Index />, document.getElementById('app'));
// }
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/login';
import Register from "./components/register";
import Forgot from "./components/forgot";

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Login/>
                        </Route>
                        <Route path="/register">
                            <Register/>
                        </Route>
                        <Route path="/forgot">
                            <Forgot/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Index;
if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}