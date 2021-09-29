import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, ButtonProps, Form, Header, InputProps } from 'semantic-ui-react';

type registerViewProps = {
    viewChange: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void
}

const RegisterView = (props : registerViewProps):JSX.Element => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

      //handle input changes
    const usernameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as unknown as InputProps; 
        setUsername(target.value);
    }

    const firstNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as unknown as InputProps; 
        setFirstName(target.value);
    }

    const lastNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as unknown as InputProps; 
        setLastName(target.value);
    }

    const passwordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as unknown as InputProps; 
        setPassword(target.value);
    }

    const passwordAgainInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as unknown as InputProps; 
        setPasswordAgain(target.value);
    }

    const attemptRegister = (event: FormEvent<HTMLFormElement>) => {
        if (password == passwordAgain){
            axios.post('/register', {
            params: {
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password
            }
            }).then((response)=>{
            console.log(response);
            });
        }
        else {
            console.log("Passwords do not match!");
        }
    
        event.preventDefault();
    }

    return(
        <>
            <Header>
            Fill In The Details To Register To SumSpace!
            </Header>
            <Form onSubmit={attemptRegister}>
                <Form.Input label="Username" value={username} onChange={usernameInputChange} placeholder="enter username..." />
                <Form.Input label="First Name" value={firstName} onChange={firstNameInputChange}/>
                <Form.Input label="Last Name" value={lastName} onChange={lastNameInputChange}/>
                <Form.Input label="Password" value={password} onChange={passwordInputChange} type="password" placeholder="enter your password..." />
                <Form.Input label="Re-enter Password" value={passwordAgain} onChange={passwordAgainInputChange} type="password" placeholder="enter your password again..." />
                <Button type="submit">Register</Button>
                <Button onClick={props.viewChange}>Return To Login</Button>
            </Form>
        </>
    )
}

export default RegisterView;