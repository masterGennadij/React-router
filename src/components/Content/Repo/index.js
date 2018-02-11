import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Repo extends Component { 
    state = {
        repoInfo: {}
    }
    componentDidMount(){
        const {username, repo } = this.props.match.params
        fetch(`https://api.github.com/repos/${username}/${repo}`)
        .then(response => response.json())
        .then(data => {
            this.setState({repoInfo: data});  
        })
        .catch( err =>console.log(err));         
    }
    render(){
        const {username, repo } = this.props.match.params;
        const repoInfo = this.state.repoInfo;
        return (
        <div>
            <Link to='/'>Back</Link>
            <h1>{username}/{repo}</h1>  
            <div>
                <p>Created at: {repoInfo.created_at} </p>
                <p>Description: {repoInfo.description} </p>
                <p>Private: {(repoInfo.private)?'true':'false'} </p>
            </div>
       </div>
    ) 
    }
   
}

export default Repo;