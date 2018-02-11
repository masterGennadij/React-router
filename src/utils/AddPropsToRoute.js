import React, {Component} from 'react';

const AddPropsToRoute = (WrappedComponent, passedProps)=>{
    return (
        class extends Component{
            render(){
                let props = {...this.props,  passedProps}        
                return  <WrappedComponent {...props} />
            }
        }
    )
}

export default AddPropsToRoute