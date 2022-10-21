import React, { Component } from "react";
import Modal from './Modal/signInModal';
import '../css/SignIn.css';


class SignIn extends Component {
    
  constructor() {
    super();
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <main>
        {/**The messages inside the Modal */}
        <Modal show={this.state.show} handleClose={this.hideModal}>
            <p className="logo">Instagram</p>
        </Modal>

        {/**Buttons for sign in or out*/}

        <button className="dashboard-sign-in" type="button" onClick={this.showModal}>
        Login
        </button>
      </main>
      
    );
  }
}


export default SignIn
