import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './user.css'
import PropTypes from 'prop-types'

const dp1 = require('./images/dp1.jpeg') // adds image

const UserProfile = ({ navigate }) => {

  UserProfile.propTypes = {
    navigate: PropTypes.func
  }

  const [user, setUser] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const { id } = useParams();

  useEffect(() => {
    if(token) {
      fetch("/users", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'User_ID': `${id}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setUser(data.user);
        })
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const feed = () => {
    navigate('/posts')
  }
  
  return (
    <>
    <div className="img" > 
      <img src={dp1} alt="dp1" /> 
    </div>
    
    <div className="center">
      <h2 data-cy="user"> {user.username}s profile! </h2> 
      <h3> your posts </h3>
    </div>

    <div className="topcorner"> 
      <button onClick={feed}>
      feed 
      </button>
      <button  onClick={logout}>
      logout
      </button> 
    </div>
    
    
    
    
    </>
  );

};

export default UserProfile;