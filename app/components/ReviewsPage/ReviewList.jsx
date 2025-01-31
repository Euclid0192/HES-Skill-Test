import React, { useEffect, useState } from 'react'
import './ReviewList.scss'
import { getMovieReviews } from '../../resources/reviews/reviews.actions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import ReviewItem from './ReviewItem'
import SelectedReview from './SelectedReview'

const ReviewList = props => {
  /// Fetch review list
  useEffect(() => {
    props.getMovieReviews()
  }, [])

  /// Destructure state of reviews
  const { reviews } = props

  /// Sort on publication date, most recent first
  const sortedReviews = reviews.sort(
    (r1, r2) => new Date(r2.publication_date) - new Date(r1.publication_date)
  )

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
  /// Filter by MPAA Rating, Publication Date, Critic's Pick
  const [mpaaFilter, setMpaaFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [criticsPickFilter, setCriticsPickFilter] = useState(false)

  /// Get review list after any search or filter
  const reviewsToDisplay = sortedReviews
    .filter(review =>
      review.display_title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(review => (mpaaFilter ? review.mpaa_rating === mpaaFilter : true))
    .filter(review =>
      dateFilter ? review.publication_date.startsWith(dateFilter) : true
    )
    .filter(review => (criticsPickFilter ? review.critics_pick === 1 : true))
    .slice(0, countDisplayed)

  /// State: number of reviews currently displayed (default 20, can raise to max 50)
  const [countDisplayed, setCountDisplayed] = useState(20)

  /// Display list default 20 reviews, max 50 reviews.
  /// Handle increase number of displayed reviews
  const handleLoadMore = () => {
    console.log(
      'Current length of reviews ',
      reviewsToDisplay.length,
      ' ',
      countDisplayed
    )
    if (countDisplayed < 50 && countDisplayed < reviewsToDisplay.length) {
      setCountDisplayed(prev => Math.min(prev + 10, 50))
    }
  }
  /// Persisting search and filter (done)

  return (
    <div className="reviews-container">
      <h1>Review List</h1>
      <div className="search-filter-control nav">
        {/* Search bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Find review by title..."
          className="search-input"
        />

        <select
          value={mpaaFilter}
          onChange={e => {
            setMpaaFilter(e.target.value)
            setCountDisplayed(20)
          }}>
          <option value="">All MPAA Ratings</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
          <option value="Not Rated">Not rated</option>
        </select>

        <input
          type="month"
          onChange={e => {
            setDateFilter(e.target.value)
            setCountDisplayed(20)
          }}
        />

        <label>
          <input
            type="checkbox"
            checked={criticsPickFilter}
            onChange={() => {
              setCriticsPickFilter(!criticsPickFilter)
              setCountDisplayed(20)
            }}
          />
          Critics Pick Only
        </label>
      </div>
      {/* no bullet point */}
      {reviewsToDisplay.length > 0 ? (
        <ul className="reviews-list">
          {reviewsToDisplay.map(review => (
            <li
              key={review.id}
              className="review-item"
              onClick={() => handleOpenReview(review)}>
              <ReviewItem review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No review found</p>
      )}

      {/* Selected review */}
      {selectedReview && (
        <SelectedReview
          selectedReview={selectedReview}
          handleCloseReview={handleCloseReview}
        />
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
