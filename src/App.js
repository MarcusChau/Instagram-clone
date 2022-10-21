import React, { useState, useEffect } from 'react';
import './css/App.css';
import Post from './Component/Post'; // importing post function
import Dashboard from './Component/Dashboard.js';
import SignIn from './Component/SignIn';
import { auth, db } from './firebase';
import 'reactjs-popup/dist/index.css';
import ImageUpload from './Component/ImageUpload';


// App function
function App() {

  // React hook - short piece of functional code & state- short term memory storage in react
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);

useEffect(() => {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      setUser(user);
    } else {
      // No user is signed in.
      setUser("");
    }
  })
}, [user]);


  // userEffect - Runs a piece of code based on a specific conditionm can have multiple of these functions
  useEffect(() => {

      // Snapshot of the databse "posts"
      db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // everytime a new post is added, this code is fired
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []); // <- Run it the number of times right now only once


  return (
    <div className="app">
      
      {/* Header */}
      <div className="app__header">
        
        <img 
        className="app__header-image" 
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
        alt="Instagram Logo" />


        {/* User login, sign up or logout */}
        {user ? (
          <button className='logout__button' onClick={() => auth.signOut()}>Logout</button>
        ):(
          <div className='app__logincontainer'>
            <SignIn onClick={() => setOpenSignIn(true)}/>
            <Dashboard/>
        </div>
        )}
      </div>

      <div className='app__posts'>
        {/* Getting Post function from import && using props in order to inherit different posts */}
        {/* Mapping the posts and looping through them and rendering posts */}
        <div className='app__postsleft'>
          {
            posts.map(({id, post}) => (
              <Post key={id} user={user} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))
          }
        </div>

        <div className='app__postsright'>
          <div>
            <h2 id='h2__elem'>About</h2>
            <p className='under-about'>This is an instagram clone with my own spin to it . . .</p>
            <p className='extra'>
              Enjoy!!
            </p>
          </div>

          <hr />

          <div className='middle__app-vs'>
            <div>
              <p id='bold-mid'>Latest Version</p>
              <p className='verison__number'>1.0.0</p>
            </div>
            <br />
            <div>
              <p id='bold-mid'>Created by:</p>
              <p className='createdby__me'>Marcus Chau</p>
            </div>
          </div>

          <br />

          <hr />

          <div>
            <h2 id='h2__elem'>Socials</h2>
            <ul>
              <li>
                <a href="https://marcuschau.com/">Personal Website</a>
              </li>
              <li>
                <a href="https://github.com/MarcusChau">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/marcus-chau-b88878221/">LinkedIn</a>
              </li>
              <li>
                <a href="https://www.instagram.com/marcusrchau/">Instagram</a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCVr_FBbu-EICLoV8tuaU63A">Youtube</a>
              </li>
            </ul>
          </div>

          <br />

          <hr />

          <div className='user__profile'>
            <h2 id='h2__elem'>Your Profile</h2>
            <h4 id='h4__elem'>Username:</h4>
            <div className='display__nameprofile'>
              {user.displayName}
            </div>
            
            <br />

            <h4 id='h4__elem'>Recent captions:</h4>
            {
            posts.slice(0, 6).map(({post}) => (
              <p className='captions__profile'>
                 {'>'} {post.caption}
              </p>
            ))
            }

            <br />
            <hr />
          </div>
        </div>
      </div>
      


      {/* Image upload */}
      <div className='image__upload'>
        {user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ) : (
          <p className='error__upload'>Sorry need to login to upload</p>
        )}
      </div>
      

    </div>
  );
}

export default App;
