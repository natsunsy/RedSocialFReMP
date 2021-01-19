import React from "react";
import Navbar from './navbar';
import './header.css';
export default function Header({title}) {
    return (
    <div className="header">
        <Navbar title={title}/>
    </div>
    );
}