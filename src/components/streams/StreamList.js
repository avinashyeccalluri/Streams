import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';
import {Link} from 'react-router-dom'

class StreamList extends Component {
  
  componentDidMount() {
    this.props.fetchStreams();
  }


  renderList(){
    return this.props.streams.map((stream)=>{
      return (
        <div className="item" key={stream.id}>
        {/* to make the ui work properly we place this div here */}
        {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera"/>
          <div className="content">
            {stream.title}
            <div className="description">
              {stream.description}
            </div>
          </div>
        </div>
      )
    })
  }

  renderAdmin(stream){
      if(stream.userId === this.props.currentUserId){
        return (
          <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
            <button className="ui button negative">Delete</button>
          </div>
        )
      }
  }

  renderCreate(){
      if(this.props.isSignedIn){
        return(
          <div style={{textAlign: 'right',marginTop: '10px'}}>
            <Link to="/streams/new" className="ui button primary">
              Create Stream
            </Link>
          </div>
        )
      }
  }

  
  render(){
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
          {this.renderCreate()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    streams : Object.values(state.streams),
    currentUserId : state.auth.userId,
    isSignedIn : state.auth.isSignedIn,
  }

}

export default connect(mapStateToProps,{fetchStreams} )(StreamList);
