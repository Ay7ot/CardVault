export function generalAppReducer(state, action) {
  switch (action.type) {
    case "setUserSession":
      return {
        ...state,
        session: action.payload.sessionPayload,
      };
    case "setUser":
      return {
        ...state,
        user: action.payload.userPayload,
      };
    case "setIsNewUser":
      return {
        ...state,
        isNewUser: action.payload.isNewUserPayload,
      };
    default:
      return state;
  }
}
