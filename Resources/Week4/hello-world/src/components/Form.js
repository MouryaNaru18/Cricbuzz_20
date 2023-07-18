import React, { Component } from 'react'

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            comments: '',
            topic:"react"
        }
    }
    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleComments = (event) => {
        this.setState({
            comments: event.target.value
        })
    }
    handleTopic = (event) =>{
        this.setState({
            topic: event.target.value
        })
    }
    handleSubmit = event => {
        alert(`${this.state.username} \n ${this.state.comments} \n ${this.state.topic}`)
        event.preventDefault()
    }
    render() {
        const {username, comments, topic} = this.state;
        return (
            <div>
                <div>
                    Form Component
                </div>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Username: </label>
                        <input type='text' defaultValue={username} onChange={this.handleUsernameChange}></input>
                    </div>
                    <br></br>

                    <div>
                        <label>Comments: </label>
                        <textarea defaultValue={comments} onChange={this.handleComments}></textarea>
                    </div>
                    <br></br>

                    <div>
                        <label>Topic: </label>
                        <select defaultValue={topic} onChange={this.handleTopic}>
                            <option value="react"> React</option>
                            <option value="angular"> Angular</option>
                            <option value="Vue"> vue</option>
                        </select>
                    </div>
                    <br></br>

                    <div>
                        <button type = "submit">Submit </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form
