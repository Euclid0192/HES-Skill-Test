import React from 'react'

const SelectedReview = ({ selectedReview, handleCloseReview }) => {
  return (
    <div
      className={
        selectedReview
          ? 'review-details-overlay visible'
          : 'review-details-overlay'
      }>
      <div
        className={
          selectedReview ? 'review-details visible' : 'review-details'
        }>
        <button className="close-button" onClick={handleCloseReview}>
          ✖
        </button>
        <h2>{selectedReview.display_title}</h2>
        {selectedReview.multimedia && selectedReview.multimedia.src && (
          <div className="img-container">
            <img
              src={selectedReview.multimedia.src}
              alt={selectedReview.display_title}
              width={selectedReview.multimedia.width}
              height={selectedReview.multimedia.height}
            />
          </div>
        )}
        <h3>{selectedReview.headline}</h3>
        <p>{selectedReview.summary_short}</p>
        <p>
          <strong>By:</strong> {selectedReview.byline}
        </p>
        <p>
          <strong>MPAA Rating:</strong> {selectedReview.mpaa_rating || 'N/A'}
        </p>
        {selectedReview.critics_pick ? (
          <p className="critics-pick">Critic's Pick ⭐</p>
        ) : null}
        <p>
          <a
            href={selectedReview.link.url}
            target="_blank"
            rel="noopener noreferrer">
            {selectedReview.link.suggested_link_text || 'Read Full Review'}
          </a>
        </p>
      </div>
    </div>
  )
}

export default SelectedReview
