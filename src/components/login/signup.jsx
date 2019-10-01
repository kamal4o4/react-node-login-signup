import React from 'react';

export class Signup extends React.Component {
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
                        <button type="button">Signup</button>
                    </div>
                </div>
            </div>
        );
    }
}