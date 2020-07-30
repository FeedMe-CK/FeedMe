import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import img from './Landing.png';

export default class landinPage extends Component {
  render() {
    return (
      <>
        <h1 className='display-2 text-center'>Welcome to FeedMe</h1>
        <div className='text-left d-sm-flex align-items-sm-center align-items-lg-center'>
          <img src={img} width='55%' />
          <div className='text-center d-lg-flex flex-column justify-content-lg-end align-items-lg-center'>
            <h3>Login or Signup to explore the menu and place your order</h3>
            <Link to='/menu'>
              <button className='btn btn-primary text-center' type='button'>
                Menu
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
