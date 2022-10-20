import { useEffect, useState } from 'react';
import './signInModal.css';
import { auth } from '../../firebase';


const SignInModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const signIn = (event) => {
    event.preventDefault();

    auth.
    signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='modal-flex'>
            {children}

            <div className='input-field'>
              <form className='app__signup' action="">

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

                  <button type='submit' className='sign-in-modal' onClick={signIn}>
                      Login
                  </button>
              </form>

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

export default SignInModal
