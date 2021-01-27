import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// initial state
const state = () => ({
  currentTransfer: undefined,
  quorum: undefined,
});

// getters
const getters = {
  getQuorum: (state) => state.quorum,
  getCurrentTransfer: (state) => state.currentTransfer,
};

// actions
const actions = {
  setCurrentTransfer({ commit }, currentTransfer) {
    commit("setCurrentTransfer", currentTransfer);
  },
  setQuorum({ commit }, quorum) {
    commit("setQuorum", quorum);
  },
};

// mutations
const mutations = {
  setCurrentTransfer(state, currentTransfer) {
    state.currentTransfer = currentTransfer;
  },
  setQuorum(state, quorum) {
    state.quorum = quorum;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
