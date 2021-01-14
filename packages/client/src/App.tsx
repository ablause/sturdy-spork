import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages';

const App: FC = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </div>
)

export default App;
