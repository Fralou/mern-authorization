import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Panel} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SignIn extends Component {
    state = {
        email: {
            text: '',
            validation: false
        },
        password: {
            text: '',
            validation: false
        },
        disableSignInButton: false
    }

    handleInputChange = (e) => {
        const {id, value} = e.target;
        let validation = !!value;
        this.setState({[id]: {text: value, validation}})
    }

    signIn = () => {
        this.setState({disableSignInButton: true});
        fetch('http://localhost:4000/v1/users/signin',
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
                console.log('Signed in successfully');
                localStorage.setItem('token', data.token);
                this.setState({disableSignInButton: false})
            })
            .catch(error => {
                console.log(error);
                this.setState({disableSignInButton: false})
            })
    }

    render() {
        return (
            <Panel>
                <Link to={`/signup`} className="link btn btn-warning">SignUp</Link>
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
                            {!this.state.email.validation && <HelpBlock>An email is required</HelpBlock>}
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
                            {!this.state.password.validation && <HelpBlock>A password is required</HelpBlock>}
                        </FormGroup>
                        <Button
                            bsStyle="primary"
                            block
                            disabled={
                                !this.state.email.validation ||
                                !this.state.password.validation ||
                                this.state.disableSignInButton}
                            onClick={this.signIn}
                        >
                            SIGN IN
                        </Button>
                    </form>
                </Panel.Body>
            </Panel>
        )
    }
}
export default SignIn