import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import { SignIn } from './components/Signin';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: [],
      isLogin: false
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
    const isLogedIn = localStorage.getItem('isLogged');
    if (isLogedIn) {
      this.setState({ isLogin: true });
    }
  }

  handleLogin = (boolean) => {
    this.setState({ isLogin: boolean })
  }

  logoutUser = () => {
    firebase.auth().signOut();
    this.setState({ isLogin: false });
    localStorage.removeItem('isLogged');
  }

  render() {
    const topicsSet = new Set(this.state.boards.map(board => board.topic));
    const topicDetails = [...topicsSet];
    return (
      <>
        <header className="header-section">
          Web Development,Chewed Up
        </header>
        {!this.state.isLogin ? <SignIn isLoginSuccess={this.handleLogin} /> :
          <div>
            <div>
              <button onClick={this.logoutUser} className="btn btn-danger">Logout</button>
            </div>
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
            <h4 className="add-link"><Link to="/create">Add Tech Link</Link></h4>
          </div>
        }
      </>
    );
  }
}

export default App;