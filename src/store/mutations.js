import { errorMessage } from "../utils";

const mutations = {
  message(state, payload) {
    state.message = errorMessage(payload[0]);
    state.utils.snack = true;
    state.utils.type = payload[1];
    setTimeout(
      () => {
        state.utils.snack = false;
      },
      payload[1] === "error" ? 10000 : 5000
    );
  },
  request(state, payload) {
    // payload[0] = state, payload[1] = data
    const stateObject = payload[0];
    state[stateObject] = payload[1];
  },
};

export default mutations;
