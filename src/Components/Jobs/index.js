import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosSearch} from 'react-icons/io'

import FilteringFunction from '../FilteringFunctions'
import Header from '../Header'
import ProductListItems from '../ProductListItems'
import SalaryRange from '../SalaryRange'

import './index.css'

const profileApiConstrist = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  result: 'no result',
}

class Jobs extends Component {
  state = {
    checkItem: [],
    salaryRange: 1000000,
    profile: profileApiConstrist.initial,
    profileDetail: {},
    searchInput: '',
    jobList: [],
    jobListStatus: profileApiConstrist.initial,
  }

  componentDidMount() {
    this.renderProfile()
    this.renderFetchJobDetails()
  }

  profileInitial = () => {
    const {profile} = this.state
    return (
      <div className="profile-card-loading" data-testid="loader">
        <Loader
          type="ThreeDots"
          data-testid="loader"
          height="50"
          width="50"
          color="pink"
        />
      </div>
    )
  }

  profileSuccess = () => {
    const {profileDetail} = this.state
    const {name, bio, profileImage} = profileDetail
    return (
      <div className="profile-card">
        <img src={profileImage} alt="profile" className="profile-card-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-role">{bio}</p>
      </div>
    )
  }

  profileFailure = () => {
    const {profile} = this.state
    return (
      <div className="profile-card-loading">
        <button className="profile-retry-button" onClick={this.renderProfile}>
          Retry
        </button>
      </div>
    )
  }

  renderFetchJobDetails = async () => {
    const {checkItem, salaryRange, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const checkQuery = checkItem.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${checkQuery}&minimum_package=${salaryRange}&search=${searchInput}`
    const option = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const data = await response.json()
    const jobArray = data.jobs
    const jobDetailCaseChange = jobArray.map(eachItem => ({
      companyLogo: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDesc: eachItem.job_description,
      location: eachItem.location,
      lpa: eachItem.package_per_annum,
      rating: eachItem.rating,
      title: eachItem.title,
      key: eachItem.id,
    }))
    this.setState({jobList: jobDetailCaseChange})

    if (response.ok) {
      if (jobDetailCaseChange.length !== 0) {
        this.setState({
          jobListStatus: profileApiConstrist.success,
        })
      } else {
        this.setState({
          jobListStatus: profileApiConstrist.result,
        })
      }
    } else {
      this.setState({jobListStatus: profileApiConstrist.failure})
    }
  }

  renderProfile = async () => {
    const url = ' https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const data = await response.json()
    const profileDetail = data.profile_details
    const caseChangeProfileDetails = {
      name: profileDetail.name,
      profileImage: profileDetail.profile_image_url,
      bio: profileDetail.short_bio,
    }
    this.setState({profileDetail: caseChangeProfileDetails})

    if (response.ok) {
      this.setState(
        {profile: profileApiConstrist.success},
        this.profileStatusSwitch,
      )
    } else {
      this.setState(
        {profile: profileApiConstrist.failure},
        this.profileStatusSwitch,
      )
    }
  }

  CheckItemAddFucnction = id => {
    const {checkItem} = this.state
    const filteredCheckItem = checkItem.filter(eachItem => eachItem === id)
    if (filteredCheckItem.length === 0) {
      this.setState({checkItem: [...checkItem, id]}, this.renderFetchJobDetails)
    } else {
      const removeFilteredCheckItem = checkItem.filter(
        eachItem => eachItem !== id,
      )
      this.setState(
        {checkItem: removeFilteredCheckItem},
        this.renderFetchJobDetails,
      )
    }
  }

  onChangeSalaryRange = id => {
    this.setState({salaryRange: id}, this.renderFetchJobDetails)
  }

  profileStatusSwitch = () => {
    const {profile} = this.state
    switch (profile) {
      case profileApiConstrist.initial:
        return this.profileInitial()
      case profileApiConstrist.success:
        return this.profileSuccess()

      default:
        return this.profileFailure()
    }
  }

  rendeFilterSection = () => {
    const {employmentTypesList, salaryRangesList} = this.props
    const {searchInput} = this.state
    return (
      <div className="job-left">
        <div className="search-section search-input-sm">
          <input
            type="search"
            value={searchInput}
            className="search-input"
            onChange={this.onChangeSearchInput}
            placeholder="Search"
            aria-label="Search"
            id="searchInput"
          />

          <IoIosSearch
            data-testid="searchButton"
            onClick={this.onChangeSearchInput}
            className="search-icon"
          />
        </div>

        {this.profileStatusSwitch()}
        <div className="job-type">
          <h1 className="type-heading">Type of Employment</h1>
          <ul className="job-type-list">
            {employmentTypesList.map(eachItem => (
              <FilteringFunction
                eachItem={eachItem}
                key={eachItem.employmentTypeId}
                CheckItemAddFucnction={this.CheckItemAddFucnction}
              />
            ))}
          </ul>
          <h1 className="type-heading">Salary Range</h1>
          <ul className="job-type-list">
            {salaryRangesList.map(eachItem => (
              <SalaryRange
                eachItem={eachItem}
                key={eachItem.SalaryRangeId}
                onChangeSalaryRange={this.onChangeSalaryRange}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.renderFetchJobDetails)
  }

  renderSuccessJob = () => {
    const {searchInput, jobList} = this.state
    return (
      <ul className="job-list-contanier">
        {jobList.map(eachItem => (
          <ProductListItems
            eachItem={eachItem}
            key={eachItem.id}
            alt="company logo"
          />
        ))}
      </ul>
    )
  }

  renderInitialJob = () => (
    <div className="loader-job" data-testid="loader">
      <Loader type="BallTriangle" />
    </div>
  )

  rendeNoJobResult = () => (
    <div className="loader-job">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="No Job"
        className="failure-image"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderFailureJob = () => (
    <div className="loader-job">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
    </div>
  )

  renderJobList = () => {
    const {jobListStatus} = this.state
    switch (jobListStatus) {
      case profileApiConstrist.initial:
        return this.renderInitialJob()

      case profileApiConstrist.success:
        return this.renderSuccessJob()
      case profileApiConstrist.result:
        return this.rendeNoJobResult()

      default:
        return this.renderFailureJob()
    }
  }

  rendeItemSection = () => {
    const {searchInput, jobList} = this.state
    return (
      <div className="job-right">
        <div className="search-section search-input-lg">
          <input
            type="search"
            value={searchInput}
            className="search-input"
            onChange={this.onChangeSearchInput}
            placeholder="Search"
          />
          <IoIosSearch
            onClick={this.onChangeSearchInput}
            className="search-icon"
          />
        </div>
        {this.renderJobList()}
      </div>
    )
  }

  render() {
    const {checkItem, salaryRange} = this.state

    return (
      <div className="jobs-main">
        <Header />
        <div className="job-body">
          {this.rendeFilterSection()}
          {this.rendeItemSection()}
        </div>
      </div>
    )
  }
}

export default Jobs
