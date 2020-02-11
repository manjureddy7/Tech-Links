import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: [],
      user: {
        username: '',
        password: ''
      }
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
    const topicsSet = new Set(this.state.boards.map(board => board.topic));
    const topicDetails = [...topicsSet];
    return (
      <>
        <header className="header-section">
          Web Development,Chewed Up
        </header>
        <div className="login-form">
          <form>
            <div className="username-section">
              <label className="username-section">Username:</label>
              <input type="text" />
            </div>
            <div className="password-section">
              <label className="username-section">Password:</label>
              <input type="password" />
            </div>
            <div className="login-button">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
        <div>
          <div className="card-deck">
            {
              topicDetails.map((topic) => {
                return (
                  <div className="card bg-warning" key={topic}>
                    <Link to={`/topic/${topic}`}>
                      <div className="card-body text-center">
                        <p className="card-text">{topic.toUpperCase()}</p>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
        <h4 className="add-link"><Link to="/create">Add Tech Link</Link></h4>
      </>
    );
  }
}

export default App;