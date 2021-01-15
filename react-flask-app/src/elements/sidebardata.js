import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
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
        icon: <IoIcons.IoJournalOutline/>,
        cName: 'nav-text'
    },
]