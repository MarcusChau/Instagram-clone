import React, { useEffect, useState } from 'react'; /* rfce command  */
import '../css/Post.css';
import { db } from '../firebase';
import firebase from "firebase/compat/app";


// Post function 
// destructuring the props - ES6 syntax
function Post({user, postId, username, caption, imageUrl}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  //console.log(comments[0])

  
  useEffect(() => {
    let unsubscribe;
    if(postId) {
      unsubscribe = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        // mapping the docs in comments
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);



  // function to push comments into database
  const postComment = (event) => {
    event.preventDefault();

    // setting the comments
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  }

  return (
    <div className='post'>

        {/* header -> avatar + username */}
        <div className="post__header">
            {/* Avatar */}
            <img 
            className='post__avatar' 
            src="https://media.istockphoto.com/photos/aerial-view-of-lower-manhattan-new-york-picture-id946087016?k=20&m=946087016&s=612x612&w=0&h=5k1qMeooPXIBjCt6R5nUi_Mb4_PkhliKpBXDnfEGGww=" 
            alt="Avatar" 
            />

            {/* Username */}
            <h3>{username}</h3>
        </div>


        {/* Image */}
        <img className='post__image' src={imageUrl} alt="Post"/>


        {/* username + caption */}
        <h4 className='post__text'><strong>{username}</strong>&ensp; {caption}</h4>

        <div className='post__comments'>
          {
            comments.map((comment) => (
              <p>
                <strong>{comment.username}</strong>&ensp; {comment.text} 
              </p>
            ))
          }
        </div>

        {user &&(
            <form className='post__commentbox'>
            <input type="text"
              className='post__input'
              placeholder='Add a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className='post__button'
              disabled={!comment}
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
          )}

        
    </div>
  )
}

export default Post
