import React, { Component }  from 'react';
import {Link} from 'react-router-dom'

export default class NotFound extends Component {
  render() {
    return ( 
				<div class="page-wrap d-flex flex-row align-items-center">
				    <div class="container">
				        <div class="row justify-content-center">
				            <div class="col-md-12 text-center">
				                <span class="display-1 d-block">404</span>
				                <div class="mb-4 lead">Oops! We can't seem to find the page you are looking for.</div>
				                <Link to={'/'}>Back to Home page</Link>
				            </div>
				        </div>
				    </div>
				</div>

    );
  }
}
