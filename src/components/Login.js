import React from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        }
    }


    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.props.history.push('/');
            console.log("Log in Success")
        }).catch(error => {
            this.setState({ error });
        });
    }

    render() {
        const { email, password, error } = this.state;
        return (

            <div className='p-20'>
                <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 rounded-lg'>
                    <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                        <img className='w-full' src='img/login-animation.gif' alt=''></img>
                    </div>

                    <form className="w-full py-3 flex flex-col" onSubmit={this.handleSubmit}>
                        {error && <p className="text-red-500">{error.message}</p>}

                        <label htmlFor="email">Email</label>
                        <input
                            type={"email"}
                            id="email"
                            name="email"
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                            onChange={this.handleChange}
                            value={email}
                        />

                        <label htmlFor="password">Password</label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className=" w-full bg-slate-200 border-none outline-none "
                                onChange={this.handleChange}
                                value={password}
                            />
                        </div>


                        <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                            Login
                        </button>

                        <p className="text-left text-sm mt-3">
                            Don't have account ?{" "}
                            <Link to={"/register"} className="text-red-500 underline">
                                Sign up
                            </Link>
                        </p>


                    </form>
                </div>
            </div>
        )
    }
}
export default Login;