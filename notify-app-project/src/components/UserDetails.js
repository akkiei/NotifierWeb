import React, { Component } from 'react'
import '../css/userDetails.css'
import fire from './Firebase/firebase';

class UserDetails extends React.Component{
 rows= []
  constructor(){
    super();
    this.state = {
            dateAndTime : [],
            message :[],
            flag : false
          }
        
    this.logout = this.logout.bind(this);
    this.updateStateData = this.updateStateData.bind(this);
    this.properTime = this.properTime.bind(this);
    this.sortObject = this.sortObject.bind(this);

  }

  logout(){
    
        fire.auth().signOut();

  }

  componentDidMount () {

      this.updateStateData();

  }

  properTime(timestamp) {

      let time = new  Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp);
      return time;
  }
  
  sortObject(key,value) {

      for( let i = 0; i < key.length; i++){
            for( let j = 0 ; j < key.length ; j++ )
                    if( key[i] > key[j] )
                        {
                              let temp = key[i] ;
                              key[i] = key[j];
                              key[j] = temp;

                              let temp1 = value[i];
                              value[i] = value[j];
                              value[j] = temp1;
                        }
             }
  }

  updateStateData() {

    if( fire.auth().currentUser ){
          console.log("User exists");
          const email = fire.auth().currentUser.email;
          const database = fire.firestore();
          database.collection("users").doc(email).get().then( (doc) => {
                    if( doc.exists) {
                        let k =[] , v = [] ;
                        let keys = Object.keys(doc.data()) ;
                        let values = Object.values(doc.data());
                        this.sortObject(keys,values);
                        for( let  i = 0; i<keys.length; i++) {
                                console.log( this.properTime(keys[i]) +"  "+ values[i] ) ;
                                k.push(this.properTime(keys[i]))
                                v.push(values[i])
                                this.setState({dateAndTime : k , message : v});
                            }
                      }
                    else {
                      console.log("data not found");
                    }
              });                       
    }
   else  
        console.log("User doesn't exists");
      
}

output() {

  // let rows = [] 
  // return (
  //       <React.Fragment>   
  //             {  for( let i = 0; i < this.state.dateAndTime.length ; i++ )}
  //                    rows.push(<tr><td className="td1">{this.state.dateAndTime[i]}</td><td>{this.state.message[i]}</td></tr>)
                     
  //             </React.Fragment>

  // )
}

render() {

     
    let rows = [] 

    rows.push( <tr><th className="tb1-header">Date and Time</th><th className="tb1-header">Message</th></tr> )
    for( let i = 0; i < this.state.dateAndTime.length ; i++ ){
      rows.push(<tr><td className="td1">{this.state.dateAndTime[i]}</td><td>{this.state.message[i]}</td></tr>)
        } 


    return  <div>   
                  {/* <p>{this.state.rows || "loading"}</p> */}
                  <div align="right">
                  <button onClick={this.logout}>SignOut</button> 
                  <button onClick={this.updateStateData}>Update</button>
                  </div>
                <table><tbody>{rows}</tbody></table>
               
            </div>
  }

}
export default UserDetails