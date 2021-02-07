import { Avatar } from "@material-ui/core";
import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import NearMeIcon from "@material-ui/icons/NearMe";
import {ExpandMoreOutlined} from "@material-ui/icons";
import "./post.css";

export default function Post({image, username, message,timestamp}) {
    return (
    <div className="post">
        <div className="post__top">
            <Avatar src="https://scontent.flim11-1.fna.fbcdn.net/v/t1.0-9/130249199_4085934954754163_3099918067762144354_n.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeHQfj-ySbhveZyUGvRhOKopRs1cdnmMOm9GzVx2eYw6b2-aJ_wuroadDOfGAB7a8Pff-r76GyKzGMExSxFU20jR&_nc_ohc=MXzxM-zn6IAAX8-bXQn&_nc_ht=scontent.flim11-1.fna&oh=1f9a0965813770f603b008be42eeb9ba&oe=602CCDBE"
            className="post__avatar"/>
            <div className="post__topInfo">
                <h3>{username}</h3>
                <p>{timestamp}</p>
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