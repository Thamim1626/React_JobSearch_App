import {Link} from 'react-router-dom'
import {FaRegStar, FaEnvelope, FaMapMarker} from 'react-icons/fa'
import './index.css'

const ProductListItems = props => {
  const {eachItem, reRender, alt} = props
  const {
    companyLogo,
    employmentType,
    id,
    jobDesc,
    location,
    lpa,
    rating,
    title,
  } = eachItem
  const triggerRerender = () => {
    reRender(id)
  }
  return (
    <li className="job-item" onClick={triggerRerender}>
      <Link to={`/jobs/${id}`} className="nav-link">
        <div className="job-item-top">
          <img src={companyLogo} alt={alt} className="job-item-logo" />
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
      </Link>
    </li>
  )
}

export default ProductListItems
