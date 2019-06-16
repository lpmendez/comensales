import firebase from "firebase";
console.log("Apikey", process.env.APIKEY);
var config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DBURL,
  projectId: process.env.PROJECTID,
  storageBucket: "",
  messagingSenderId: process.env.SENDERID,
  appId: "1:317341402109:web:33206501bd98c13b"
};

export const db = firebase.initializeApp(config).database();
