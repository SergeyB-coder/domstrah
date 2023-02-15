import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  banner_url: '',
  banner_url_mobile: '',
  banner_is_on: false,
  lifeOption: false,
  propertyOption: true,
  token: '', // absolute
  cookie: '', // zetta
  premium_sum: 0,
  premium_sum2: 0,
  mortgageBalance: 3000000,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setBannerUrl: (state, action) => {
      state.banner_url = action.payload
    },
    setBannerUrlMobile: (state, action) => {
        state.banner_url_mobile = action.payload
      },
    setBannerIsOn: (state, action) => {
        state.banner_is_on = action.payload
    },
    setLifeOption: (state, action) => {
        state.lifeOption = action.payload
    },
    setPropertyOption: (state, action) => {
        state.propertyOption = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setCookie: (state, action) => {
      state.cookie = action.payload
    },
    setPremiumSum: (state, action) => {
      state.premium_sum = action.payload
    },
    setPremiumSum2: (state, action) => {
      state.premium_sum2 = action.payload
    },
    setMortgageBalance: (state, action) => {
      state.mortgageBalance = action.payload
    }
  },
});

export const { 
  setBannerUrl, 
  setBannerUrlMobile, 
  setBannerIsOn, 
  setLifeOption, 
  setPropertyOption,
  setCookie,
  setToken,
  setPremiumSum,
  setPremiumSum2,
  setMortgageBalance
} = homeSlice.actions;

export const selectBannerUrl = (state) => state.home.banner_url;
export const selectBannerUrlMobile = (state) => state.home.banner_url_mobile;
export const selectBannerIsOn = (state) => state.home.banner_is_on;
export const selectLifeOption = (state) => state.home.lifeOption;
export const selectPropertyOption = (state) => state.home.propertyOption;
export const selectToken = (state) => state.home.token;
export const selectCookie = (state) => state.home.cookie;
export const selectPremiumSum = (state) => state.home.premium_sum;
export const selectPremiumSum2 = (state) => state.home.premium_sum2;
export const selectMortgageBalance = (state) => state.home.mortgageBalance;

export default homeSlice.reducer;
