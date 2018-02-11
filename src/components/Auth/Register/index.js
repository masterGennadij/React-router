import React from 'react';
import { Redirect} from 'react-router-dom';

const Register = (props) => {
    const {register, fireRedirect} = props.passedProps;
    return (
        fireRedirect? 
        <Redirect
          to={{
            pathname: "/login",
            afterRegister: true  
          }}
        /> : 
        <form onSubmit={register}>
            <h1>Register </h1>
            <input name="email" type="email" />
            <input name="password" type="password" />
            <input type="submit" value="submit" />
        </form>    
    )
}

export default Register;