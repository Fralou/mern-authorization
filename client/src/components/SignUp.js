import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Panel} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SignUp extends Component {
    state = {
        email: {
            text: '',
            validation: false
        },
        password: {
            text: '',
            validation: false
        },
        verifyPassword: {
            text: '',
            validation: false
        },
        disableSignUpButton: false
    }

    handleInputChange = (e) => {
        const {id, value} = e.target;
        let validation;
        if (id === 'email') {
            validation = /\S+@\S+\.\S+/.test(value);
        }
        if (id === 'password') {
            validation = /^(?=.*\d)(?=.*[A-Z]).{8,20}$/.test(value);
        }
        if (id === 'verifyPassword') {
            validation = value === this.state.password.text
        }
        this.setState({[id]: {text: value, validation}})
    }

    signUp = () => {
        this.setState({disableSignUpButton: true});
        fetch('http://localhost:4000/v1/users/signup',
            {
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({
                    email: this.state.email.text,
                    password: this.state.password.text
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                this.setState({disableSignUpButton: false})
            })
            .catch(error => {
                console.log(error);
                this.setState({disableSignUpButton: false})
            })
    }

    render() {
        return (
            <Panel>
                <Link to={`/signin`} className="link btn btn-warning">SignIn</Link>
                <Panel.Body className="PanelBody">
                    <form>
                        <FormGroup
                            validationState={this.state.email.validation ? 'success' : 'error'}
                        >
                            <ControlLabel>EMAIL</ControlLabel>
                            <FormControl
                                id="email"
                                type="email"
                                value={this.state.email.text}
                                placeholder="john@doe.com"
                                onChange={this.handleInputChange}
                            />
                            {!this.state.email.validation && <HelpBlock>Please, check your input</HelpBlock>}
                        </FormGroup>
                        <FormGroup
                            validationState={this.state.password.validation ? 'success' : 'error'}
                        >
                            <ControlLabel>PASSWORD</ControlLabel>
                            <FormControl
                                id="password"
                                type="password"
                                value={this.state.password.text}
                                onChange={this.handleInputChange}
                            />
                            {!this.state.password.validation &&
                            <HelpBlock>
                                <ul>
                                    <li>Minimum length of 8 chars</li>
                                    <li>Maximum length of 20 chars</li>
                                    <li>Should include at least 1 capital letter</li>
                                    <li>Should include at least 1 number</li>
                                </ul>
                            </HelpBlock>
                            }
                        </FormGroup>
                        <FormGroup
                            validationState={this.state.verifyPassword.validation ? 'success' : 'error'}
                        >
                            <ControlLabel>VERIFY PASSWORD</ControlLabel>
                            <FormControl
                                id="verifyPassword"
                                type="password"
                                value={this.state.verifyPassword.text}
                                onChange={this.handleInputChange}
                            />
                            {!this.state.verifyPassword.validation &&
                            <HelpBlock>Doesn't match the previous one</HelpBlock>
                            }
                        </FormGroup>
                        <Button
                            bsStyle="primary"
                            block
                            disabled={
                                !this.state.email.validation ||
                                !this.state.password.validation ||
                                !this.state.verifyPassword.validation ||
                                this.state.disableSignUpButton}
                            onClick={this.signUp}
                        >
                            SIGN UP
                        </Button>
                    </form>
                </Panel.Body>
            </Panel>
        )
    }
}
export default SignUp