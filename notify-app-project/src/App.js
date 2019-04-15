import React, {Component} from 'react';
import './App.css';
import Login from './components/Login'
import UserDetails from './components/UserDetails'
import {Route, BrowserRouter, Switch } from 'react-router-dom'
import fire from './components/Firebase/firebase'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        user : {}
    }

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount(){
      this.authListener();
  }

  authListener() {

    fire.auth().onAuthStateChanged( (user) => {

      if(user)
          this.setState ({user})
      else
          this.setState({user : null})
    });

}
  
  render() {
    return (
       <div className="App">
            { this.state.user ? <UserDetails></UserDetails> : <Login></Login> }        
       </div>
    )
  }


}

export default App;
