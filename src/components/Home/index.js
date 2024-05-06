import {useState} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  const [showMessage, setShowMessage] = useState(false)

  const handleStartQuiz = () => {
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            alt="start quiz game"
            className="home-desktop-img"
          />
          <h1 className="home-heading">
            How Many Of These Questions Do You Actually Know?
          </h1>
          <p className="home-description">
            Test yourself with these easy quiz questions and answers
          </p>
          <Link to="/quiz">
            {' '}
            {/* Change this line to navigate to the correct route */}
            <button
              type="button"
              className="start-button"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>
          </Link>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
              alt="warning icon"
            />
            <p className="message">
              All the progress will be lost, if you reload during the quiz
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
