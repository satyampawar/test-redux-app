import React from 'react'
import { Router, Link, Route, Switch, NavLink,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'


import Film from './components/film'
import ShowFilm from './components/show-film'

import NotFound from './NotFound'

// import createHistory from 'history/createBrowserHistory';

// export const history = createHistory();

 class Main extends React.Component{
	constructor(props){
		super(props)
		this.state = {

		}
	}


	render(){
  
		return(
			<Router history={this.props.history}>
				
				<Switch>
	        <Route exact path="/" render={(props) =>  (
	      		 <Redirect to='/films'/>
	        )}  />
	        <Route path="/films" exact component={Film}/>
	        <Route path="/films/:id" exact component={ShowFilm}/>
	        <Route component={NotFound}/>
	      </Switch>
		
			</Router>
			)
	}
}

function mapStateToProps(state) {
  return {
    error: state.films.error,
    success_message: state.films.success_message,

  }
}

export default withRouter(connect(mapStateToProps, {})(Main));
