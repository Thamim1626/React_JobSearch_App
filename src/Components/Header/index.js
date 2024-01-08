import {Component} from 'react'

import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {AiFillHome, AiFillAlert} from 'react-icons/ai'
import {IoLogOutOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <div className="header-main">
      <Link to="/">
        {' '}
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="header-mid">
        <li className="header-mid-item text-header">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="header-mid-item text-header">
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </ul>
      <ul className="header-end-sm">
        <li className="header-mid-item">
          <Link to="/" className="nav-link">
            <AiFillHome
              style={{height: '30px', width: '30px', color: 'white'}}
              className="header-sm-icons"
            />
          </Link>
        </li>
        <li className="header-mid-item">
          <Link to="/jobs" className="nav-link">
            <AiFillAlert
              style={{height: '30px', width: '30px', color: 'white'}}
              className="header-sm-icons"
            />
          </Link>
        </li>

        <IoLogOutOutline
          style={{height: '40px', width: '40px', color: 'white'}}
          className="header-sm-icons"
          onClick={onClickLogout}
        />
      </ul>
      <button
        type="button"
        className="header-logout-button"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
