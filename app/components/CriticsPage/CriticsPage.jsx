import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getMovieCritics } from '../../resources/critics/critics.actions'
import './CriticsPage.scss'
import { getMovieReviews } from '../../resources/reviews/reviews.actions'

const CriticsPage = props => {
  /// Fetch review list
  useEffect(() => {
    props.getMovieCritics()
    props.getMovieReviews()
  }, [])

  /// Destructure state
  const { critics, reviews } = props

  /// Sort critics by name
  const sortedCritics = critics.sort((c1, c2) =>
    c1.display_name < c2.display_name ? -1 : 1
  )
  console.log('Sorted critics ', sortedCritics)

  /// Function to get total number of Reviews written by a critic
  const getCountReviewsWritten = critic => {
    return reviews.filter(
      review =>
        review.byline.toLowerCase() === critic.display_name.toLowerCase()
    ).length
  }
  /// Function to get total number of Critics Pick of a critic
  const getCountCriticsPick = critic => {
    return reviews.filter(
      review =>
        review.critics_pick &&
        review.byline.toLowerCase() === critic.display_name.toLowerCase()
    ).length
  }

  return (
    <div className="critic-container">
      <h1>Critics</h1>
      <ul className="critic-list">
        {sortedCritics.map((critic, index) => (
          <div key={index} className="critic-item">
            {critic.multimedia && critic.multimedia.resource && (
              <img
                src={critic.multimedia.resource.src}
                alt={critic.display_name}
                width={critic.multimedia.resource.width}
                height={critic.multimedia.resource.height}
              />
            )}
            <h2>{critic.display_name}</h2>
            <p>Reviews Written: {getCountReviewsWritten(critic)}</p>
            <p>Critic's Pick: {getCountCriticsPick(critic)}</p>
            {critic.bio ? (
              <p>
                {critic.bio.length > 200
                  ? critic.bio.substring(0, 200) + '...'
                  : critic.bio}
              </p>
            ) : (
              <p className="italic">No information about this critic.</p>
            )}
          </div>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    critics: state.resources.critics ? state.resources.critics.critics : [], // Access critics under resources
    reviews: state.resources.reviews ? state.resources.reviews.data : [],
  }
}

const mapDispatchToProps = dispatch => ({
  getMovieCritics: () => dispatch(getMovieCritics()),
  getMovieReviews: () => dispatch(getMovieReviews()),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CriticsPage)
