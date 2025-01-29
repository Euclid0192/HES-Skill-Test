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

  // if (loading) return <p>Loading reviews...</p>
  // if (error) return <p>Error: {error}</p>

  /// Sort on publication date, most recent first
  const sortedReviews = reviews.sort(
    (r1, r2) => new Date(r2.publication_date) - new Date(r1.publication_date)
  ).slice(0, 20)
  /// State: number of reviews currently displayed (default 20, can raise to max 50)
  const [countDisplayed, setCountDisplayed] = useState(20)

  /// Display list

  /// Search by title

  /// Filter by MPAA Rating, Publication Date, Critic's Pick

  /// Persisting search and filter

  return (
    <div className='reviews-container'>
      <h1>Review List</h1>
      {/* no bullet point */}
      <ul className='reviews-list'> 
        {sortedReviews.map(review => (
          <li key={review.id}>
            {/* Display the image */}
            {review.multimedia && review.multimedia.src && (
              <img
                src={review.multimedia.src}
                alt={review.display_title}
                width={review.multimedia.width}
                height={review.multimedia.height}
              />
            )}

            {/* Display the title */}
            <h3>{review.headline}</h3>

            {/* Display publication date */}
            <p>
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
