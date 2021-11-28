/**
 * App: root of the app.
 * initializes our Store, Router, Layout etc.
 * 
 * also control our login screen, cause why not.
 */


import React, { useState } from 'react';
import LoginScreen from './LoginScreen/LoginScreen';
import { Grid } from 'semantic-ui-react';
import { Layout } from './MainScreen/Layout';
import {Store} from './Context/Store';
import { BrowserRouter } from 'react-router-dom';


function App():JSX.Element {
  //const {state, dispatch} = useUserContext(); //for now, perhaps later I'll need it
  const [loginBool, setLogin] = useState(false);
  //const [loggedUser, setLoggedUser] = useState<UserFE>();
  
  return (
    <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }} columns={1} centered>
      <Store>
        {loginBool ? 
          <BrowserRouter>
            <Layout />
          </BrowserRouter> :
          <Grid.Column style={{maxWidth:450}}>
          <LoginScreen login={()=>{setLogin(true)}}/>
        </Grid.Column>
        }
      </Store>
    </Grid>
  );
}

export default App;
