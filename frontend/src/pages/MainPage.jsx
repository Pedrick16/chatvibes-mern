import React, { useEffect } from 'react'
import './styles/MainPage.scss'
import { BsSearch } from 'react-icons/bs';
import { CgLogOut } from 'react-icons/cg';

import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


import heart from '../img/heart-updated.png'

const MainPage = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  
  console.log(user)

  // useEffect(() => setUser(user || ""), [user]);

  const logoutUser = async() => {
    try {
      await axios.post('/logout')
      setUser(null)
      navigate('/')
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className='__main-page'>
      <div className="__sidebar">
          <div className="__logo">
            <img src={heart} alt="" height={40} width={40} />
            <span>ChatVibes</span>
          </div>
          <div className='search-name'>
            <input type="search" className='form-control' placeholder='search here' />
            <BsSearch  className='search-btn' style={{ width: '30px', height: '20px', cursor:'pointer', position:'relative', right:'35px', color:'gray'}} />
          </div>




          <div className="chat-people-list">
            <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>

           
            
            </div>
             <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
            
            
            </div>
            <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
       
            
            </div>
             <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
            
            
            </div>
              <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
            
            
            </div>
            <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
       
            
            </div>
             <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
            
            
            </div>
              <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
            
            
            </div>
            <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
       
            
            </div>
             <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
            
            
            </div>
             <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
       
            
            </div>
             <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
            
            
            </div>
            <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
       
            
            </div>
             <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
            
            
            </div>
              <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
            
            
            </div>
            <div className="people-container">

                <img src="" alt="" />
                <span>Pedrick Divinagracia</span>
       
            
            </div>
       
     
            
          </div>




      </div>

      <div className="__content">
        <div className="__header-section">
          <span>{user ? user.name : 'Guest'}</span>
        <CgLogOut onClick={logoutUser} style={{ width: '40px', height: '30px', marginLeft: '5px', cursor:'pointer'  }}/>

        </div>
      </div>

    </div>
  )
}

export default MainPage