import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POEM } from '../../utils/mutations';
import { QUERY_POEMS, QUERY_ME } from '../../utils/queries';

const PoemForm = () => {
    const [poemText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    
    const [addPoem, { error }] = useMutation(ADD_POEM, {
      update(cache, { data: { addPoem } }) {
          // may not exist yet, so wrap in a try/catch
        try {
          // update me array cache
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, poems: [...me.poems, addPoem] } },
          });
        } catch (e) {
          console.warn("First poem by this poet!")
        }
    
        // update poem array cache
        const { poems } = cache.readQuery({ query: QUERY_POEMS });
        cache.writeQuery({
          query: QUERY_POEMS,
          data: { poems: [addPoem, ...poems] },
        });
      }
    });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
      event.preventDefault();
    
      try {
        // add a poem to database
        await addPoem({
          variables: { poemText }
        });
    
        // clear form value
        setText('');
        setCharacterCount(0);
      } catch (e) {
        console.error(e);
      }
    };
    

  return (
    <>
        <div>
          <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
          Character Count: {characterCount}/280 {  }
          {error && <span className="ml-2">Something went wrong...</span>}
          </p>
          <Box 
          component="form"
          onSubmit={handleFormSubmit}
>
            <TextField
            multiline
            rows={4}
            placeholder="Here's a new poem..."
            value={poemText}
            fullWidth
            sx={{
              mb: 1
            }}
            variant="filled"
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
    </>
  );
};

export default PoemForm;