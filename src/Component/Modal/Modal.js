import { useEffect, useState } from 'react';
import './Modal.css';
import { auth } from '../../firebase';


const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  // states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);


  // sign up function
  const signUp = (event) => {
    event.preventDefault();

    // auth
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => { 
        return authUser.user.updateProfile({
            displayName: username
        })
    })
    .catch((error) => alert(error.message));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            // User logged in
            console.log(authUser);
            setUser(authUser);

        } else {
            // logged out
            setUser(null);
        }
    })

    return () => {
        // perform some cleanup actions
        unsubscribe();
    }
  }, [user, username]);

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='modal-flex'>
            {children}

            <div className='input-field'>
                {user ? (
                    <button type='submit' className='sign-up-modal' onClick={() => auth.signOut()}>
                    Logout
                    </button>
                ):(
                    <form className='app__signup' action="">
                        
                        <input type="text"
                        className='modal-username'
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />

                        
                        <input type="text"
                        className='modal-email'
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        
                        <input type="password"
                        className='modal-password'
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />


                        <br/>

                        <button type='submit' className='sign-up-modal' onClick={signUp}>
                            Sign Up
                        </button>
                    </form>
                )}


                {/**Button to close */}
                <button className='close-button' type="button" onClick={handleClose}>
                Close
                </button>
            </div>
        </div>
        
      </section>
    </div>
  );
};

export default Modal
