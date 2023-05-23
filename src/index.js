import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { auth } from './firebase';
import firebase from './firebase';


class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  logOutUser = () => {
    firebase.auth().signOut()
      .then(window.location = "/");

  }

  render() {
    return (
      <Router>
        <div className="app">
          <nav className="main-nav">
            {!this.state.user &&
              <header className='fixed shadow-md w-full h-16 z-50 flex gap-8 text-gray-600 items-center font-bold flex-row-reverse pr-16 '>
                <Link to='/home'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='register'>Register</Link>
              </header>
            }
            {this.state.user &&
              <header className='fixed shadow-md w-full h-16 z-50 flex gap-8 text-gray-600 items-center font-bold flex-row-reverse pr-16 '>
                <h2 className='cursor-pointer' onClick={this.logOutUser}>Logout</h2>
              </header>
            }

          </nav>
          <Switch>
            <Route path="/" exact render={() => <App user={this.state.user} />} />
            <Route path="/home" exact render={() => <App user={this.state.user} />} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </div>
      </Router>
    )
  }
}

reportWebVitals();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRouter />);