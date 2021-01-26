import React from 'react';
import './header.css';

const userDetails = {
    name: "",
    password: "",
    id: 0
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: false,
            loggedIn: false,
            user: userDetails
         }
    }

    componentDidMount() {
        const userName = localStorage.getItem('username');
        const passWord = localStorage.getItem('password');
        const id = localStorage.getItem('id');
        userDetails.name = userName;
        userDetails.password = passWord;
        userDetails.id = id;
        this.setState({
            user: userDetails
        })
        if (this.state.user.id === null) {
            this.setState({
                loggedIn: false
            })
        } else {
            this.setState({
                loggedIn: true
            })
        }
    }

    handleActive = () => {
        this.state.active === false ?
        this.setState({
            active: true
        }) :
        this.setState({
            active: false
        });
    }


    handleLogin = () => {
        this.state.loggedIn === false ?
        this.setState({
            loggedIn: true
        }) :
        this.setState({
            loggedIn: false
        });
        userDetails.id = Math.floor(Math.random() * 1000);
        this.setState({
            user: userDetails
        });
        localStorage.setItem('username', userDetails.name);
        localStorage.setItem('password', userDetails.password);
        localStorage.setItem('id', userDetails.id);
    }

    handleUsername = (event) => {
        event.preventDefault();
        const nameValue = event.target.value;
        userDetails.name = nameValue;
    }

    handlePassword = (event) => {
        event.preventDefault();
        const passwordValue = event.target.value;
        userDetails.password = passwordValue;
    }

    handleLoginAndActive = () => {
        this.handleActive();
        this.handleLogin();
    }

    handleLogout = () => {
        this.setState({
            loggedIn: false
        });
        this.setState({
            user: {}
        });
    }

    render() { 
        console.log(this.state.user)

        return ( 
            <div className={this.state.active === false ? "header" : "header active"}>
                <div onClick={this.handleActive} className="burger-btn">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className="content">
                    <div className="options">
                        <img src="settings.png" alt="profile icon"/>
                    </div>
                    <div className="input-wrapper">
                        <input type="text" />
                        <div className="border-bottom"></div>
                    </div>
                    <div onClick={this.handleActive} className="profile">
                        <p className={this.state.loggedIn === false ? "login-text" : "login-text active"}>
                            Hello {this.state.user.name}!</p>
                        <img src="profile-icon.svg" alt="profile icon"/>
                    </div>
                    <div className={this.state.active === false ? "login" : "login active"}>
                        <div className={this.state.loggedIn === true ? "inner-container" : "inner-container active"}>
                            <h3>Login to your account</h3>
                            <input onChange={this.handleUsername} type="text"/>
                            <input onChange={this.handlePassword} type="password"/>
                            <button onClick={this.handleLoginAndActive}>Login</button>
                        </div>
                        <div className={this.state.loggedIn === false ? "logged-in" : "logged-in active"}>
                            <p>Logged in as {this.state.user.name}</p>
                            <button onClick={this.handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}
 
export default Header;