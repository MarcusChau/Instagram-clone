import React, { useState, useEffect } from 'react';
import './css/App.css';
import Post from './Post'; // importing post function
import Dashboard from './Component/Dashboard.js';
import SignIn from './Component/SignIn';
import { auth, db } from './firebase';
import 'reactjs-popup/dist/index.css';
import ImageUpload from './ImageUpload';


// App function
function App() {

  // React hook - short piece of functional code & state- short term memory storage in react
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);


  auth.onAuthStateChanged(function(user) {
    if (user) {
      setUser(user);
    } else {
      // No user is signed in.
      setUser("");
    }
  })


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


  return (
    <div className="app">

      {/* I want to have... */}
      {/* Caption input */}
      {/* File picker */}
      {/* Post button */}

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry need to login to upload</h3>
      )}
      


      {/* Header */}
      <div className="app__header">
        
        <img 
        className="app__header-image" 
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
        alt="Instagram Logo" />
        
      </div>


      {/* User login, sign up or logout */}
      {user ? (
        <button className='logout__button' onClick={() => auth.signOut()}>Logout</button>
      ):(
        <div className='app__logincontainer'>
          <SignIn onClick={() => setOpenSignIn(true)}/>
          <Dashboard/>
      </div>
      )}


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
