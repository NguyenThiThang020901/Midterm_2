import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { post } from "jquery";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Alert,
} 
from "reactstrap";
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            phone:'',
            password: "",
            err: null,
            message:null
        };
    }
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        });
    };
    login = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        axios.post("http://127.0.0.1:8000/api/login", form).then((reponse) => {
            console.log(reponse.data)
            if (reponse.data.success == 1) {
                cookie.save('user', reponse.data.user, { path: '/' })
               alert('Login success!');
            } else {
                this.setState({
                    err: reponse.data.errors,
                });
            }
        });
    };
    watchPassword=()=>{
        var y = document.getElementById("password");
        if (y.type === "password") {
          y.type='text';
        } else {
          y.type = "password";
        }
      }
    render() {
        return (
            <div id="logreg-forms">
                <form class="form-signin" onSubmit={this.login}>
                    <h1
                        class="h3 mb-3 font-weight-normal"
                        style={{ textAlign: "center" }}
                    >
                        Sign in
                    </h1>
                    {this.state.err!=null && <Alert color="warning">{this.state.err.login}</Alert>}
                    <div class="input-group">
                        <input
                            type="email"
                            name="email"
                            id="inputEmail"
                            class="form-control"
                            onChange={this.handleChange}
                            placeholder="Email address"
                            required=""
                        />
                    </div>
                    <br />
                    {this.state.err!=null && (
                        <span className ="text-danger">{this.state.err.email}</span>
                   
                    )}
                    <div class="input-group">
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            id="password"
                            class="form-control"
                            placeholder="Password"
                            required=""
                        />
                    </div>
                    {this.state.err != null && (
                        <span className ="text-danger">{this.state.err.password}</span>
                    )}
                    <br />
                    <input type="checkbox" onClick={this.watchPassword}/>Show Password
                    <br/>
                    <div class="input-group">
                        <button
                            class="btn btn-primary btn-block"
                            type="submit"
                        >
                            <i class="fas fa-sign-in-alt"></i> Sign in
                        </button>
                    </div>

                    <Link to='/forgot'>Forgot password</Link>
                    <hr />
                    <button
                        class="btn btn-block"
                    >
                        <Link to='/register'>Register</Link>
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;