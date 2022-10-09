import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <main>
      <div className='card'>
        <div>
          <h4 className='card-header'>Sign Up</h4>
          <div className='card-body'>
          <Grid container direction="column" alignItem="center" justify="center" item style={{ border: "0.2px solid gray" }}>
              <TextField
                variant="filled"
                style={{marginBottom: "1em" }}
                spacing={5}
                fullWidth
                placeholder='Username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                style={{marginBottom: "1em" }}
                spacing={5}
                fullWidth
                placeholder='Email address'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                style={{marginBottom: "1em" }}
                spacing={5}
                fullWidth
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <Button fullWidth InputProps={{ sx: { height: 80 } }} variant="contained" size="large" onSubmit={handleFormSubmit}>
                Register
              </Button>
            </Grid>
            {error && <div>Registration failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;