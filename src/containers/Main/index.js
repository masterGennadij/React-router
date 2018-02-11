import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import AddPropsToRoute from '../../utils/AddPropsToRoute';
import Login from '../../components/Auth/Login/';
import Register from '../../components/Auth/Register/';
import Content from '../../components/Content';
import Header from '../../components/Header';
import Repo from '../../components/Content/Repo';

class Main extends Component {
    state = {
        isLogged:false,
        fireRedirect: false,
        repos: [],
        repoInfo: {}
   
    }
    
    componentWillMount () {      
        if(localStorage.getItem('isLogged') && !this.state.isLogged) {
            this.setState({isLogged: true});
        }
    }
  
    onSearchHandler = (e) => {
        e.preventDefault();
        if(e.target.searchValue.value.length > 2) {
         let user =  e.target.searchValue.value;
        fetch(`https://api.github.com/users/${user}/repos`)
        .then(response => response.json())
        .then(data => {               
            this.setState({repos: data});    
           
        })
        .catch( err =>console.log(err));
        }     
    }
    registerHandler = (e) => { 
        e.preventDefault(); 
        const body = JSON.stringify({
            email : e.target.email.value,
            password : e.target.password.value 
        })
        const options = {
            method: 'POST',
            headers: {  
                "Content-type": "application/json"  
              },  
            body            
        }        
        fetch('https://reqres.in/api/register', options)
        .then(response => response.json())
        .then(data => {        
            localStorage.setItem('token', data.token); 
            this.setState({fireRedirect: true});         
           
        })
        .catch( err =>console.log(err));
    }
   
    logInHandler = (e) => {
        e.preventDefault();
        if( localStorage.getItem('token')) {
            localStorage.setItem('isLogged', 'true');
            this.setState({isLogged: true, fireRedirect: false})
        }
    }
    logOutHandler = () => {       
            localStorage.removeItem('isLogged');
            this.setState({isLogged: false})     
    }

    render(){
        const {
            isLogged, 
            fireRedirect, 
            repos, 
            repoInfo} = this.state;
        
        return (
         <div>
          <Header 
          isLogged={isLogged}
          logOut={this.logOutHandler}/>          
            <Switch>
              <Route exact path='/' 
                     component={AddPropsToRoute(Content, 
                                { isLogged, repos,
                                search: (e) => this.onSearchHandler(e)})} />  
              <Route  path='/login' 
                      component={AddPropsToRoute(Login, 
                                  { login : (e)=>this.logInHandler(e),
                                 isLogged })}/>    
              <Route  path='/register' 
                      component={AddPropsToRoute(Register,
                                { register : (e)=>this.registerHandler(e),
                                fireRedirect })}/>  
               <Route path="/user/:username/:repo" component={AddPropsToRoute(Repo,
                                { setRepoInfo: this.setRepoInfo,
                                repoInfo })} />                         
            </Switch>
        </div>
        )
    }
}

export default Main; 