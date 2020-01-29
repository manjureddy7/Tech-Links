import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      title: '',
      description: '',
      link: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, link, topic } = this.state;

    this.ref.add({
      title,
      description,
      link,
      topic
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        link: '',
        topic: ''
      });
      this.props.history.push("/")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { title, description, topic } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD Tech - Link
            </h3>
          </div>
          <div className="panel-body">
            <h4 style={{ textAlign: 'left' }}><Link to="/"><i className='fas fa-home' style={{ color: 'black' }}></i></Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Link:</label>
                <textarea className="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textarea>
              </div>
              <div className="form-group">
                <label htmlFor="topic">Topic:</label>
                <input type="text" className="form-control" name="topic" value={topic} onChange={this.onChange} placeholder="topic" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;