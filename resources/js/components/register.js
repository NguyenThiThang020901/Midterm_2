import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { post } from "jquery";
import history from "../history";
import { Link } from "react-router-dom";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Alert,
} from "reactstrap";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            fullname:"",
            address:'',
            phone:'',
            password: "",
            confirm_password: "",
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
    watchPassword=()=>{
        var x = document.getElementById("confirm");
        var y = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
          y.type='text';
        } else {
          x.type = "password";
          y.type = "password";
        }
      }
    register = (e) => {
        e.preventDefault();
        if (this.state.password != this.state.confirm_password) {
            let error={
                confirm:"Password does not match!"
            }
            this.setState({
                err: error
            });
        } else {
            this.setState({
                err: null,
            });
            let form = new FormData();
            form.append("email", this.state.email);
            form.append("fullname", this.state.fullname);
            form.append("phone", this.state.phone);
            form.append("password", this.state.password);
            form.append("address", this.state.address);
            axios.post("http://127.0.0.1:8000/api/register", form)
                .then((reponse) => {
                    if (reponse.data.success == 1) {
                        alert('Register success!');
                        history.push('/');
                        window.location.reload();
                    }
                    this.setState({
                        err:reponse.data.errors
                    });
                });
        }
    };
    render() {
        return (
            <div id="logreg-forms">
                <form onSubmit={this.register}>
                <h1
                        class="h3 mb-3 font-weight-normal"
                        style={{ textAlign: "center" }}
                    >
                        register
                    </h1>
                    {this.state.err!=null && <Alert color="danger">{this.state.err.register}</Alert>}
                    <div class="input-group">
                        <input
                            type="email"
                            name="email"
                            id="inputEmail"
                            class="form-control"
                            onChange={this.handleChange}
                            placeholder="Email address"
                        />
                    </div>
                    <br />
                    {this.state.err != null && (
                        <span  className ="text-danger">{this.state.err.email}</span>
                    )}
                    <div class="input-group">
                        <input
                            type="text"
                            name="fullname"
                            class="form-control"
                            onChange={this.handleChange}
                            placeholder="Full name"
                        />
                    </div>
                    <br />
                    {this.state.err != null && (
                        <span  className ="text-danger">{this.state.err.fullname}</span>
                    )}
                    <div class="input-group">
                        <input
                            type="text"
                            name="address"
                            class="form-control"
                            onChange={this.handleChange}
                            placeholder="Address"
                        />
                    </div>
                    <br />
                    {this.state.err != null && (
                        <span  className ="text-danger">{this.state.err.address}</span>
                    )}
                    <div class="input-group">
                        <input
                            type="phone"
                            name="phone"
                            class="form-control"
                            onChange={this.handleChange}
                            placeholder="Phone"
                        />
                    </div>
                    <br />
                    {this.state.err != null && (
                        <span  className ="text-danger">{this.state.err.phone}</span>
                    )}
                    <div class="input-group">
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            id="password"
                            class="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <br />
                    {this.state.err != null && (
                        <span  className ="text-danger">{this.state.err.password}</span>
                    )}
                    <input
                        type="password"
                        id='confirm'
                        name="confirm_password"
                        onChange={this.handleChange}
                        class="form-control"
                        placeholder="Confirm Password"
                    />
                    <br />
                    {this.state.err != null && (
                        <span  className ="text-danger">{this.state.err.confirm}</span>
                    )}
                    <br />
                    <input type="checkbox" onClick={this.watchPassword}/>Show Password

                    <div class="input-group">
                        <button
                            class="btn btn-md btn-block submit"
                            type="submit"
                        >
                            <i class="fas fa-user-plus"></i> submit
                        </button>
                    </div>
                        <Link to='/'>Back</Link>
                </form>
            </div>
        );
    }
}

export default Register;