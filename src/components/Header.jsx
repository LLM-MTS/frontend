import React from 'react';
import './Header.css';
import { mts_logo, profile_photo } from '../assets/imports.js';
export default function Header() {
  return (
    <header className="header">
      <div style={{display: 'flex', alignItems: 'center'}}> 
        <img src={mts_logo} alt="Logo" className="logo" />
        <h2>Smart Assistant</h2>
      </div>
      
      <nav className='navigation'>
        <ul>
          <li><a href="#agents">Agents</a></li>
          <li><a href="#chat">Profile</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
        <div className="profile">
          <img src={profile_photo} alt="Profile" className="profile-photo" />
          {/* <span className="profile-name">Имя Фамилия</span> */}
        </div>
      </nav>
    </header>
  );
}