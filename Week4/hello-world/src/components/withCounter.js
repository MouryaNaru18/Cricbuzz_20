import React from "react";

const UpdatedComponent = OriginalComponent =>{
    class NewComponent extends React.Component{
        constructor(props) {
            super(props)
          
            this.state = {
               count: 0
            }
          }
          increment = () =>{
            this.setState(prevState =>{
                return {
                    count: prevState.count+1
                }
            }
            )
          }
        render(){
            return <OriginalComponent count = {this.state.count} increment = {this.increment}{...this.props}></OriginalComponent>
        }
    }
    return NewComponent
}

export default UpdatedComponent