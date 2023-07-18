import React, { Component } from 'react'
import ChildComponent from './ChildComponent'

export class ParentComponent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         parentName: 'Parent'
      }
    }
    greetParent = (childName) => {
        alert(`Hello ${this.state.parentName} from ${childName}`)
    }
  render() {
    return (
      <div>
        {/* <button onClick={this.greetParent}>Greet Parent</button> */}
        <ChildComponent greetHandler = {this.greetParent}></ChildComponent>
      </div>
    )
  }
}

export default ParentComponent
