import React, {useState, useEffect} from 'react'
import Header from '../Header'
import CongratsPage from '../CongratsPage'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import FailureView from '../FailureView'
import './index.css'

const Quiz = () => {
  const [questionsData, setQuestionsData] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [chosenOption, setChosenOption] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [showCorrectOption, setShowCorrectOption] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [timerRunning, setTimerRunning] = useState(false)
  const [showCongrats, setShowCongrats] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [unansweredCount, setUnansweredCount] = useState(0) // New state for unanswered count
  const [fetchError, setFetchError] = useState(false) // State to track fetch error

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/assess/questions')
        if (!response.ok) {
          throw new Error('Failed to fetch questions')
        }
        const data = await response.json()
        setQuestionsData(data.questions)
        setLoading(false)
        startTimer()
      } catch (error) {
        setFetchError(true)
        setLoading(false)
        console.error(error)
      }
    }
    fetchQuestions()
  }, [])

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 0) {
            clearInterval(timer)
            handleNextQuestion()
            return 15
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timerRunning, currentQuestionIndex])

  const startTimer = () => {
    setTimeLeft(15)
    setTimerRunning(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questionsData.length - 1) {
      setShowCongrats(true)
      return
    }

    // Check if the current question is unanswered
    if (chosenOption === '') {
      setUnansweredCount(prevCount => prevCount + 1)
    }

    setCurrentQuestionIndex(prevIndex => prevIndex + 1)
    setChosenOption('')
    setIsCorrect(null)
    setShowCorrectOption(false)
    startTimer()
  }

  const checkAnswer = optionId => {
    const currentQuestion = questionsData[currentQuestionIndex]
    const correctOption = currentQuestion.options.find(
      option => option.is_correct === 'true',
    )
    if (correctOption.id === optionId) {
      setIsCorrect(true)
      setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1)
    } else {
      setIsCorrect(false)
      setShowCorrectOption(true)
    }
    setChosenOption(optionId)
    setTimerRunning(false)
  }

  const handleRadioChange = e => {
    setChosenOption(e.target.id)
  }

  const renderOptions = (options, optionsType) => {
    switch (optionsType) {
      case 'DEFAULT':
        return (
          <ul className="options">
            {options.map(option => (
              <li key={option.id}>
                <button
                  className={`
                  ${chosenOption === option.id && 'chosen'} 
                  ${
                    showCorrectOption &&
                    option.is_correct === 'true' &&
                    'correct'
                  }
                  ${
                    showCorrectOption &&
                    chosenOption === option.id &&
                    option.is_correct !== 'true' &&
                    'wrong'
                  }
                `}
                  onClick={() => checkAnswer(option.id)}
                >
                  {option.text}
                  {chosenOption === option.id && isCorrect && (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                      alt="correct checked circle"
                      className="result-icon"
                    />
                  )}
                  {showCorrectOption && option.is_correct === 'true' && (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                      alt="correct checked circle"
                      className="result-icon"
                    />
                  )}
                  {showCorrectOption &&
                    chosenOption === option.id &&
                    option.is_correct !== 'true' && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                        alt="incorrect close circle"
                      />
                    )}
                </button>
              </li>
            ))}
          </ul>
        )
      case 'IMAGE':
        return (
          <ul className="options">
            {options.map(option => (
              <li key={option.id}>
                <button
                  className={`
                ${chosenOption === option.id && 'chosen'} 
                ${
                  showCorrectOption && option.is_correct === 'true' && 'correct'
                }
                ${
                  showCorrectOption &&
                  chosenOption === option.id &&
                  option.is_correct !== 'true' &&
                  'wrong'
                }
              `}
                  onClick={() => checkAnswer(option.id)}
                >
                  <img
                    className="option-type-image"
                    src={option.image_url}
                    alt={option.text}
                  />
                  {chosenOption === option.id && isCorrect && (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                      alt="correct checked circle"
                      className="result-icon"
                    />
                  )}
                  {showCorrectOption && option.is_correct === 'true' && (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                      alt="correct checked circle"
                      className="result-icon"
                    />
                  )}
                  {showCorrectOption &&
                    chosenOption === option.id &&
                    option.is_correct !== 'true' && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                        alt="incorrect close circle"
                        className="result-icon"
                      />
                    )}
                </button>
              </li>
            ))}
          </ul>
        )

      case 'SINGLE_SELECT':
        return (
          <ul className="options">
            {options.map(option => (
              <li key={option.id}>
                <input
                  type="radio"
                  id={option.id}
                  name="single-select-option"
                  checked={chosenOption === option.id}
                  onChange={handleRadioChange}
                />
                <label
                  className={`
                  ${chosenOption === option.id && 'chosen'} 
                  ${
                    showCorrectOption &&
                    chosenOption === option.id &&
                    option.is_correct === 'true' &&
                    'correct'
                  }
                  ${
                    showCorrectOption &&
                    chosenOption === option.id &&
                    option.is_correct !== 'true' &&
                    'wrong'
                  }
                `}
                  htmlFor={option.id}
                >
                  {option.text}
                  {showCorrectOption && chosenOption === option.id && (
                    <>
                      {option.is_correct === 'true' ? (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                          alt="correct checked circle"
                          className="result-icon"
                        />
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                          alt="incorrect close circle"
                          className="result-icon"
                        />
                      )}
                    </>
                  )}
                </label>
              </li>
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="quiz-container">
        {loading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#263868" height={50} width={50} />
          </div>
        ) : fetchError ? (
          <FailureView />
        ) : showCongrats ? (
          <CongratsPage
            correctAnswers={correctAnswers}
            totalQuestions={questionsData.length}
            percentage={(correctAnswers / questionsData.length) * 100}
            unansweredCount={unansweredCount} // Pass unanswered count to CongratsPage
          />
        ) : (
          <>
            <div className="timer-and-index-container">
              <div className="index-container">
                <p>Question</p>
                <p className="current-total-question-index">
                  {currentQuestionIndex + 1}/{questionsData.length}
                </p>
              </div>
              <p className="time-container">{timeLeft}</p>
            </div>
            <div className="question">
              {questionsData.length > 0 && (
                <div className="question-container">
                  <p>{questionsData[currentQuestionIndex].question_text}</p>
                  <div>
                    {renderOptions(
                      questionsData[currentQuestionIndex].options,
                      questionsData[currentQuestionIndex].options_type,
                    )}
                  </div>
                </div>
              )}
            </div>
            {currentQuestionIndex === questionsData.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                disabled={chosenOption === ''}
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={chosenOption === ''}
              >
                Next Question
              </button>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Quiz
