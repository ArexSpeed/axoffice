export const initialState = {
  userInfo: null,
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
        theme: action.theme
      };

    default:
      return state;
  }
};

export default reducer;