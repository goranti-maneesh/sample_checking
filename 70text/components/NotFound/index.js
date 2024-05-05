import {withRouter} from 'react-router-dom'
//import './index.css'

const NotFound = props => {
  const {history} = props
  const returnToHome = () => {
    history.push('/')
  }

  return (
    <div className="notfound-container">
      <div>
        <h1>Page Not Found</h1>
        <img
          src="https://res.cloudinary.com/dedvz7flb/image/upload/v1713592802/Group_7504_frptqx.png"
          alt="not found"
        />
        <p>We are sorry, the page you requested could not be found</p>
        <button type="button" onClick={returnToHome} className="retry-btn">
          Back To Home
        </button>
      </div>
    </div>
  )
}
export default withRouter(NotFound)
