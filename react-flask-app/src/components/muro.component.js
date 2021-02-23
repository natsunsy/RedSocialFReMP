import React, { Component } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import Navbar from "../elements/navbar";
import MessageSender from "../elements/messagesender";
import Post from "../elements/post";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import es from 'javascript-time-ago/locale/es'
import './muro.css'
TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(en)


export default class Muro extends Component{
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
            posts:[]
        }
        this.handleAddPost.bind()
        this.handleRemovePost.bind()
    }

    componentDidMount(){
        const sessionStr = localStorage.getItem("session")
        if(sessionStr != null){
        const sessionJson = JSON.parse(sessionStr)
        const userId = sessionJson.user._id
        fetch('https://red-social-fc.herokuapp.com/inicio/posts/'+userId+'/')
        .then(response => response.json())
        .then(data => this.setState({posts:data.posts}),
       );}
    }

    handleAddPost = addPost => {
        fetch("https://red-social-fc.herokuapp.com/inicio/posts/",{
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(addPost),
          withCredentials: "include"
      }).then(res=>res.json()).then(data=>this.setState({
        posts:[data.post,...this.state.posts]
      }))
      
    };

    handleRemovePost= id =>{
        const sessionStr = localStorage.getItem("session")
        const sessionJson = JSON.parse(sessionStr)
        const userId = sessionJson.user._id
        fetch('https://red-social-fc.herokuapp.com/inicio/posts/'+userId+'/'+id,{method:'DELETE'})
        const new_posts = this.state.posts.filter(post => post._id !== id)
        this.setState({posts:new_posts})
      }

    render(){
        if(!this.state.loggedIn){
            return <Redirect to = "/"/>
        }
        const postList = this.state.posts.map(post =><Post key={post._id}
                                                        id = {post._id}
                                                        userId = {post.userId}
                                                        message={post.message}
                                                        timestamp={post.timestamp}
                                                        username={post.username}
                                                        image={post.imageUrl}
                                                        feeling={post.feeling}
                                                        handleRemovePost={this.handleRemovePost}
                                                    />)
        return(
            <div>
                <Navbar title="Inicio"/>
                <div className="inicio">
                    <div className="feed">
                        <MessageSender handleAddPost={this.handleAddPost}/>
                        {postList}
                    </div>
                </div>
            </div>
        )
    }
}