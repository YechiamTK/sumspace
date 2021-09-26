import React from 'react';
import LoginScreen from './LoginScreen/LoginScreen';
import { Grid } from 'semantic-ui-react';

function App():JSX.Element {
  return (
    <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }} columns={1} centered>
      <Grid.Row>
        <Grid.Column style={{maxWidth:450}}>
          <LoginScreen/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
