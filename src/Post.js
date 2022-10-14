import React from 'react'; /* rfce command  */
import './Post.css';


// Post function 
// destructuring the props - ES6 syntax
function Post({username, caption, imageUrl}) {
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
        <img className='post__image' src={imageUrl} alt="Holder"/>


        {/* username + caption */}
        <h4 className='post__text'><strong>{username}</strong> {caption}</h4>
    </div>
  )
}

export default Post
