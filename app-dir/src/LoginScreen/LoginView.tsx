import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, ButtonProps, Form, Header, InputProps } from 'semantic-ui-react';
import axios from 'axios';

type loginViewProps = {
  viewChange: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void,
  loginAction: () => void
}


const LoginView = (props : loginViewProps):JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //handle input changes
  const usernameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as unknown as InputProps; 
    setUsername(target.value);
  }

  const passwordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as unknown as InputProps; 
    setPassword(target.value);
  }

  const attemptLogin = (event: FormEvent<HTMLFormElement>) => {
    axios.post('/login', {
      params: {
        username: username,
        password: password
      }
    }).then((response)=>{
      console.log("Received response for user named: " + response.data);
      props.loginAction();
    }).catch((err)=>{
      console.log("An Error has occured!");
      console.log(err);
    });
  
    event.preventDefault();
  }

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