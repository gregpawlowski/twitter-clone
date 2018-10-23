import React, { Component } from 'react';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      profileImageUrl: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const authType = this.props.signUp ? 'signup' : 'signin';
    this.props.onAuth(authType, this.state)
      .then(() => this.props.history.push('/'))
      .catch(() => {return;});
  }

  render() {
    const { email, username, profileImageUrl } = this.state;
    const { heading, buttonText, signUp, errors, removeError, history } = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && (<div className="alert alert-danger">{errors.message}</div>)}
              <label htmlFor="email">Email: </label>
              <input type="text" name="email" id="email" className="form-control" onChange={this.handleChange} value={email}/>
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" id="password" className="form-control" onChange={this.handleChange} />
              { signUp && (
                <div>
                  <label htmlFor="username">Username: </label>
                  <input type="text" name="username" id="username" className="form-control" onChange={this.handleChange} value={username}/>
                  <label htmlFor="image-url">Profile Image: </label>
                  <input type="text" name="profileImageUrl" id="image-url" className="form-control" onChange={this.handleChange} value={profileImageUrl}/>
                </div>)
              }
              <button className="btn btn-primary btn-block btn-lg" type="submit">{buttonText}</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}