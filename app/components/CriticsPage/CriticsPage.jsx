import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getMovieReviews } from '../../resources/reviews/reviews.actions'
import './CriticsPage.scss'

const criticsData = [
  {
    display_name: 'A. O. Scott',
    sort_name: 'A. O. Scott',
    status: 'full-time',
    bio:
      'A. O. Scott joined The New York Times as a film critic in January 2000, and was named a chief critic in 2004. Previously, Mr. Scott had been the lead Sunday book reviewer for Newsday and a frequent contributor to Slate, The New York Review of Books, and many other publications. \n<br/><br/>\nIn the 1990s he served on the editorial staffs of Lingua Franca and The New York Review of Books. He also edited "A Bolt from the Blue and Other Essays," a collection by Mary McCarthy, which was published by The New York Review of Books in 2002. \n<br/><br/>\nMr. Scott was a finalist for the Pulitzer Prize in Criticism in 2010, the same year he served as co-host (with Michael Phillips of the Chicago Tribune) on the last season of "At the Movies," the syndicated film-reviewing program started by Roger Ebert and Gene Siskel.\n<br/><br/>\nA frequent presence on radio and television, Mr. Scott is Distinguished Professor of Film Criticism at Wesleyan University and the author of Better Living Through Criticism, forthcoming in 2016 from The Penguin Press. A collection of his film writing will be published by Penguin in 2017. \n<br/><br/>\nHe lives in Brooklyn with his family.',
    seo_name: 'A-O-Scott',
    multimedia: {
      resource: {
        type: 'image',
        src:
          'http://static01.nyt.com/images/2015/10/07/topics/ao-scott/ao-scott-articleInline.jpg',
        height: 163,
        width: 220,
        credit: 'Earl Wilson/<br/>The New York Times',
      },
    },
  },
]

const CriticsPage = props => {
  /// Fetch review list
  useEffect(() => {
    props.getMovieReviews()
  }, [])

  /// Destructure state of reviews
  const { reviews } = props

  return (
    <div className='critic-container'>
      <h1>Critics</h1>
      <ul className="critic-list">
        {criticsData.map((critic, index) => (
          <div key={index} className="critic-item">
            {/* {critic.multimedia?.resource?.src && (
              <img
                src={critic.multimedia.resource.src}
                alt={critic.display_name}
              />
            )} */}
            <h2>{critic.display_name}</h2>
            <p>Reviews Written: {critic.reviews_written}</p>
            <p>Critic's Pick: {critic.critics_pick}</p>
            {critic.bio && (
              <p>
                {critic.bio.length > 200
                  ? critic.bio.substring(0, 200) + '...'
                  : critic.bio}
              </p>
            )}
          </div>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    reviews: state.resources.reviews ? state.resources.reviews.data : [], // Access reviews under resources
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
)(CriticsPage)
