import React from 'react';
import { Button, ButtonProps, Form, Header } from 'semantic-ui-react';

type registerViewProps = {
    viewChange: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void
  }

const RegisterView = (props : registerViewProps):JSX.Element => {
    return(
        <>
            <Header>
            Fill In The Details To Register To SumSpace!
            </Header>
            <Form>
                <Form.Input label="Username" placeholder="enter username..." />
                <Form.Input label="First Name" />
                <Form.Input label="Last Name" />
                <Form.Input label="Password" type="password" placeholder="enter your password..." />
                <Form.Input label="Re-enter Password" type="password" placeholder="enter your password again..." />
                <Button type="submit">Register</Button>
                <Button onClick={props.viewChange}>Return To Login</Button>
            </Form>
        </>
    )
}

export default RegisterView;