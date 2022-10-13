import React from 'react';
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_POEM } from '../utils/queries'
// import { DELETE_POEM } from '../utils/mutations'
import RiffList from '../components/RiffList'
import RiffForm from '../components/RiffForm'
import Auth from '../utils/auth'
import Paper from '@mui/material/Paper'
// import Button from '@mui/material/Button'
// import { Navigate } from 'react-router-dom'

const SolitaryPoem = props => {
  const { id: poemId } = useParams()
  
  const { loading, data } = useQuery(QUERY_POEM, {
    variables: {id: poemId}
  })

  // const [deletePoem, { error }] = useMutation(DELETE_POEM)

  const poem = data?.poem || {}

  if (loading) {
    return <div>Loading...</div>
  }

  // const handleEdit = async event => {
  //   event.preventDefault()

  //   console.log("I would like to edit this!")
  // }

  // const handleDelete = async event => {
  //   event.preventDefault();
  
  //   try {
  //     // add riff to database
  //     const checkDelete = await deletePoem({
  //       variables: { poemId: poem._id }
  //     });
  //     console.log(checkDelete)
  //     return <Navigate to="/" />

  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // const buttonStyle = {
  //   float: 'right',
  // }

  return (
    <div>
      <Paper>
        {/* <div style={buttonStyle}>
          {Auth.getProfile().data.username === poem.username && <>
          <Button onClick={handleEdit}>Edit</Button> <Button onClick={handleDelete}>DELETE</Button>
          </>}
        </div> */}
        
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