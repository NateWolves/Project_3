import React from 'react';

function Header() {
    return (
        <div id="header">
            <Title />
            <UserBtn />
        </div>
    )
}

function Title() {
    return (
        <div id="title" >Compass</div>
    )
}

function UserBtn() {
    return (
        <div id="userBtn" >Login</div>
    )
}

export default Header;