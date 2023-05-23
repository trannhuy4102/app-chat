import React from "react";
import firebase from "../firebase";
import { Link } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: null
        }
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = e => {
        e.preventDefault();
        const { email, username, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
            user.updateProfile({ displayName: username }).then(() => {
                this.props.history.push('/');
            }).catch(error => {
                this.setState({ error });
            });
        }).catch(error => {
            this.setState({ error });
        })
        console.log("Submitting Registration...");
    }

    render() {
        const { username, email, password, error } = this.state;
        return (

            // <div className="p-4">

            //     {error && <p id="error" className="text-red-500">{error.message}</p>}

            //     <form onSubmit={this.handleSubmit}>
            //         <div class="form-group">
            //             <label for="username">Username</label>
            //             <input type="text" class="form-control" name="username" id="username" onChange={this.handleChange}
            //                 aria-describedby="emailHelp" placeholder="Enter Your name" value={username} />
            //             <small id="emailHelp" class="form-text text-muted">We'll never share your Username with anyone else.</small>
            //         </div>
            //         <div class="form-group">
            //             <label for="exampleInputEmail1">Email address</label>
            //             <input type="email" class="form-control" id="email" name="email" value={email} onChange={this.handleChange}
            //                 aria-describedby="emailHelp" placeholder="Enter email" />
            //             <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            //         </div>
            //         <div class="form-group">
            //             <label for="exampleInputPassword1">Password</label>
            //             <input type="password" class="form-control" name="password" value={password} onChange={this.handleChange}
            //                 id="exampleInputPassword1" placeholder="Password" />
            //         </div>
            //         <div class="form-group form-check">
            //             <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            //             <label class="form-check-label" for="exampleCheck1">Check me out</label>
            //         </div>
            //         <button type="submit" class="btn btn-primary">Submit </button>
            //         <p>Already have an account ? <Link className="Login-btn" to="/Login">Login here</Link></p>

            //     </form>
            // </div>
            <div className='p-20'>
                <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 rounded-lg'>
                    <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                        <img className='w-full' src='img/login-animation.gif' alt=''></img>
                    </div>

                    {error && <p id="error" className="text-red-500">{error.message}</p>}


                    <form className="w-full py-3 flex flex-col" onSubmit={this.handleSubmit}>
                        <label htmlFor="username">User Name</label>
                        <input
                            type={"text"}
                            id="username"
                            name="username"
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                            onChange={this.handleChange}
                            value={username}
                        />


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


                        <button type='submit' className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                            Register
                        </button>

                        <p className="text-left text-sm mt-3">
                            Already have account ?{" "}
                            <Link to={"/login"} className="text-red-500 underline">
                                Login
                            </Link>
                        </p>


                    </form>
                </div>
            </div>
        )
    }
}
export default Register;