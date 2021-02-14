import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../elements/header'
import UserList from '../elements/userlist'

export default class People extends Component {
    constructor(props){
        super(props)
        const sessionStr = localStorage.getItem("session")
        const sessionJson = JSON.parse(sessionStr)
        let loggedIn
            if(sessionStr == null)
                loggedIn = false
            else
                loggedIn = sessionJson.loggedIn

        this.state = {
            loggedIn,
            user:{}
        }
        this.add_friend.bind()
        this.remove_friend.bind()
    }

    add_friend = friend=>{
        const sessionStr = localStorage.getItem("session")
        const sessionJson = JSON.parse(sessionStr)
        const userId = sessionJson.user._id
        fetch(`/users/${userId}/friends/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friend),
            withCredentials: "include"
        }).then(res=>res.json())
        .then(data => {
            localStorage.setItem("session", JSON.stringify(data))
            this.setState({user:data.user})
        })
      }
    
    remove_friend = friendId =>{
        const sessionStr = localStorage.getItem("session")
        const sessionJson = JSON.parse(sessionStr)
        const userId = sessionJson.user._id
        fetch(`/users/${userId}/friends/${friendId}/`,{method: "DELETE"}).then(res=>res.json())
        .then(data => {
            localStorage.setItem("session", JSON.stringify(data))
            this.setState({user:{}})
        })
      }

    render() {
        if(!this.state.loggedIn){
            return <Redirect to = "/"/>
        }
        return (
            <div>
                <Header title="Personas"/>
                <div className="inicio">
                    <div className="feed">
                        <UserList user={this.state.user} add_friend={this.add_friend} remove_friend={this.remove_friend}/>
                    </div>
                </div>
            </div>
        )
    }
}
