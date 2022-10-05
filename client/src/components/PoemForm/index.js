import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POEM } from '../../utils/mutations';
import { QUERY_POEMS, QUERY_ME } from '../../utils/queries';

const PoemForm = () => {
    const [poemText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addPoem, { error }] = useMutation(ADD_POEM, {
        update(cache, {data: {addPoem}}) {

            try{
                // update my array's cache
                const {me} = cache.readQuery({ query: QUERY_ME})
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: {...me, poems: [...me.poems, addPoem]}}
                })
            } catch (e) {
                console.warn("First poem insertion by user!")
            }
            // read what's currently in the cache
            const { poems } = cache.readQuery({ query: QUERY_POEMS })

            //prepend the newest poem to the front of the array
            cache.writeQuery({
                query: QUERY_POEMS,
                data: { poems: [addPoem, ...poems]}
            })
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
            // add poem to database
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
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
  Character Count: {characterCount}/280
  {error && <span className="ml-2">Something went wrong...</span>}
</p>
<form
  className="flex-row justify-center justify-space-between-md align-stretch"
  onSubmit={handleFormSubmit}
>
        <textarea
            placeholder="Here's a new poem..."
            value={poemText}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PoemForm;