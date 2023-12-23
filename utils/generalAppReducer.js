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
    default:
      return state;
  }
}
