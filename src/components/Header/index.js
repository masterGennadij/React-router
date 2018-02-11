import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
    return (
        !props.isLogged?
       <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>  
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </ul>
      </nav>
      :
      <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>  
        <li onClick={props.logOut}>Logout</li>
      </ul>
    </nav>
    )
}

export default Header;