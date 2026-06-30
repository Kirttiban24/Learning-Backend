import React from 'react'
import '../style/form.scss'

const Login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form>
                <input type="text" name='username'
                placeholder='Enter Username' />
                <input type="password" name='password'
                placeholder='Enter Password' />
                <button type="submit">Submit</button>
            </form>
        </div>
    </main>
  )
}

export default Login
