import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import {FaRegStar, FaEnvelope, FaMapMarker} from 'react-icons/fa'

import Cookies from 'js-cookie'
import ProductListItems from '../ProductListItems'
import Header from '../Header'
import '../Jobs/index.css'

const apiConstrists = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiConstrists.initial,
    similarDetails: [],
    jobDetails: {
      skills: [],
      lifeAtCompany: {},
    },
  }

  componentDidMount() {
    this.fetchJobItemUrl()
  }

  renderPrevItem = () => {
    const {jobDetails} = this.state
    const {
      companyLogo,
      companyWebUrl,
      lifeAtCompany,
      employmentType,
      id,
      jobDesc,
      location,
      lpa,
      rating,
      title,
      skills,
    } = jobDetails
    const {description, companyImage} = lifeAtCompany
    return (
      <li className="job-prev-detail">
        <div className="job-item">
          <div className="job-item-top">
            <img
              src={companyLogo}
              alt="job details company logo"
              className="job-item-logo"
            />
            <div className="job-item-top-right">
              <h1 className="job-title">{title}</h1>
              <div className="job-item-rating">
                <FaRegStar className="rating-star" />
                <p className="rating-des">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-section">
            <div className="flex">
              <div className="flex ">
                <FaMapMarker />
                <p className="margin-right">{location}</p>
              </div>
              <div className="flex">
                <FaEnvelope />
                <p className="margin-right">{employmentType}</p>
              </div>
            </div>
            <div className="flex">
              <p className="lpa">{lpa}</p>
            </div>
          </div>

          <h3 className="job-des-heading">Description</h3>
          <p className="job-des">{jobDesc}</p>
          <h1 className="job-des-heading">Skills</h1>
          <div className="skill-section">
            {skills.map(eachItem => (
              <div className="skill-card">
                <img
                  src={eachItem.imageUrl}
                  className="skill-icon"
                  alt={eachItem.name}
                />

                <p className="skill-name">{eachItem.name}</p>
              </div>
            ))}
          </div>
          <h3 className="job-des-heading">Life At Company</h3>
          <div className="life-company-card">
            <p className="about-company">{description} </p>
            <img
              src={companyImage}
              className="image-company"
              alt="life at company"
            />
          </div>
        </div>
      </li>
    )
  }

  renderSimilarItem = () => {
    const {similarDetails} = this.state
    const {
      companyLogo,
      title,
      rating,
      employmentType,
      lpa,
      jobDesc,
      location,
    } = similarDetails
    return (
      <li>
        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="job-list-contaniers">
          {similarDetails.map(eachItem => (
            <ProductListItems
              eachItem={eachItem}
              key={eachItem.id}
              alt="similar job company logo"
              reRender={this.fetchJobItemUrl}
            />
          ))}
        </ul>
      </li>
    )
  }

  fetchJobItemUrl = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiConstrists.initial})
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const option = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const data = await response.json()
    const levelOneCaseChange = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }
    const {jobDetails, similarJobs} = levelOneCaseChange
    const jobItemLists = {
      companyLogo: jobDetails.company_logo_url,
      companyWebUrl: jobDetails.company_website_url,
      lifeAtCompany: jobDetails.life_at_company,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDesc: jobDetails.job_description,
      location: jobDetails.location,
      lpa: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
      key: jobDetails.id,
      skills: jobDetails.skills,
    }

    const {skills, lifeAtCompany} = jobItemLists
    const caseChangeSkills = skills.map(eachItem => ({
      name: eachItem.name,
      imageUrl: eachItem.image_url,
    }))

    const caseChangeLifeAtCompany = {
      description: lifeAtCompany.description,
      companyImage: lifeAtCompany.image_url,
    }

    const alljobItemLists = {
      ...jobItemLists,
      lifeAtCompany: caseChangeLifeAtCompany,
      skills: caseChangeSkills,
    }
    const similarItemList = similarJobs.map(eachItem => ({
      companyLogo: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDesc: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    console.log(similarItemList)
    this.setState({jobDetails: alljobItemLists}, this.renderPrevItem)
    this.setState({similarDetails: similarItemList}, this.renderSimilarItem)

    if (response.ok) {
      this.setState({apiStatus: apiConstrists.success})
    } else {
      this.setState({apiStatus: apiConstrists.failure})
    }
  }

  renderInitial = () => (
    <div className="job-item-detail-inital">
      <Loader type="Grid" data-testid="loader" color="pink" height="100px" />
    </div>
  )

  renderSuccess = () => (
    <div>
      <Header />
      <ul className="job-item-detail">
        {this.renderPrevItem()}

        {this.renderSimilarItem()}
      </ul>
    </div>
  )

  renderFailure = () => (
    <div className="failure-veiw">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-veiew-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.fetchJobItemUrl}>
        Retry
      </button>
    </div>
  )

  renderSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstrists.initial:
        return this.renderInitial()

      case apiConstrists.success:
        return this.renderSuccess()

      default:
        return this.renderFailure()
    }
  }

  render() {
    return this.renderSwitchCase()
  }
}

export default JobItemDetails
