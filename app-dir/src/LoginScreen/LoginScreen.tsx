/**
 * LoginScreen: setting up the layout for the login screen.
 * 
 * Requires props:
 *  - login - function to trigger the login method.
 */


import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import LoginView from './LoginView';
import RegisterView from './RegisterView';

type LoginScreenProps = {
    login: () => void
}

const LoginScreen = (props: LoginScreenProps):JSX.Element => {
    const [switchLoginView, loginSwitch] = useState(true);
    return(
        <Grid.Column style={{maxWidth:450}}>
            {switchLoginView ? 
            <LoginView viewChange={()=>{loginSwitch(false)}} loginAction={()=>{props.login()}}/> :
            <RegisterView viewChange={()=>{loginSwitch(true)}}/>}
        </Grid.Column>
    )
}

export default LoginScreen;