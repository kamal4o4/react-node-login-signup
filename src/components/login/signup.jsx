import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

export class Signup extends React.Component {
    constructor() {
        super();
        this.form = {
            name: '',
            email: '',
            password: ''
        };
        this.state = {
            form: {...this.form},
            message: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        let {form} = this.state;
        form = {...form};
        form[e.target.name] = e.target.value;
        this.setState({form});
    }

    async onSubmit(e) {
        e.preventDefault();
        const {form} = this.state;
        try {
            const result = await axios.post(`http://localhost:3001/api/user`, form);
            this.setState({ message: result.data });
        } catch (err) {
            const {response: {data}} = err;
            console.log('error', data);
        }
    }

    renderMessage() {
        const { message } = this.state;
        return (
            <div>
                {message}
            </div>
        );
    }

    render() {
        const {form: {name, email, password}} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={name} onChange={this.onChange} placeholder="name"
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={this.onChange} placeholder="email"
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={this.onChange}
                                   placeholder="password" required/>
                        </div>
                        <div>
                            <button type="submit">SignUp</button>
                        </div>
                    </div>
                </form>
                {this.renderMessage()}
                <div>
                    Already Registered,
                    <Link to="/" className="blue-text ml-1"> Login here!</Link>
                </div>
            </div>
        );
    }
}