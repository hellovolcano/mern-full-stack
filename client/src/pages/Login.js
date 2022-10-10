import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'


const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      const { data } = await login({
        variables: { ...formState }
      });
      
    Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <div className='card'>
        <div>
          <h3 className='card-header'>Login</h3>
          <div className='card-body'>
            <Grid container direction="column" justify="center" style={{ border: "0.2px solid gray" }} component="form" onSubmit={handleFormSubmit}>
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
                fullWidth
                spacing={5}
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <Button
              fullWidth 
              sx={{ height: 80 }}
              variant="contained" 
              size="large" 
              type="submit">
                Submit
              </Button>
              </Grid>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;