import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastname: '',
  firstname: '',
  parentname: '',
  birthday: '', 
  sex: '',
  series_number_doc: '',
  issue_date: '',
  issue_by: '',
  div_code: '',
  addres_holder_reg: ''
};

export const regpoliceSlice = createSlice({
  name: 'regpolice',
  initialState,
  reducers: {
    setLastname: (state, action) => {
      state.lastname = action.payload
    },
    setFirstname: (state, action) => {
        state.firstname = action.payload
    },
    setParentname: (state, action) => {
        state.parentname = action.payload
    },
    setBirthday: (state, action) => {
      state.birthday = action.payload
    },
    setSex: (state, action) => {
      state.sex = action.payload
    },
    setSeries_number_doc: (state, action) => {
      state.series_number_doc = action.payload
    },
    setIssue_date: (state, action) => {
      state.issue_date = action.payload
    },
    setIssue_by: (state, action) => {
      state.issue_by = action.payload
    },
    setDiv_code: (state, action) => {
      state.div_code = action.payload
    },
    setAddres_holder_reg: (state, action) => {
      state.addres_holder_reg = action.payload
    },
  },
});

export const { 
    setFirstname, 
    setLastname, 
    setParentname, 
    setBirthday, 
    setSex, 
    setSeries_number_doc, 
    setIssue_date, 
    setIssue_by, 
    setDiv_code, 
    setAddres_holder_reg } = regpoliceSlice.actions;

export const selectLastname = (state) => state.regpolice.lastname;
export const selectFirstname = (state) => state.regpolice.firstname;
export const selectParentname = (state) => state.regpolice.parentname;
export const selectBirthday = (state) => state.regpolice.birthday;
export const selectSex = (state) => state.regpolice.sex;
export const selectSeries_number_doc = (state) => state.regpolice.series_number_doc;
export const selectIssue_date = (state) => state.regpolice.issue_date;
export const selectIssue_by = (state) => state.regpolice.issue_by;
export const selectDiv_code = (state) => state.regpolice.div_code;
export const selectAddres_holder_reg = (state) => state.regpolice.addres_holder_reg;

export default regpoliceSlice.reducer;
