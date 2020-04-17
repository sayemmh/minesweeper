export default (state, action) => {
  switch (action.type) {
    case "BOARD_CLOCK":
      return {
        ...state,
        display_time_clock: action.payload
      };
    default:
      return;
  }
};
