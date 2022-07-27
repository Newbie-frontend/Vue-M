import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  event: {},
  totalEvents: 0,
};
export const getters = {
  catLength: (state) => state.categories.length,
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};
export const mutations = {
  ADD_EVENT: (state, event) => {
    state.events.push(event);
  },
  SET_EVENTS: (state, events) => {
    state.events = events;
  },
  SET_EVENT: (state, event) => {
    state.event = event;
  },
  SET_TOTAL_EVENTS: (state, totalEvents) => {
    state.totalEvents = totalEvents;
  },
};
export const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
      })
      .catch(() => {
        console.log("There was a problem creating the event");
      });
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit("SET_EVENTS", response.data);
        commit("SET_TOTAL_EVENTS", parseInt(response.headers["x-total-count"]));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
    } else {
      EventService.getEvent(id)
        .then((response) => {
          commit("SET_EVENT", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
