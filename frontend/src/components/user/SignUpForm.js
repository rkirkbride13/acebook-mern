import React, { useState } from 'react';
import PropTypes from "prop-types"

const SignUpForm = ({ navigate }) => {

  SignUpForm.propTypes = {
    navigate: PropTypes.func,
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, username: username })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup');
          console.log(response.json().error)
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

    return (
    <>
      <div className="titlecenter">
        <h2 className='title'>  Welcome to acebook! </h2>
      </div>
      <div className="signupform">
        <form onSubmit={handleSubmit}>
            <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
            <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
            <input placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} />
          <input id='submit' type="submit" value="Submit" />
        </form>
      </div>
      </>
    );
}

export default SignUpForm;
