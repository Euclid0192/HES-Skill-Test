import React, { useEffect, useState } from 'react'
import './ReviewList.scss'
import { getMovieReviews } from '../../resources/reviews/reviews.actions'
import { compose } from 'redux'
import { connect } from 'react-redux'

const ReviewList = props => {
  /// Fetch review list
  useEffect(() => {
    props.getMovieReviews()
  }, [])

  /// Destructure state of reviews
  const { reviews, loading, error } = props
  //   console.log('All reviews ', reviews.slice(0, 20))

  //   if (loading) return <p>Loading reviews...</p>
  //   if (error) return <p>Error: {error}</p>

  /// Sort on publication date, most recent first
  const sortedReviews = reviews.sort(
    (r1, r2) => new Date(r2.publication_date) - new Date(r1.publication_date)
  )
  /// State: number of reviews currently displayed (default 20, can raise to max 50)
  const [countDisplayed, setCountDisplayed] = useState(20)

  /// Display list default 20 reviews, max 50 reviews.
  /// Handle increase number of displayed reviews
  const handleLoadMore = () => {
    if (countDisplayed < 50) {
      setCountDisplayed(prev => Math.min(prev + 10, 50))
    }
  }

  /// Open a review
  const [selectedReview, setSelectedReview] = useState(null)

  const handleOpenReview = review => {
    setSelectedReview(review)
  }

  const handleCloseReview = () => {
    setSelectedReview(null)
  }

  /// Search by title
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearchQueryChange = e => {
    setSearchQuery(e.target.value)
  }

  const reviewsToDisplay = sortedReviews
    .slice(0, Math.min(countDisplayed, sortedReviews.length))
    .filter(review =>
      review.display_title.toLowerCase().includes(searchQuery.toLowerCase())
    )

  /// Filter by MPAA Rating, Publication Date, Critic's Pick

  /// Persisting search and filter

  return (
    <div className="reviews-container">
      <h1>Review List</h1>
      <div className="control nav">
        {/* Search bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Find review by title..."
          className="search-input"
        />
        {/* Font Awesome Search Icon */}
        <button className="search-icon">
          <i className="fa fa-search" />
        </button>
      </div>
      {/* no bullet point */}
      {reviewsToDisplay.length > 0 ? (
        <ul className="reviews-list">
          {reviewsToDisplay.map(review => (
            <li
              key={review.id}
              className="review-item"
              onClick={() => handleOpenReview(review)}>
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
                <a
                  href={review.link.url}
                  target="_blank"
                  rel="noopener noreferrer">
                  {review.link.suggested_link_text || 'Read Full Review'}
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No review found</p>
      )}

      {/* Selected review */}
      {selectedReview && (
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
              <strong>MPAA Rating:</strong>{' '}
              {selectedReview.mpaa_rating || 'N/A'}
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
      )}

      {/* Button to load more reviews */}
      {countDisplayed < 50 ? (
        <button onClick={handleLoadMore} className="button load-more-button">
          Load more reviews
        </button>
      ) : (
        <p className="button max-load-button">
          Maximum number of reviews displayed. Cannot load more!
        </p>
      )}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    reviews: state.resources.reviews ? state.resources.reviews.data : [], // Access reviews under resources
    loading: state.resources.reviews ? state.resources.reviews.loading : false,
    error: state.resources.reviews ? state.resources.reviews.error : null,
  }
}

const mapDispatchToProps = dispatch => ({
  getMovieReviews: () => dispatch(getMovieReviews()),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ReviewList)
