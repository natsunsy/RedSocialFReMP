import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcon from 'react-icons/io';
import * as IoIcons from 'react-icons/io5';

export const SidebarData = [
    {
        title: 'Inicio',
        path: '/inicio',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Diario',
        path: '/diario',
        icon: <IoIcons.IoJournal/>,
        cName: 'nav-text'
    },
    {
        title: 'Cerrar Sesión',
        path: '/',
        onClick:()=>{localStorage.removeItem("session")},
        icon: <IoIcon.IoMdLogOut/>,
        cName: 'nav-text'
    },
]