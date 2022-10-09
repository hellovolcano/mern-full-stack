

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POEM } from '../../utils/mutations';
import { QUERY_POEM, QUERY_ME } from '../../utils/queries';

const poemForm = () => {
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
    
        // update peom array cache
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
          variables: { peomText }
        });
    
        // clear form value
        setText('');
        setCharacterCount(0);
      } catch (e) {
        console.error(e);
      }
    };
    

  return (
    <nav>
        <div>

        <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
        </p>

        <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
        
            <textarea
            placeholder="Here's a new poem..."
            value={peomText}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
            ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>

        </form>
        
        </div>
    </nav>
  );
};

export default PoemForm;