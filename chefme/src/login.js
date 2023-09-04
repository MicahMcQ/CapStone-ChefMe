import React from 'react'

function Login() {
  return (
<div className='loginbox'>
    <h3>Please log in</h3>
    <div id='email_input'>
        {/* <label htmlFor="email">Enter email:</label> */}
        <input type="email" id="email" name="email" placeholder='Email or Username'/>
    </div>
    <div id="password_input">
    {/* <label htmlFor="password">Enter password</label> */}
    <input type="text" id="password" name="password" placeholder='Password'/>     
    </div>
<button type="submit">Log in</button>
</div>
  )
}

export default Login
