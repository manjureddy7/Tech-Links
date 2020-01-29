import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';

class Topics extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, link, topic } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        link,
        topic
      });
    });
    this.setState({
      boards
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const topic = this.props.match.params.item;
    const currentTopics = this.state.boards.filter(board => board.topic === topic);
    console.log("CURRENT TOPICS ARE", currentTopics)
    return (
      <>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">

              <h3 className="panel-title">
                <span style={{ padding: '20px' }}><Link to="/"><i className='fas fa-home' style={{ color: 'black' }}></i></Link></span> {this.props.match.params.item.toUpperCase()} Tech Links
            </h3>
            </div>
            <div className="panel-body">
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTopics.map(board =>
                    <tr key={board.description}>
                      <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                      <td><a href={board.description} target="_blank">{board.description}</a></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Topics;