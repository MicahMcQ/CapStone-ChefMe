import React from 'react'

function Home() {
  return (
    <div>
      <label  htmlFor='ingr'>Enter one ingredient</label>
      <input type='text' name="ingr" id="ingr" placeholder='E.g: Eggs'/>
    </div>
  )
}

export default Home
