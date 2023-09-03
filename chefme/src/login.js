import React from 'react'

function login() {
  return (
<div className='loginbox'>
    <h3>Please log in</h3>
    <div id='email_input'>
        <label for="email">Enter email:</label>
        <input type="email" id="email" name="email"/>
    </div>
    <div id="password_input">
    <label for="password">Enter password</label>
    <input type="text" id="password" name="password"/>     
    </div>
<button type="submit">Log in</button>
</div>
  )
}

export default login
