import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from "../components/post/Post";
import './user.css'
import PropTypes from 'prop-types'

const dp1 = require('./images/dp1.jpeg') // adds image

const UserProfile = ({ navigate }) => {

  UserProfile.propTypes = {
    navigate: PropTypes.func
  }

  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({});
  const [description, setDescription] = useState("");
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

  useEffect(() => {
    if(token) {
      fetch("/posts/user/", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'User_ID': `${id}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(user)

    let response = await fetch( `/users/${user._id}`, {
      method: 'patch',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: description })
    })
    
    let data = await response.json()

    if (response.status !== 201) {
      console.log("description NOT added")

    } else {
      console.log("description added")
      window.localStorage.setItem("token", data.token)
      setToken(window.localStorage.getItem("token"))
      setDescription("")}
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  
  return (
    <>
    <nav id="nav"> 
      <h1>Acebook</h1>      
      <h2 data-cy="user">{user.username}&apos;s profile!</h2>
      <div>
        <button onClick={feed}>Feed</button>
        <button onClick={logout}>Logout</button>
      </div>
    </nav> 
    <div className="img" > 
      <img src={dp1} alt="dp1" /> 
    </div>
    <div>
      <h3> about you </h3>
        <div>
          {user.description}
        </div>
      <form onSubmit={handleSubmit}>
      <textarea placeholder="About you: DOB, Occupation, Relationship Status, Hobbies..." id="description" type='text' value={ description } onChange={handleDescriptionChange} />
      <button data-cy="submitButton" id="submitButton" type="submit" value="Submit">Submit</button>
      </form>
    </div>
    <div className="center">
      <h3> your posts </h3>
    </div>
    
    <div data-cy="post">
        {posts.map((post) => <Post post={post} token={token} setToken={setToken} key={post._id} post_id={post._id} setPosts={setPosts}/>).reverse()}
    </div>
    </>
  );

};

export default UserProfile;