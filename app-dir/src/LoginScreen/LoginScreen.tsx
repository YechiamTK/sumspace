import React, { useState } from 'react';
import LoginView from './LoginView';
import RegisterView from './RegisterView';

const LoginScreen = ():JSX.Element => {
    const [loginBool, loginSwitch] = useState(true);
    return(
        <> 
            {loginBool ? 
            <LoginView viewChange={()=>{loginSwitch(false)}}/> :
            <RegisterView viewChange={()=>{loginSwitch(true)}}/>}
        </>
    )
}

export default LoginScreen;