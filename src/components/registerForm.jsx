import React from 'react';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
    state = {
        data: {
            email: '',
            password: '',
            name: ''
        },
        errors: {}
    };

    schema = {
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    };

    doSubmit = async () => {
        // Call the server
        try {
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.email = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        if (auth.getCurrentUser()) return <Redirect to="/" />;

        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('email', 'Email', 'email')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderInput('name', 'Name')}
                {this.renderButton('Register')}
            </form>
        );
    }
}

export default RegisterForm;