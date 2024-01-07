import './index.css'

const NotFound = () => {
  console.log('notfound')
  return (
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        className="not-found-image"
      />
      <h1>Page Not Found</h1>
    </div>
  )
}

export default NotFound
