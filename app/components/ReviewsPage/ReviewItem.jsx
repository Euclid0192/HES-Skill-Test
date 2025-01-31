import React from 'react'

const ReviewItem = ({ review }) => {
  return (
    <>
      {/* Display the image */}
      {review.multimedia && review.multimedia.src && (
        <div className="img-container">
          <img
            src={review.multimedia.src}
            alt={review.display_title}
            width={review.multimedia.width}
            height={review.multimedia.height}
          />
        </div>
      )}

      {/* Display the title */}
      <h3>{review.headline}</h3>

      {/* Display publication date */}
      <p className="publication-date">
        <strong>Published on:</strong>{' '}
        {new Date(review.publication_date).toLocaleDateString()}
      </p>

      {/* Display MPAA Rating */}
      <p>
        <strong>MPAA Rating:</strong> {review.mpaa_rating || 'N/A'}
      </p>

      {/* Display Critics Pick */}
      <p>
        <strong>Critics Pick:</strong>{' '}
        {review.critics_pick === 1 ? 'Yes' : 'No'}
      </p>

      {/* Link to the full review */}
      <p>
        <a href={review.link.url} target="_blank" rel="noopener noreferrer">
          {review.link.suggested_link_text || 'Read Full Review'}
        </a>
      </p>
    </>
  )
}

export default ReviewItem
