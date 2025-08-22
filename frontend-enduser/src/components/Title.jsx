import React from 'react'

export const Title = () => {
    return (
        <div className="navbar">
            <ul className="nav-left">
                <li>SHOP</li>
                <li>TOP ▾</li>
                <li>BOTTOM ▾</li>
                <li>ACCESSORIES</li>
            </ul>

            <div className="logo">nocturnal®</div>

            <div className="nav-right">
                <span>MEMBERSHIP & REWARD</span>
                <span>LOGIN / REGISTER</span>
                <span className="icon">🔍</span>
                <span className="icon">🛒 0đ</span>
            </div>
        </div>
    )
}
e