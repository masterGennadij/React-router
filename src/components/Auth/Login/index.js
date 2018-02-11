import React from 'react';
import { Redirect} from 'react-router-dom';

const Login = (props) => {    
    const {login, isLogged} = props.passedProps;
    const message = (props.location.afterRegister)?<h2> Now, you can log in </h2>:'';
    return (
        isLogged? 
        <Redirect
          to={{
            pathname: "/"
          }}
        /> : 
        <form onSubmit={login}>
            <h1>Login</h1>
              {message}
            <input type="email" />
            <input type="password" />
            <input type="submit" value="submit" />
        </form>    
    )
}

export default Login;