import React, { Component} from 'react';
import Modal from '../Modal';
import history from '../../history';
import {connect} from 'react-redux';
import {deleteStream, fetchStream} from '../../actions'

class StreamDelete extends Component{

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    }

    return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`
  }
  
  actions() {
    const { id }  = this.props.match.params;
      return (
      <>
        <div onClick={()=> this.props.deleteStream(id)} className="ui button negative">Delete</div>
        <div onClick={()=> history.push('/')} className="ui  button">Cancel</div>
      </>
    );
  } 
  render() {
    return (
        <Modal
          title="Delete Stream"
          content={ this.renderContent()}
          actions={this.actions()}
          onDismiss = {()=>history.push('/')}
        />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {stream : state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
