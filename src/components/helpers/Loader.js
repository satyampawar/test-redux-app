import React, {Component} from 'react';
import img from '../../assets/images/loader.gif'

export default class Loader extends Component {
  render() {
    return (
      this.props.loading ?
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex: 1}}>
          <img src={img} />
        </div>
      : null
    )
  }
}
