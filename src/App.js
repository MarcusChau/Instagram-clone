import React, { useState } from 'react';
import './App.css';
import Post from './Post'; // importing post function


// App function
function App() {
  // React hook - short piece of functional code & state- short term memory storage in react
  const [posts, setPosts] = useState([
    {
      username:"Marcus",
      caption:"Wow it works",
      imageUrl:"https://media.istockphoto.com/photos/aerial-view-of-lower-manhattan-new-york-picture-id946087016?k=20&m=946087016&s=612x612&w=0&h=5k1qMeooPXIBjCt6R5nUi_Mb4_PkhliKpBXDnfEGGww="
    },
    {
      username:"Dylan",
      caption:"Wow it works",
      imageUrl:"https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q="
    },
  ]);

  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <img 
        className="app__header-image" 
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
        alt="Instagram Logo" />
      </div>

      <h1>Hello this is the instagram clone</h1>


      {/* Getting Post function from import && using props in order to inherit different posts */}
      {/* Mapping the posts and looping through them and rendering posts */}
      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;
