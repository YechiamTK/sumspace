import React from 'react';
import { Button, ButtonProps, Form, Header } from 'semantic-ui-react';

type loginViewProps = {
  viewChange: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void
}

const LoginView = (props : loginViewProps):JSX.Element => {
  return(
    <>
      <Header>
        Log In To SumSpace!
      </Header>
      <Form>
        <Form.Input label="Username" placeholder="enter your username..." />
        <Form.Input label="Password" type="password" placeholder="enter your password..." />
        <Button type="submit">Log in</Button>
        <Button onClick={props.viewChange}>New User? Register Now!</Button>
      </Form>
    </>
  )
}

export default LoginView;