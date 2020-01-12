import React, { Component } from 'react'
import './loginButton.css'
class LoginButton extends Component {

  onHandleLogin() {
    const popupWindow = window.open(process.env.REACT_APP_API_URL + '/auth/steam', '_blank', 'width=800, height=600');
    if (window.focus) popupWindow.focus();
  }

  componentDidMount() {
    window.addEventListener('message', event => {
      if (event.origin !== process.env.REACT_APP_API_URL) return;

      const { token, ok } = event.data;

      if (ok) {
        localStorage.setItem('authToken', token);
        console.log(token);
        this.props.view();
      }
    });
  }

  render() {
    return (
      <div className="signIn">
        <img
          onClick={this.onHandleLogin}
          src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
          alt="Login with Steam"
        />
      </div>
    );
  }

// render() {
//     return (
//         <p>Test from home</p>
//     )
// }

}

export default LoginButton