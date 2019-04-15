import React from 'react'
import '../css/form.css' 
import Login from './Login';
import fire from './Firebase/firebase'

class Register extends React.Component{
        constructor() {
            super();
            this.state = {
                userName : '',
                password : '',
                email : '',
                login : false
            }
            this.login = this.login.bind(this);
            this.signUp = this.signUp.bind(this);
        } 
        handleUserNameChange = event => {
                this.setState({
                        userName : event.target.value
                })
        }
        handleEmailChange = event => {
            this.setState({
                    email : event.target.value
            })
        }
        handlePasswordChange = event => {
            this.setState({
                password : event.target.value
            })
        }

        submit = () =>{
 
            alert(this.state.userName+this.state.password+this.state.email)
         //   Firebase.doCreateNewUser(this.state.email,this.state.password);
        // problem here ... lookup signup process from youtube before 11 pm. 
        }
        login() {

                this.setState(
                    {
                        login : true 
                    }
                )

        }

        signUp() {
                fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).catch(
                    (error) => {console.log(error);
                    }
                )
        }

        
        render() {

            const {

                userName,
                password,
                email
            } = this.state ;

            const isInvalid = userName.length < 3 || password.length < 5 || email == ''  
         
            return( <div className="form-style-6"  >

                            {this.state.login ? <Login></Login> :
                                 <form onSubmit={this.submit}>
                                <h1>Register </h1>                              
                                <input type="text" placeHolder="User Name" value={this.state.userName} onChange={this.handleUserNameChange}></input>   
                                <input type="email" placeHolder="Email" value={this.state.email} onChange={this.handleEmailChange}></input>
                                <input type="password" placeHolder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                                <input type="submit" value="Submit" onClick={this.signUp} disabled={isInvalid}></input><br/>
                                <input type="button" onClick={this.login} value="Login" ></input>
                            </form> }
                   </div>
                )
        }
}
export default Register 