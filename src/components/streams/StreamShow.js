import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';
import flv from 'flv.js'


class StreamShow extends Component {

  constructor(props){
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id)
    this.buildPlayer()
  }

  componentDidUpdate(){
    this.buildPlayer()
  }

  componentWillUnmount(){
    this.player.destroy();
  }

  buildPlayer (){
    const {id} = this.props.match.params;
    if(this.player || !this.props.stream){
      return;
    }
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current)
    this.player.load()
  }

  render() {
    
  if(!this.props.stream){
    return "Loading...";
  }
  const {title, description} = this.props.stream;
    return (
      <>
        <video ref={this.videoRef} style={{width: '100%'}} controls></video>
        <h1>{title}</h1>
        <h4>{description}</h4>
      </>
    );
  }
  
 
}

const mapStateToProps = (state, ownProps)=>{

  return {stream : state.streams[ownProps.match.params.id]}
  
  
}

export default connect(mapStateToProps, {fetchStream} )(StreamShow);
