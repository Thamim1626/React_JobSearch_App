import './index.css'

const NotFound = props => {
  const {location, history} = props

  return (
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        className="not-found-image"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  )
}

export default NotFound
