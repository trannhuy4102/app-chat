import React from 'react';
import firebase from '../firebase';

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chats: [], };
    }

    componentDidMount() {
        const chatRef = firebase.database().ref('general');
        chatRef.on('value', snapshot => {
            const getChats = snapshot.val();
            let ascChats = [];
            for (let chat in getChats) {
                if (getChats[chat].message !== '') {
                    ascChats.push({
                        id: chat,
                        message: getChats[chat].message,
                        user: getChats[chat].user,
                        date: getChats[chat].timestamp
                    });
                }
            }
            const chats = ascChats.reverse();
            this.setState({ chats });
        })
    }

    render() {
        return (
            <div className='p-16'>
                <div className='w-full max-w-3xl m-auto flex items-center flex-col p-4 rounded-lg text-black'>
                    <h2 className='text-4xl mb-6 font-bold'>Chat App</h2>

                    <div className='w-full bg-chatbox p-4 rounded-lg'>
                        <ul >

                            {this.state.chats.map(chat => {
                                const postDate = new Date(chat.date);
                                const date = new Date(chat.date);
                                const hour = date.getHours();
                                const minute = date.getMinutes();
                                return (
                                    <li className='w-full' key={chat.id}>
                                        <p className='bg-white w-max p-2 rounded-md max-w-screen-sm pr-9 mt-8 relative'>
                                            {chat.message}
                                            <span className='absolute right-1 bottom-0 text-xs text-gray-500'>{hour}:{minute}</span>
                                            <div className='flex bg-gray-400 p-1 rounded-md text-white w-max text-xs absolute ml-0 -top-4'>
                                                <h3>{chat.user}:</h3>
                                                <h4 className='ml-2'>{postDate.getDate() + '/' + (postDate.getMonth() + 1)}</h4>
                                            </div>
                                        </p>
                                    </li>
                                )
                            })}

                        </ul>

                        {/* <div className='flex mt-10 h-10 flex-row-reverse'>
                        <div className='h-full w-10 rounded-full bg-white text-blue-600 flex items-center justify-center cursor-pointer ml-2'>
                            <BsSend />
                        </div>
                        <input className='h-full rounded-md bg-slate-200 focus-within:outline-blue-300 pl-4' placeholder='message'></input>
                    </div> */}
                    </div>


                </div>
            </div>
        )
    }
}




export default Chatbox;

