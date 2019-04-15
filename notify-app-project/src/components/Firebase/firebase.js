import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAWlfl686Q-A06EuPuzcYApcr9hU_LVFVs",
    authDomain: "notifs-007.firebaseapp.com",
    databaseURL: "https://notifs-007.firebaseio.com",
    projectId: "notifs-007",
    storageBucket: "notifs-007.appspot.com",
    messagingSenderId: "917000876700"
  };


   
const fire = firebase.initializeApp(config);
export default fire ;
 