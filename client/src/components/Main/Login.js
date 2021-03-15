import React, {useContext} from 'react'
import db from "../../firebase";
import { actionTypes } from "../../reducer";
import { auth, provider} from "../../firebase";
import { GlobalContext } from "../../GlobalProvider";

const Login = () => {
  const [{userInfo}, dispatch] = useContext(GlobalContext);
  console.log(userInfo, 'user in login')
  const signIn = () => {
    auth
    .signInWithPopup(provider)
    .then(result => {
      dispatch({
        type: actionTypes.SET_USER_INFO,
        payload: result.user
      });
  })
}

  return (
      <div className="">
      <div className="login__container">
        <div className="login__text">
          <h1>Sign in to Chat</h1>
        </div>

        <button type="submit" onClick={signIn} className="login__button">
          SignIn with Google
        </button>
      </div>
    </div>
  )
}

export default Login
