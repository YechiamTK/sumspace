import React, { useState } from 'react';
import LoginScreen from './LoginScreen/LoginScreen';
import { Grid } from 'semantic-ui-react';
import { Layout } from './MainScreen/Layout';

function App():JSX.Element {
  const [loginBool, setLogin] = useState(false);

  return (
    <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }} columns={1} centered>
      
        {loginBool ? 
          <Layout /> :
        <Grid.Column style={{maxWidth:450}}>
          <LoginScreen login={()=>{setLogin(true)}}/>
        </Grid.Column>
        }
      
    </Grid>
  );
}

export default App;
