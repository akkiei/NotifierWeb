import React from 'react'
import '../css/form.css'
import fire from './Firebase/firebase';
class Login extends React.Component{
        constructor() {
            super();
            this.state = {
                userName : '',
                password : '',
                email : '',
                flagRegister : false
            }
            
            this.login = this.login.bind(this);
            this.registerFlag = this.registerFlag.bind(this);
            this.loginFlag = this.loginFlag.bind(this);
            this.signUp =this.signUp.bind(this);
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

        handleUserNameChange = event => {
            this.setState({
                    userName : event.target.value
            })
        }

        registerFlag() {
                this.setState(
                    {
                        flagRegister : true
                    }
                )    
        }

        loginFlag(){
                this.setState({flagRegister : false})
        }

        signUp() {
            fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).catch(
                (error) => {console.log(error);
                }
            )
        }

        login(e){
            e.preventDefault();
            fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then( (u)=>{
             }).catch( (error) => {
             console.log("HELLO FROM SIGN UP ERROR"+error)
            });    
        }

        render() {
            return( 
                   <div className="form-style-6"  >
                                
                                <form>
                                { 
                                  this.state.flagRegister ? 
                                  <React.Fragment>  <h1>Register</h1> <input type="text" placeHolder="User Name" value={this.state.userName} onChange={this.handleUserNameChange}></input>  </React.Fragment> 
                                   :
                                  <h1>Login </h1> 
                                }                          
                                <input type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}></input>
                                <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                                {
                                   this.state.flagRegister ?   
                                   <React.Fragment> <input type="submit" onClick={this.signUp} value="Submit"></input><br/>  </React.Fragment>
                                    :   
                                   <React.Fragment>   <input type="submit" onClick={this.login} value="Submit"></input><br/> </React.Fragment> 
                                }
                                
                                {/* REMOVED THE REGISTERATION FACILITY TO JUST ALLOW REGISTERATION FROM APP ONLY */}
                               {/* {
                                 this.state.flagRegister ? <input type="button" onClick={this.loginFlag}value="Login"></input> 
                                 :
                                 <input type="button" onClick={this.registerFlag}value="Register"></input>  
                               } */}
                               </form>   
                   </div>
                )
        }
}
export default Login 