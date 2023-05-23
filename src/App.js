import React from 'react';
import Chatbox from './components/Chatbox';
import { Link } from 'react-router-dom'
import firebase from './firebase';
import { BsSend } from 'react-icons/bs'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.message !== '') {
      const chatRef = firebase.database().ref('general');
      const chat = {
        message: this.state.message,
        user: this.props.user.displayName,
        timestamp: new Date().getTime(),
      };
      chatRef.push(chat);
      this.setState({ message: '' });
    }
  };
  render() {
    return (
      <div className="App">
        {this.props.user && (
          <div className="max-w-3xl relative m-auto">
            <Chatbox />
            <form className='flex h-10 flex-row-reverse absolute bottom-4 right-16' onSubmit={this.onSubmit}>
              <button className='h-full w-10 rounded-full bg-white text-blue-600 flex items-center justify-center cursor-pointer ml-2'>
                <BsSend />
              </button>
              <input className='h-full rounded-md bg-slate-200 focus-within:outline-blue-300 pl-4' placeholder='message' name="message" id="message" value={this.state.message} onChange={this.onChange}></input>
            </form>
          </div>
        )}
        {!this.props.user && (

          <div className='p-32'>
            <div className='w-full max-w-lg m-auto flex items-center flex-col p-4 rounded-lg text-black'>
              <h2 className='text-4xl mb-6 font-bold'>Chat App</h2>
              <h4 className='text-3xl text-center'><Link to='/login' className="text-red-500 underline">Login</Link> or <Link to='/register' className="text-red-500 underline">Register</Link> to start chat.</h4>
            </div>
          </div>
        )}
      </div>
    )
  }

}

export default App;
