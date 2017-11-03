const app = {
  state: {
    sidebar: {},
    visitedViews: [],
    abc:2,
  },
  mutations: {
    ABC(state, data){
      state.abc = data;
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return;
      state.visitedViews.push({ name: view.name, path: view.path });
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index;
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i;
          break;
        }
      }
      state.visitedViews.splice(index, 1);
    }
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit("ADD_VISITED_VIEWS", view);
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit("DEL_VISITED_VIEWS", view);
        resolve([...state.visitedViews]);
      });
    },
    setAbc({ commit }, data){
      commit("ABC", data);
      
    }
  }
};

export default app;
