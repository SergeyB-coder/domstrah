import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeObject: '1',
  idBank: '1',
  isManagerCost: false,
  insuranceLogo: '',
  insuranceCompany: 'СК Абсолют',
  insuranceCompany2: '',
  promtCredit: '',
  promt: '',
  promtProperty: '',
  discount: 0,
  isDoubleInsurance: false,
};

export const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    setDiscount: (state, action) => {
      state.discount = action.payload
    },

    setPromtProperty: (state, action) => {
      state.promtProperty = action.payload
    },

    setPromt: (state, action) => {
      state.promt = action.payload
    },

    setPromtCredit: (state, action) => {
      state.promtCredit = action.payload
    },

    setTypeObject: (state, action) => {
      state.typeObject = action.payload
    },

    setIdBank: (state, action) => {
        state.idBank = action.payload
    },

    setIsManagerCost: (state, action) => {
        state.isManagerCost = action.payload
    },

    setInsuranceLogo: (state, action) => {
        state.insuranceLogo = action.payload
    },

    setInsuranceCompany: (state, action) => {
        state.insuranceCompany = action.payload
    },

    setInsuranceCompany2: (state, action) => {
      state.insuranceCompany2 = action.payload
  },

    setIsDoubleInsurance: (state, action) => {
      state.isDoubleInsurance = action.payload
  },
    
  },
});

export const { 
  setIsDoubleInsurance, 
  setTypeObject, 
  setIdBank, 
  setIsManagerCost, 
  setInsuranceLogo, 
  setInsuranceCompany, 
  setInsuranceCompany2,
  setPromtCredit, 
  setPromt, 
  setPromtProperty, 
  setDiscount 
} = calcSlice.actions;

export const selectTypeObject = (state) => state.calc.typeObject;
export const selectIdBank = (state) => state.calc.idBank;
export const selectIsManagerCost = (state) => state.calc.isManagerCost;
export const selectInsuranceLogo = (state) => state.calc.insuranceLogo;
export const selectInsuranceCompany = (state) => state.calc.insuranceCompany;
export const selectInsuranceCompany2 = (state) => state.calc.insuranceCompany2;
export const selectPromtCredit = (state) => state.calc.promtCredit;
export const selectPromt = (state) => state.calc.promt;
export const selectPromtProperty = (state) => state.calc.promtProperty;
export const selectDiscount = (state) => state.calc.discount;
export const selectIsDoubleInsurance = (state) => state.calc.isDoubleInsurance;


export default calcSlice.reducer;
