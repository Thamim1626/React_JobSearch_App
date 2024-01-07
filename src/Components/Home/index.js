import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-main">
        <Header />
        <div className="home-body">
          <div className="home-text-section">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-des">
              Millions of people are searching for jobs,Salary
              Information,Company Review .Find the jobs that Fit your Ability
              and potentials
            </p>
            <Link to="/jobs" className="nav-link">
              {' '}
              <button type="button" className="home-button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
