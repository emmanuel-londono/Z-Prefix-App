//Imports
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import { ApplicationContext } from '../App';
import Cookies from 'js-cookie';

//Style Imports
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import '../css/NaviBar.css'
import HomeIcon from '@mui/icons-material/Home';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';



export const VisitorNaviBar = () => {

const [back, setBack] = useState('Log In?')
const navigate = useNavigate();
const {loggedIn, setLoggedIn} = useContext(ApplicationContext)


const clickLogOut = () => {

     setLoggedIn(false)
     Cookies.remove('session_id')
     navigate('/')
}



    return (
        <Nav className="col-md-12 d-none d-md-block sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        ><div className='logo'>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="300.000000pt" height="75pt" viewBox="200 0 300.000000 164.000000" style={{paddingTop:'20px', marginTop:'25px'}}
                    preserveAspectRatio="xMidYMid meet">
                    <metadata>
                        Created by potrace 1.10, written by Peter Selinger 2001-2011
                    </metadata>
                    <g transform="translate(0.000000,164.000000) scale(0.050000,-0.050000)"
                        fill="#eef0f2" stroke="none">
                        <path d="M2480 2922 l-510 -294 -5 -602 -6 -602 176 -102 175 -102 6 170 c3
93 10 170 16 170 96 0 128 -61 128 -246 l1 -184 262 -150 c144 -82 271 -147
282 -144 11 3 132 70 268 149 l247 144 0 181 c0 178 1 180 59 213 77 44 81 37
81 -146 0 -87 7 -156 15 -155 8 0 87 43 175 95 l160 93 0 609 0 609 -400 232
c-220 127 -449 260 -510 294 l-110 62 -510 -294z"/>
                        <path d="M760 330 l0 -190 60 0 60 0 0 190 0 190 -60 0 -60 0 0 -190z" />
                        <path d="M960 330 c0 -188 0 -190 49 -190 44 0 49 9 55 95 l6 95 66 -95 c53
-77 77 -95 125 -95 l59 0 0 190 0 190 -60 0 c-59 0 -60 -2 -61 -105 l0 -105
-64 105 c-53 86 -75 105 -120 105 l-55 0 0 -190z"/>
                        <path d="M1370 460 c7 -33 29 -117 48 -185 l35 -125 89 -6 88 -6 46 176 c55
216 56 206 -14 206 -55 0 -58 -5 -87 -145 -31 -154 -40 -151 -75 30 -22 110
-26 115 -83 115 -57 0 -59 -4 -47 -60z"/>
                        <path d="M1760 330 l0 -190 140 0 c127 0 140 4 140 40 0 33 -13 40 -80 40 -67
0 -80 7 -80 40 0 32 13 40 70 40 49 0 70 9 70 30 0 21 -21 30 -70 30 -57 0
-70 8 -70 40 0 33 13 40 80 40 67 0 80 7 80 40 0 36 -13 40 -140 40 l-140 0 0
-190z"/>
                        <path d="M2100 330 c0 -188 0 -190 49 -190 44 0 49 9 55 95 l6 95 60 -94 c51
-81 70 -95 125 -95 l65 -1 0 190 0 190 -59 0 c-57 0 -59 -4 -65 -104 l-6 -103
-64 103 c-50 81 -76 104 -115 104 l-51 0 0 -190z"/>
                        <path d="M2493 507 c-33 -34 -9 -67 47 -67 l60 0 0 -150 0 -150 60 0 60 0 0
150 c0 147 1 150 50 150 37 0 50 11 50 40 0 40 -289 64 -327 27z"/>
                        <path d="M2946 501 c-136 -58 -117 -320 27 -359 164 -46 257 23 257 189 0 156
-132 235 -284 170z m161 -123 c38 -106 -29 -214 -97 -158 -31 26 -42 181 -16
208 30 29 96 0 113 -50z"/>
                        <path d="M3300 332 l0 -192 60 0 c55 0 60 6 60 70 0 91 52 95 76 5 14 -55 27
-66 82 -71 71 -7 74 28 11 129 -24 37 -23 45 2 55 32 12 39 106 10 151 -13 20
-65 32 -160 38 l-141 8 0 -193z m200 68 c0 -27 -13 -40 -40 -40 -27 0 -40 13
-40 40 0 27 13 40 40 40 27 0 40 -13 40 -40z"/>
                        <path d="M3660 499 c0 -11 27 -74 60 -139 33 -65 60 -142 60 -169 0 -43 9 -51
60 -51 55 0 60 5 60 71 0 38 27 124 60 190 l61 119 -61 0 c-52 0 -65 -11 -94
-84 l-33 -83 -36 83 c-34 80 -137 127 -137 63z"/>
                        <path d="M4160 330 l0 -190 139 0 c168 0 250 98 150 181 -21 17 -24 32 -10 46
78 78 -4 153 -168 153 l-111 0 0 -190z m190 70 c0 -43 -78 -37 -87 7 -5 28 4
35 40 30 26 -4 47 -20 47 -37z m10 -140 c0 -29 -13 -40 -50 -40 -37 0 -50 11
-50 40 0 29 13 40 50 40 37 0 50 -11 50 -40z"/>
                        <path d="M4607 497 c-94 -46 -117 -220 -40 -309 68 -79 218 -79 286 0 150 174
-37 410 -246 309z m169 -153 c10 -134 -75 -201 -117 -92 -35 93 -4 191 58 184
47 -5 54 -16 59 -92z"/>
                        <path d="M4940 509 c0 -6 19 -48 42 -93 l42 -83 -42 -87 c-53 -109 -53 -106
16 -106 50 0 63 11 82 70 29 88 45 88 77 0 21 -58 36 -70 83 -70 l58 0 -41 98
-41 98 41 92 41 92 -55 0 c-44 0 -63 -15 -91 -75 l-36 -75 -30 75 c-27 66
-146 119 -146 64z"/>
                    </g>
                </svg>
            </div>

            
            <Nav.Item  onClick={()=> navigate('/visitorhome')}>
                <HomeIcon /><span> Home </span>
            </Nav.Item>
            <Nav.Item onClick={()=> navigate('/visitorusers')}>
                <SupervisedUserCircleIcon /> <span> Users </span>
            </Nav.Item>
            <Nav.Item onClick={clickLogOut}>
            <LogoutOutlinedIcon/><span>{back} </span>
            </Nav.Item>
        </Nav>

    )
}