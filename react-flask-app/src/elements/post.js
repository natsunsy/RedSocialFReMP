import { Avatar } from "@material-ui/core";
import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import NearMeIcon from "@material-ui/icons/NearMe";
import {ExpandMoreOutlined} from "@material-ui/icons";
import "./post.css";

export default function Post({profilePic, image, username, timestamp, message}) {
    return (
    <div className="post">
        <div className="post__top">
            <Avatar srd={profilePic}
            className="post__avatar"/>
            <div className="post__topInfo">
                <h3>{username}</h3>
                <p>Timestamp...</p>
            </div>
        </div>

        <div className="post__bottom">
            <p>{message}</p>
        </div>

        <div className="post__image">
            <img src={image} alt=""/>
        </div>

        <div className="post__options">
            <div className="post__option">
                <ThumbUpIcon />
                <p>Me gusta</p>
            </div>
            <div className="post__option">
                <ChatBubbleOutlineIcon />
                <p>Comentar</p>
            </div>
            <div className="post__option">
                <NearMeIcon />
                <p>Compartir</p>
            </div>
            <div className="post__option">
                <AccountCircleIcon />
                <ExpandMoreOutlined />
            </div>
        </div>
    </div>
    );
}