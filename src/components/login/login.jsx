import React from 'react';
import { Link } from 'react-router-dom';

export class Login extends React.Component {
    render() {
        return(
            <div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" />
                    </div>
                    <div>
                        <button type="button">Login</button>
                    </div>
                </div>
                <div>
                    Not Registered Yet,
                    <Link to="/signup" className="blue-text ml-1"> SignUp here</Link>
                </div>
            </div>
        );
    }
}