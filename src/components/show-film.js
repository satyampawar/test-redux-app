import React from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom'
import Loader from './helpers/Loader';
import {getFilm} from '../actions/film'
import {getFilmId} from './helpers/core'
import './style.css'


class ShowFilm extends React.Component{
  constructor(props){
  	
    super(props);
    this.state={
    	loading: false,
      film: {},
      id: props.match.params.id
    };
   
  }
  
  componentDidMount(){
    this.props.getFilm(this.state.id)
  }
  componentWillReceiveProps(nextProps){
  	if(nextProps.film){
  		this.setState({ film: nextProps.film})
  	}
  	this.setState({loading: nextProps.loading})
  }
 
  
  
  render(){
  	let {film} = this.state;
  	
	  return (
	  <div className="container">
      <Loader {...this.state} />
      <div className="row">
				<div className="col-md-6 main-show-div mt-10">
					<figure className="card card-product">
						<div className="img-wrap"></div>
						<figcaption className="info-wrap">
								<h4 className="title">{film.title}</h4>
								<p className="desc">Description: {film.opening_crawl}</p>
								<p className="desc">Director: {film.director}</p>
								<p className="desc">Producer: {film.producer}</p>
								<p className="desc">Release Date: {film.release_date}</p>
								<p className="desc">Edited: {film.edited}</p>
								<p className="desc">Created: {film.created}</p>
								<p className="desc">Episode: {film.episode_id}</p>
								<p className="desc"><Link to={'/films'}>Back</Link></p>
							
						</figcaption>
					</figure>
				</div>
			</div>
		</div>
	  )
	}
}


function mapStateToProps(state) {
	return {
		loading: state.films.loading,
    film: state.films.film

	}
}

export default withRouter(connect(mapStateToProps, {getFilm})(ShowFilm));
