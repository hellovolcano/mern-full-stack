import React from 'react';
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_POEM } from '../utils/queries'
import RiffList from '../components/RiffList'
import RiffForm from '../components/RiffForm'
import Auth from '../utils/auth'
import Paper from '@mui/material/Paper'

const SolitaryPoem = props => {
  const { id: poemId } = useParams()
  
  const { loading, data } = useQuery(QUERY_POEM, {
    variables: {id: poemId}
  })

  const poem = data?.poem || {}

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Paper>
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {poem.username}
          </span>{' '}
          poem on {poem.createdAt}
        </p>
        <p className="card-body">{poem.poemText}</p>
        </Paper>
      {poem.riffCount > 0 && <RiffList riffs={poem.riffs} /> }
      {Auth.loggedIn() && <RiffForm poemId={poem._id} />}
    </div>
  );
};

export default SolitaryPoem;