import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export class Login extends React.Component {
    constructor() {
        super();
        this.form = {
            email: '',
            password: ''
        };
        this.state = {
            form: {...this.form},
            message: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let { form } = this.state;
        form = { ...form };
        form[e.target.name] = e.target.value;
        this.setState({ form });
    }

    async onSubmit(e) {
        e.preventDefault();
        const { form } = this.state;
        const { history } = this.props;
        try {
            const result = await axios.post(`http://localhost:3001/api/login`, form);
            history.push('/dashboard');
        } catch (err) {
            const { response: { data } } = err;
            this.setState({ message: data.message });
        }
    }

    renderErrorMessage() {
        const { message } = this.state;
        return (
            <div>
                {message}
            </div>
        );
    }

    render() {
        const { form: { email, password } } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={this.onChange} placeholder="email" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={this.onChange} placeholder="password"/>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
                {this.renderErrorMessage()}
                <div>
                    Not Registered Yet,
                    <Link to="/signup" className="blue-text ml-1"> SignUp here!</Link>
                </div>
            </div>
        );
    }
}