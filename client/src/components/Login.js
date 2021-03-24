import React, {useContext} from 'react'
import db from "../firebase";
import { actionTypes } from "../reducer";
import { auth, provider} from "../firebase";
import { GlobalContext } from "../GlobalProvider";

const Login = ({size}) => {
  const [{userInfo, usersList}, dispatch] = useContext(GlobalContext);
  console.log(userInfo, 'user in login')
  const signIn = () => {
    auth
    .signInWithPopup(provider)
    .then(result => {
      dispatch({
        type: actionTypes.SET_USER_INFO,
        payload: result.user
      });
      db.collection('users').doc(result.user.uid).get()
      .then((doc) => {
        if (!doc.exists) {
           return db.collection('users').doc(result.user.uid)
             .set({
                name: result.user.displayName,
                theme: 'dark',
                id: result.user.uid
           });
        } else {
           return db.collection('users').onSnapshot(snapshot => (
              snapshot.docs
              .filter(doc => doc.data().name === result.user.displayName ?
              dispatch({
                type: actionTypes.SET_THEME,
                theme: doc.data().theme
              })
                : null
              )
           ))

        }
      }).then(() => {
        db.collection('users').onSnapshot(snapshot => (
          dispatch({
            type: actionTypes.SET_USERS_LIST,
            payload: ( snapshot.docs.map(doc => ({
              id: doc.id,
              name: doc.data().name
            })))
          })
        ))
      })
  })
}

  return (
    <>
    {size === 'small' ?
    (
      <button type="submit" onClick={signIn} className="login__button">
        Login
      </button>
    )
    :
    (
      <button type="submit" onClick={signIn} className="login__button-big">
        Login
      </button>
    )
    }
    </>    
  )
}

export default Login
