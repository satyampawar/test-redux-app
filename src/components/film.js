import React from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom'
import Loader from './helpers/Loader';
import {getAllFilms,searchData,hoverAction} from '../actions/film'
import {getFilmId} from './helpers/core'
import './style.css'
import {toastr} from 'react-redux-toastr'
import axios from 'axios'
import { Tooltip } from 'reactstrap';
import _ from "lodash"

class Film extends React.Component{
  constructor(props){
    super(props);
    this.state={
    	loading: false,
      data: [],
      hoverData: {},
      tooltipOpen: false,
      hoverloading: false,
      hoverId: undefined
    };
    this.renderActions = this.renderActions.bind(this)
    this.setAction = this.setAction.bind(this)
    this.searchValue = this.searchValue.bind(this)
    this.onHover = this.onHover.bind(this)
  }
  
  componentDidMount(){
    this.props.getAllFilms()
  }
  componentWillReceiveProps(nextProps){
  	this.setState({loading: nextProps.loading, data: nextProps.films, hoverloading: nextProps.hoverloading})
    if(nextProps.hoverData !== undefined){
      this.setState({hoverData: nextProps.hoverData})
    }
  }
  setAction(item,status){
    if(status =="fav"){
      sessionStorage.data ? this.setStorage(item,status) : this.setInitialStorage(item,status)
      toastr.success('Favourite', 'Successfully added')
    }else{
      let data = sessionStorage.data && JSON.parse(sessionStorage.data)
      data.splice(data.indexOf(getFilmId(item)), 1) 
      sessionStorage.setItem('data',JSON.stringify(data))
    }
    this.setState({...this.state})
  }

  setInitialStorage(item,status){
    
    let data = []
    let str = data.push(getFilmId(item))
    sessionStorage.setItem('data',JSON.stringify(data))
  }
  setStorage(item,status){
    let data = JSON.parse(sessionStorage.data)
    data.push(getFilmId(item))
    sessionStorage.setItem('data',JSON.stringify(data)) 
  }

  renderActions(item){
    let data = sessionStorage.data && JSON.parse(sessionStorage.data) || []
    if(data.includes(getFilmId(item))){
      return <a href="javascript:void(0)" onClick={()=> this.setAction(item,'unfav')}><i style={{color: 'red',fontSize: 19}} className="fa fa-heart"></i></a>
    }else{
      return <a href="javascript:void(0)"  onClick={()=> this.setAction(item,'fav')}><i style={{color: 'white',fontSize: 19}} className="fa fa-heart-o"></i></a>
    }
  }


  searchValue(e){
    e.preventDefault()
    this.props.searchData(e.target.value)

  }

  onHover(e,item){
   this.setState({tooltipOpen: true,hoverId: getFilmId(item),hoverData: {}})
   this.props.hoverAction(item)
  }
  

  render(){
  	let {data,hoverId,hoverData,hoverloading} = this.state;
	  return (
	  <div className="container">
      <Loader {...this.state} />
      <div className="row mt-10">
        <div className="col-md-3">
          <input className="form-control" style={{width: "113%"}} type="text" onChange={(e) => this.searchValue(e)}   />
        </div>
        <div className="col-sm-5">
          <i className="fa fa-search search-icon"/>

          <a href="#" style={{marginLeft: 10}} data-toggle="tooltip" title="Search will be work on key press"><i className="fa fa-info-circle "></i></a>

        </div>
      </div>
        <div className="row">

         {data.map((item)=> {
          
          return(
            <React.Fragment>
            <div id={`film-${getFilmId(item)}`} className="col-sm-4 py-2" onMouseOut={() => this.setState({tooltipOpen: false,hoverId: undefined, hoverData: {}})} onMouseOver={(e) => this.onHover(e,item)}>
              <div className="card h-100 text-white" style={{backgroundColor: 'gray'}}>
                  <div className="card-body">
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-text">{item.opening_crawl}</p>
                      <p className="card-text">Director: {item.director}</p>
                      <p className="card-text">Producer: {item.producer}</p>
                      <div className="actions">
                        {this.renderActions(item)}
                        <Link data-toggle="tooltip" title={`view a ${item.title}`} style={{color: 'white', fontSize: 19}} to={`/films/${getFilmId(item)}`} ><i className="fa fa-eye"></i></Link>
                      </div>
             
                  </div>
              </div>
            </div>
            {
              hoverId === getFilmId(item)  ? <Tooltip key={getFilmId(item)} placement="top" isOpen={this.state.tooltipOpen} autohide={false} target={`film-${getFilmId(item)}`} toggle={(e)=> this.onHover(e,item)}>
              {_.isEmpty(hoverData) ? 'loading......' : hoverData.characters && hoverData.characters.toString()}
            </Tooltip>
              : null
            }
            
            </React.Fragment>
            )
         })}

          {
            !this.state.loading && data.length === 0 ? 
            <div className="container mt-10">
              <div className="body-style">
                <div style={{"width": "40%"}}>
                  <img src="https://lh3.googleusercontent.com/KnAhFB7f8i88GvV9jZbGPMDEKSm8a_Ewz1YGsa7FVhM5ocHarcVq7nAZgpufUmzWmViqU76CbWvP13sh-oLWcjCCfCbvUAO7LOYfoYmtgvC9zST-myYY9AfqePPTMNR_8LVL67T1eT_S923Oi5YrkrtMGkPipUXxqDtdc0Jf9TaC7AI0sQjwaqCKh0YMaQ1Yo9_VgEiwSHB60N1qxfAYXj9g3RrMedThuDOLEh9lJgmvI_VzxRSh7ZEh6hoIeRsHSI55CUE8Buyv1G399y2e_B97LSgJh7d-GU4RJqlrfuRuAWL2x0p_PG52Z83niCdOV41o-z8Kai6z5Il1z8cXnGUvlaFj0P_cfxdvyRIGSpYjTI6LSU2UtCxD-kNgBah7CJVSCpR6AgMHHyQQ5gQYtodvn4C_9GrYKzs1rJn66wNeUfCLJ33aqXWZdW_gILJMXK60rJ_65aCIWHvsAieTqqitZURwH0mXEYqoowrddbKj62pKuB_vOgfkcQWgVuU2jqwEWcg41KZbmfdmAasYTvvRbzSpsG44myVsg-DrVLp7Wrgl2Uii47B-v3aPFYy1_y_2bVthygSryH8xGnPXgsaLFaNWywmZN1hNCavugel_-eyrQn7Elrau1U9ZoZECxL8w7ikuD6fzZf_EWfkFn29ZyLOuRfT8L0bqVrSeInzy6TkNOLV0je8pPyVcgeVJoL0_rQsFZE-Nt_CYutuW1Q4F=w301-h248-no" style={{float: "right"}}/>
                </div>
              <div style={{"width":"45%","float":"left","marginLeft":"50px"}}>
                <h1 style={{"fontWeight":"bold", "fontSize":"34px"}}>No Data Found</h1>
              </div>
              </div>
            </div>
            : null
          }
        </div>
		  </div>
	  );
	};
}


function mapStateToProps(state) {
	return {
		loading: state.films.loading,
    films: state.films.data,
    hoverData: state.films.characters,
    hoverloading: state.films.hoverloading

	}
}

export default withRouter(connect(mapStateToProps, {getAllFilms,hoverAction,searchData})(Film));
