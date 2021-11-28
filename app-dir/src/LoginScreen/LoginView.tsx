/**
 * LoginView: the login form view.
 * 
 * Requires props:
 *  - viewChange - mouse event to change between login and register views
 *  - loginAction - triggering the login event
 * 
 */


import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, ButtonProps, Form, Header, InputProps } from 'semantic-ui-react';
import axios from 'axios';
import {useUserContext} from '../Context/Store';

type loginViewProps = {
  viewChange: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void,
  loginAction: () => void
}


const LoginView = (props : loginViewProps):JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {state: {user}, dispatch} = useUserContext();

  //handle input changes
  const usernameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as unknown as InputProps; 
    setUsername(target.value);
  }

  const passwordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as unknown as InputProps; 
    setPassword(target.value);
  }

  //send user info to BE and logs in the user
  const attemptLogin = (event: FormEvent<HTMLFormElement>) => {
    axios.post('/login', {
      params: {
        username: username,
        password: password
      }
    }).then((response)=>{
      const loggedUser = response.data;
      console.log("Received response for user named: " + loggedUser.username);
      dispatch({type: 'LOG_IN', payload: loggedUser});
    }).catch((err)=>{
      console.log("An Error has occured!");
      console.log(err);
    });
  
    event.preventDefault();
  }

  useEffect(()=>{
    console.log(user);
    if (user._id != -1)
      props.loginAction();
    }, [user])

  return(
    <>
      <Header>
        Log In To SumSpace!
      </Header>
      <Form onSubmit={attemptLogin}>
        <Form.Input label="Username" value={username} onChange={usernameInputChange} placeholder="enter your username..." />
        <Form.Input label="Password" type="password" value={password} onChange={passwordInputChange} placeholder="enter your password..." />
        <Button type="submit">Log in</Button>
        <Button onClick={props.viewChange}>New User? Register Now!</Button>
      </Form>
    </>
  )
}

export default LoginView;