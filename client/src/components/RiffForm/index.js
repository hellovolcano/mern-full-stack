import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';

function RiffForm({ poemId }) {
    const [riffBody, setBody] = useState('');
    const [addRiff, { error }] = useMutation(ADD_REACTION);

const handleChange = event => {
  if (event.target.value.length <= 280) {
    setBody(event.target.value);
  }
};

const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      // add thought to database
      await addRiff({
        variables: { riffBody, poemId }
      });
  
      // clear form value
      setBody('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Riff on this poem"
          value={riffBody}
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          Riff
          {error}
        </button>
      </form>
    </div>
  );
};

export default RiffForm