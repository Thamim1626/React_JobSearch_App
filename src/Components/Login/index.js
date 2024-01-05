import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onChangeLoginUserInput = event => {
    this.setState({username: event.target.value})
  }

  onChangeLoginPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const {history} = this.props
    console.log(history)
    const data = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)

    const datas = await response.json()

    if (datas.error_msg !== undefined) {
      this.setState({isError: true, errorMsg: datas.error_msg})
    }
    if (response.ok) {
      Cookies.set('jwt_token', datas.jwt_token)
      history.replace('/')
    }
  }

  render() {
    const {errorMsg, isError, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />
          <form className="login-form" onSubmit={this.onSubmitLoginForm}>
            <label htmlFor="username" className="login-label">
              USERNAME
            </label>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={this.onChangeLoginUserInput}
            />
            <label htmlFor="password" className="login-label">
              PASSWORD
            </label>
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={this.onChangeLoginPasswordInput}
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {isError && <p className="error-msg">* {errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
