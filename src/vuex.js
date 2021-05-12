import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  user: null,
  formations: []
}

const store = new Vuex.Store({
  state,
  getters: {
    user: (state) => {
      return state.user;
    },
    formations: (state) => {
      return state.formations;
    }
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
    deleteFormation(context,formationToRemove){
      const newValue =  state.formations.filter((formation)=>formation !== formationToRemove);
      console.log(newValue);
     context.commit("deleteFormation",newValue);
    },
    addFormation(context,formationToAdd){
      context.commit("addFomration",formationToAdd);
    },
    async setFormations(state) {
      const response = await axios.get("formations");
      console.log(response.data);
      state.commit("setFormations", response.data);
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    deleteFormation(state,newValue){
      state.formations = newValue;
      
    },
    addFormation(state,formationToAdd){
      state.formations.push(formationToAdd)
    },
    setFormations(state, formations) {
      state.formations = formations.data;
    }
  }
});

export default store;
