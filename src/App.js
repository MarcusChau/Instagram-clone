import React, { useState, useEffect } from 'react';
import './css/App.css';
import Post from './Post'; // importing post function
//import Button from './Button';
import { db } from './firebase';
import 'reactjs-popup/dist/index.css';


// App function
function App() {

  // React hook - short piece of functional code & state- short term memory storage in react
  const [posts, setPosts] = useState([]);


  // userEffect - Runs a piece of code based on a specific conditionm can have multiple of these functions
  useEffect(() => {

      // Snapshot of the databse "posts"
      db.collection('posts').onSnapshot(snapshot => {
      // everytime a new post is added, this code is fired
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []); // <- Run it the number of times right now only once


  // const logIn = (event) => {
  //   alert("logIn?");
  //   event.preventDefault();
  // }

  // const signUp = (event) => {
  //   alert("Sign up?");
  //   event.preventDefault();
  // }


  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <img 
        className="app__header-image" 
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
        alt="Instagram Logo" />

        {/* Button logIn & SignUp */}
        {/* <Button do={logIn} name="LogIn" className="app__log-in-button"/>
        <Button do={signUp} name="SignUp" className="app__sign-in-button"/> */}
      </div>

      <h1>Hello this is the instagram clone</h1>


      {/* Getting Post function from import && using props in order to inherit different posts */}
      {/* Mapping the posts and looping through them and rendering posts */}

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;
