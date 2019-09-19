import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import Landing from './components/Landing';
import Home from './components/Home';
import NotFound from './components/NotFound';

const store = createStore(reducer); // creating and initiazlizing the redux store


ReactDOM.render(
  <Provider store={store}>
  <div>
	  <Router>
		  <Switch>
		     <Route exact path="/" component={Landing} name="Landing page" key={1}/>
		     <Route exact path="/home" component={Home} name="Home Page" key={2}/>
		     <Route component={NotFound}  name="404 Page" key={3} />
	      </Switch>
	  </Router>
	  </div>
  </Provider>,
  document.getElementById('root')
);