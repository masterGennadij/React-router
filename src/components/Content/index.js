import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Content extends Component {
    render(props){
        const {isLogged, search, repos} = this.props.passedProps;
        return (
          (!isLogged)?
            <div>You have to  
                <Link to='/login'>Login</Link> or 
                <Link to='/register'>Register</Link> to view content.
            </div> :
            <div>
                <h1> Github Search </h1>
                <form onSubmit={search}>
                <input name="searchValue" type="text"/>
                <input  type="submit" value="search"/>
                </form>                
                    {
                        (repos.length)?repos.map(repo => {
                            return (
                            <p key={repo.id}>                              
                                <Link  to={{pathname:`/user/${repo.owner.login}/${repo.name}` }}>{repo.name}</Link>
                            </p>  
                            )    
                        }):''
                    }
                      
                   
                
            </div>
        
        )
    }
}

export default Content; 