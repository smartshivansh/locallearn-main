import { configureStore, createSlice } from "@reduxjs/toolkit";
import authSlice from "./isAuthSlice";

const userDataInitialdata = {
  email: "",
  username: "",
  names: "name",
  profession: "profession",
  location: "location",
};

const skillDataInitialState = {
  good: ["skill1", "skill2", "skill3"],
  learn: ["skill1", "skill2", "skill3"],
};

const skillSlice = createSlice({
  name: "skills",
  initialState: skillDataInitialState,
  reducers: {
    addGoodSkill(state, action) {
      state.good = action.payload.goodskills;
    },
    addLearnSkill(state, action) {
      state.learn = action.payload.learnskills;
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

const userDataSlice = createSlice({
  name: "userdata",
  initialState: userDataInitialdata,
  reducers: {
    userDataUpdate(state, action) {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.names = action.payload.name;
    },
    locationUpdate(state, action) {
      state.location = action.payload.location;
    },
    professionUpdate(state, action) {
      state.profession = action.payload.profession;
    },
  },
});

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: [
      {
        type: "qr",
        content: { text: "Hi there! How are you?", reaponse: "no response", index: 0 },
        position: "left",
      },
    ],

    isLoaded: false
  },
  reducers: {
    chatUpdate(state, action) {
      // console.log(action.payload.chat);
      state.chat = action.payload.chat;
      state.isLoaded = true;
    },
  },
});

const Store = configureStore({
  reducer: {
    skill: skillSlice.reducer,
    userdata: userDataSlice.reducer,
    authstatus: authSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export const {
  addGoodSkill,
  addLearnSkill,
  removeGoodSkill,
  removeLearnSkill,
} = skillSlice.actions;

export const { userDataUpdate, locationUpdate, professionUpdate } =
  userDataSlice.actions;

export const { authStatusLogin, authStatusLogout } = authSlice.actions;

export const { chatUpdate } = chatSlice.actions;

export default Store;
