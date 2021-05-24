import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  user: null,
  formations: [],
  todos: [],
  events: [],
  areas1: [],
  revenu: null,
  revenuParjour: null,
  revenuGlobal: null,
  moyennePart: null
};

const store = new Vuex.Store({
  state,
  getters: {
    user: state => {
      return state.user;
    },
    formations: state => {
      return state.formations;
    },
    todos: state => {
      return state.todos;
    },
    events: state => {
      return state.events;
    },
    areas1: state => {
      return state.areas1;
    },
    revenu: state => {
      return state.revenu;
    },
    revenuParjour: state => {
      return state.revenuParjour;
    },
    revenuGlobal: state => {
      return state.revenuGlobal;
    },
    moyennePart: state => {
      return state.moyennePart;
    }
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
    async setRevenu(state) {
      const response = await axios.get("formations");
      console.log(response.data);
      let newValue = null;

      newValue = (response.data.data[response.data.data.length-1].nombreDeParticipant*response.data.data[response.data.data.length-1].tarifsParJours*response.data.data[response.data.data.length-1].nombreDeJours);

      console.log("this is newwwww value");
      console.log(newValue);
      state.commit("setRevenu", newValue);
    },
    async setRevenuParjour(state) {
      const response = await axios.get("formations");
      console.log(response.data);
      let newValue = null;

      newValue = (response.data.data[response.data.data.length-1].nombreDeParticipant*response.data.data[response.data.data.length-1].tarifsParJours);

      console.log("this is newwwww value");
      console.log(newValue);
      state.commit("setRevenuParjour", newValue);
    },
    async setRevenuGlobal(state) {
      const response = await axios.get("formations");
      console.log(response.data);
      let newValue = null;
      for (let i = 0; i < response.data.data.length; i++) {
        newValue += (response.data.data[response.data.data.length-1].nombreDeParticipant*response.data.data[response.data.data.length-1].tarifsParJours*response.data.data[response.data.data.length-1].nombreDeJours);
      }
      console.log("this is newwwww value");
      console.log(newValue);
      state.commit("setRevenuGlobal", newValue);
    },
    async setMoyennePart(state) {
      const response = await axios.get("formations");
      console.log(response.data);
      let newValue = null;
      for (let i = 0; i < response.data.data.length; i++) {
        console.log(response.data.data[i].nombreDeParticipant);
        newValue += response.data.data[i].nombreDeParticipant;
      }
      newValue = newValue / response.data.data.length;
      console.log("this is newwwww value");
      console.log(newValue);
      state.commit("setMoyennePart", newValue);
    },
    async updateProfile(context, profile) {
      const response = await axios.post("updateProfile", profile);
      console.log("this is updated profile");
      console.log(response.data.data);
      context.commit("updateProfile", response.data.data);
    },
    async updatePicture(context, picture) {
      const response = await axios.post("updatePicture", picture);
      console.log("this is updated profile");
      console.log(response.data.data);
      context.commit("updatePicture", response.data.data);
    },
    async setAreas1(state) {
      const response = await axios.get("formations");
      console.log(response.data);
      let newValue = [];
      for (let i = 0; i < response.data.data.length; i++) {
        console.log(response.data.data[i].nombreDeParticipant);
        newValue = store.state.areas1.push(response.data.data[i].nombreDeParticipant);
      }
      console.log("this is newwwww value");
      console.log(newValue);
      state.commit("setAreas1", newValue);
    },
    deleteFormation(context, formationToRemove) {
      const newValue = state.formations.filter(
        formation => formation !== formationToRemove
      );
      console.log(newValue);
      context.commit("deleteFormation", newValue);
    },
    async addFormation(context, formationToAdd) {
      const response = await axios.post("formations", formationToAdd);
      console.log("this is add formation");
      console.log(response.data.data);
      context.commit("addFormation", response.data.data);
    },
    async updateFormation(context, updatedFormation) {
      // axios call to update the formation in the database
      const response = await axios.put(
        "formations/" + updatedFormation.id,
        updatedFormation
      );
      console.log("this is update formation");
      console.log(response.data);

      let formationToUpdateIndex = state.formations.findIndex(
        formation => formation.id === updatedFormation.id
      );

      let newValue = state.formations;
      newValue[formationToUpdateIndex] = updatedFormation;
      context.commit("updateFormation", newValue);
    },
    async setFormations(state) {
      const response = await axios.get("formations");
      console.log(response.data);
      state.commit("setFormations", response.data);
    },

    async setEvents(state) {
      let newValue = [];

      const response = await axios.get("formations");

      console.log("the 1 " + newValue);

      for (let i = 0; i < response.data.data.length; i++) {
        newValue.push({
          start:
            response.data.data[i].dateDebut +
            " " +
            response.data.data[i].horaireDebut,
          end:
            response.data.data[i].dateFin +
            " " +
            response.data.data[i].horaireFin,
          title:
            response.data.data[i].title +
            " - " +
            response.data.data[i].lieuFormation,
          repeat: {
            every: "day",
            until: response.data.data[i].dateFin
          }
        });
      }
      console.log("the 2 ");
      console.log(newValue);
      state.commit("setEvents", newValue);
    },

    async setTodos(state) {
      const response = await axios.get("todos");
      console.log(response.data);
      state.commit("setTodos", response.data);
    },
    deleteTodo(context, todoToRemove) {
      const newValue = state.todos.filter(todo => todo !== todoToRemove);
      console.log(newValue);
      context.commit("deleteTodo", newValue);
    },
    async addTodo(context, todoToAdd) {
      const response = await axios.post("todos", todoToAdd);
      console.log("this is add todo");
      console.log(response.data.data);
      context.commit("addTodo", response.data.data);
    },
    async updateTodo(context, updatedTodo) {
      // axios call to update the formation in the database
      const response = await axios.put("todos/" + updatedTodo.id, updatedTodo);
      console.log("this is update todo");
      console.log(response.data);

      let todoToUpdateIndex = state.todos.findIndex(
        todo => todo.id === updatedTodo.id
      );

      let newValue = state.todos;
      newValue[todoToUpdateIndex].completed = true;
      newValue[todoToUpdateIndex].completed_at = updatedTodo.completed_at;
      context.commit("updateTodo", newValue);
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    setRevenu(state, newValue) {
      state.revenu = newValue;
    },
    setRevenuParjour(state, newValue) {
      state.revenuParjour = newValue;
    },
    setRevenuGlobal(state, newValue) {
      state.revenuGlobal = newValue;
    },
    setMoyennePart(state, newValue) {
      state.moyennePart = newValue;
    },
    updateProfile(state, profile) {
      state.user = profile;
    },
    updatePicture(state, profile) {
      state.user = profile;
    },
    setAreas1(state, newValue) {
      state.areas1 = newValue;
    },
    deleteFormation(state, newValue) {
      state.formations = newValue;
    },
    updateFormation(state, newValue) {
      state.formations = newValue;
    },
    addFormation(state, formationToAdd) {
      state.formations.push(formationToAdd);
    },
    setFormations(state, formations) {
      state.formations = formations.data;
    },

    setTodos(state, todos) {
      state.todos = todos.data;
    },
    deleteTodo(state, newValue) {
      state.todos = newValue;
    },
    addTodo(state, todoToAdd) {
      state.todos.push(todoToAdd);
    },
    updateTodo(state, newValue) {
      state.todos = newValue;
    },

    setEvents(state, events) {
      state.events = events;
    }
  }
});

export default store;
