// FailureView.js
import React from 'react'

const FailureView = ({onRetry}) => {
  return (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
      <p>Our servers are busy please try again</p>

      <button onClick={onRetry}>Retry</button>
    </div>
  )
}

export default FailureView
