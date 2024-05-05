import React from 'react'

const Report = ({correctAnswers, incorrectAnswers, unattemptedQuestions}) => {
  return (
    <div>
      <div>
        <img src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png" alt="correct answer icon"/>
        <p>{correctAnswers} Correct answers</p>
      </div>
      
      <p>{incorrectAnswers} Wrong answers</p>
      <p>{unattemptedQuestions} Unattempted</p>
      {unattemptedQuestions > 0 ? (
        <div>
          <h3>Unattempted Questions</h3>
          {unattemptedQuestions.map((question, index) => (
            <div key={index}>
              <p>{question.question_text}</p>
              <ul>
                {question.options.map(option => (
                  <li key={option.id}>{option.text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <h1>Attempted all the questions</h1>
      )}
    </div>
  )
}

export default Report
