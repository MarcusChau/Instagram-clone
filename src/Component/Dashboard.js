import React, { Component } from "react";
import Modal from './Modal/Modal.js';
import './Dashboard.css';


class Dashboard extends Component {
    
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
            <p className="comment">Sign up to view and upload photos</p>
        </Modal>

        {/**Buttons for sign in or out*/}

        <button className="dashboard-sign-up" type="button" onClick={this.showModal}>
        Sign up
        </button>
      </main>
      
    );
  }
}

export default Dashboard
