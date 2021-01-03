import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  searchTerm: '',
  currentUser: null,
  userDisplayName: null,
};
const mutations = {};
const actions = {};
const modules = {};
const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
})
