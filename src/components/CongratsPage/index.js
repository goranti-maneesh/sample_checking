import React, { useState } from 'react';
import Report from '../Report';
import './index.css';

const CongratsPage = ({
  correctAnswers,
  totalQuestions,
  unansweredCount,
  percentage,
}) => {
  const [showReport, setShowReport] = useState(false);

  const handleReportButtonClick = () => {
    setShowReport(true);
  }

  return (
    <div>
      {showReport ? (
        <Report
          correctAnswers={correctAnswers}
          incorrectAnswers={totalQuestions - correctAnswers}
          unattemptedQuestions={
            Array.isArray(unansweredCount) ? unansweredCount : []
          }
        />
      ) : (
        percentage >= 60 ? (
          <div className="wonclass">
            <h2>Congrats!</h2>
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
              alt="won"
            />
            <h1>{percentage}% Correctly Answered</h1>
            <p>Quiz completed successfully.</p>
            <p>
              You attempted {correctAnswers} out of {totalQuestions} questions as
              correct.
            </p>
            <button onClick={handleReportButtonClick}>Report</button>
          </div>
        ) : (
          <>
            <h2>You lose!</h2>
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
              alt="lose"
            />
            <h1>{percentage}% Correctly Answered</h1>
            <p>
              You attempted {correctAnswers} out of {totalQuestions} questions as
              correct.
            </p>
            <button onClick={handleReportButtonClick}>Report</button>
          </>
        )
      )}
    </div>
  );
}

export default CongratsPage;
