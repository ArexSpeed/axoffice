const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

export const initialState = {
  userInfo: userInfoFromStorage,
  theme: "light",
  usersList: []
};

export const actionTypes = {
  SET_USER_INFO: "SET_USER_INFO",
  SET_THEME: "SET_THEME",
  SET_USERS_LIST: "SET_USERS_LIST"
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      };
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case actionTypes.SET_USERS_LIST:
      return{
        ...state,
        usersList: action.payload
      }

    default:
      return state;
  }
};

export default reducer;