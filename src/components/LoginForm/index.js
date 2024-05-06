import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    showPassword: false, // New state to track whether to show the password
    errorMsg: '',
    iserrorshow: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  // onSubmitSuccess = jwtToken => {}

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30})

      history.replace('/')

      // this.onSubmitSuccess(data.jwt_token)
      this.setState({iserrorshow: false})
    } else {
      // const jsondata = await response.json()
      // console.log(data)
      const erroormsg = data.error_msg
      this.setState({errorMsg: erroormsg, iserrorshow: true})
    }
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type={showPassword ? 'text' : 'password'} // Show password if the showPassword state is true
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, iserrorshow, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dedvz7flb/image/upload/v1713332178/Frame_8787_o8mjbv.png"
            alt="login website logo"
          />
          <h1 className="nxt-quiz">NXT Quiz</h1>
        </div>
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="checkBox-container">
            <input
              type="checkbox"
              id="showPassword"
              onChange={this.toggleShowPassword} // Toggle showPassword state when the checkbox is clicked
            />
            <label htmlFor="showPassword" className="showPassword">
              Show password
            </label>
          </div>
          <br />
          <button type="submit" className="login-button">
            Login
          </button>
          {iserrorshow ? <p className="error-message">{errorMsg}</p> : <p />}
        </form>
      </div>
    )
  }
}

export default LoginForm
