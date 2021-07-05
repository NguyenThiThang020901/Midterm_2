import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            err: null,
            open:false
        };
    }
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        });
    };
    reset = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("email", this.state.email);
        axios.post("http://127.0.0.1:8000/api/forgot", form).then((response) => {
            if(response.data.success==1){
                this.setState({
                    open:true
                })
            }
            else{
                this.setState({
                    err:response.data.errors
                })
            }
            
        });
    };
    render() {
        return (
            <div id="logreg-forms">
                <form onSubmit={this.reset}>
                    <h1
                        class="h3 mb-3 font-weight-normal"
                        style={{ textAlign: "center" }}
                    >
                        Reset password
                    </h1>
                    {this.state.err!=null && <Alert color="danger">{this.state.err.message}</Alert>}
                    <input
                        type="email"
                        name="email"
                        id="resetEmail"
                        onChange={this.handleChange}
                        class="form-control"
                        placeholder="Email address"
                    />
                    {this.state.err!=null && <Alert color="danger">{this.state.err.email}</Alert>}
                    <button class="btn btn-primary btn-block" type="submit">
                        Reset Password
                    </button>
                    <Link to='/'>Back</Link>
                </form>
                <Modal isOpen={this.state.open}>
                    <ModalHeader>Notification</ModalHeader>
                    <ModalBody>
                        We have sent the password to your email address!<br/>
                        Please check your email
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success">
                            <Link to='/'>Login</Link>
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Forgot;
