import React, { Component } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import Header from "../elements/header";
import MessageSender from "../elements/messagesender";
import Post from "../elements/post";
import './muro.css'
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
            post:{},
            posts:[]
        }
        this.handleAddPost.bind()
    }

    componentDidMount(){
        const sessionStr = localStorage.getItem("session")
        const sessionJson = JSON.parse(sessionStr)
        const userId = sessionJson.user._id
        fetch('/inicio/posts/'+userId+'/')
        .then(response => response.json())
        .then(data => this.setState({posts:data.posts}),
       );
    }

    handleAddPost = addPost => {
        fetch("/inicio/posts/",{
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(addPost),
          withCredentials: "include"
      }).then(res=>res.json()).then(data=>this.setState({
        post: data.post,
        posts:[data.post,...this.state.posts]
      }))
      
    };

    render(){
        if(!this.state.loggedIn){
            return <Redirect to = "/"/>
        }

        const postList = this.state.posts.map(post =><Post key={post._id}
                                                        message={post.message}
                                                        timestamp={post.timestamp}
                                                        username={post.username}
                                                        image={post.imageUrl}
                                                    />)
        return(
            <div>
                <Header title="Inicio"/>
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