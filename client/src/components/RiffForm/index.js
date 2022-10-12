import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RIFF } from '../../utils/mutations';

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const RiffForm = ({ poemId }) => {
    const [riffBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addRiff, { error }] = useMutation(ADD_RIFF);

const handleChange = event => {
  if (event.target.value.length <= 280) {
    setBody(event.target.value);
    setCharacterCount(event.target.value.length);
  }
};

const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      // add riff to database
      await addRiff({
        variables: { riffBody, poemId }
      });
  
      // clear form 
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
  Character Count: {characterCount}/280
  {error && <span className="ml-2">Something went wrong...</span>}
</p>
  <Box 
          component="form"
          className="flex-row justify-center justify-space-between-md align-stretch"
          onSubmit={handleFormSubmit}
  >
            <TextField
            multiline
            rows={4}
            placeholder="Leave a riff for this poem..."
            value={riffBody}
            sx={{
              width: 1,
              mb: 1
            }}
            variant="filled"
            className="form-input col-12 col-md-9"
            onChange={handleChange} />
            <Button 
            sx={{ 
              height: 80
             }}
            variant="contained" 
            size="large"
            type="submit">Submit</Button>
          </Box>
    </div>
   );
};

export default RiffForm;

