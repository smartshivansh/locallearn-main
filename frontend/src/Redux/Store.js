import { configureStore, createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
  name: "skills",
  initialState: {
    good: [],
    learn: [],
  },
  reducers: {
    addGoodSkill(state, action) {
      state.good = [...action.payload];
    },
    addLearnSkill(state, action) {
      state.learn = [...action.payload];
    },
    removeGoodSkill(state, action) {
      state.good = state.good.filter((skill) => {
        if (skill !== action.payload) {
          return skill;
        }
      });
    },

    removeLearnSkill(state, action) {
      state.learn = state.learn.filter((skill) => {
        if (skill !== action.payload) {
          return skill;
        }
      });
    },
  },
});

const Store = configureStore({
  reducer: { skill: skillSlice.reducer },
});

export const {
  addGoodSkill,
  addLearnSkill,
  removeGoodSkill,
  removeLearnSkill,
} = skillSlice.actions;

export default Store;
