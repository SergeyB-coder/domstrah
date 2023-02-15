import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastname: '',
  firstname: '',
  parentname: '',
  birthday: new Date('2000-01-01'), 
  sex: '',
  series_number_doc: '',
  issue_date: '',
  issue_by: '',
  div_code: '',
  addres_holder_reg: '',
  share: 100,
  agr_credit_number: '',
  dateBegin: '',
  dateCredit: '',
  dateCreditEnd: '',
  addres_object: '',
  yeahr_build: '',
  work_organization: 'ООО',
  weight: 60,
  height: 170,
  email: '',
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
    setShare: (state, action) => {
      state.share = action.payload
    },
    setAgr_credit_number: (state, action) => {
      state.agr_credit_number = action.payload
    },
    setDateBegin: (state, action) => {
      state.dateBegin = action.payload
    },
    setDateCredit: (state, action) => {
      state.dateCredit = action.payload
    },
    setDateCreditEnd: (state, action) => {
      state.dateCreditEnd = action.payload
    },

    setAddressObject: (state, action) => {
      state.addres_object = action.payload
    },
    setYeahrBuild: (state, action) => {
      state.yeahr_build = action.payload
    },
    setWork_Organization: (state, action) => {
      state.work_organization = action.payload
    },
    setWeight: (state, action) => {
      state.weight = action.payload
    },
    setHeight: (state, action) => {
      state.height = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    }
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
    setAddres_holder_reg,
    setShare,
    setAgr_credit_number,
    setDateBegin,
    setDateCredit,
    setAddressObject, 
    setYeahrBuild,
    setWork_Organization,
    setWeight,
    setHeight,
    setDateCreditEnd,
    setEmail } = regpoliceSlice.actions;

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
export const selectShare = (state) => state.regpolice.share;
export const selectAgr_credit_number = (state) => state.regpolice.agr_credit_number;
export const selectDateBegin = (state) => state.regpolice.dateBegin;
export const selectDateCredit = (state) => state.regpolice.dateCredit;
export const selectAddressObject = (state) => state.regpolice.addres_object;
export const selectYeahrBuild = (state) => state.regpolice.yeahr_build;
export const selectWork_Organization = (state) => state.regpolice.work_organization;
export const selectWeight = (state) => state.regpolice.weight;
export const selectHeight = (state) => state.regpolice.height;
export const selectDateCreditEnd = (state) => state.regpolice.dateCreditEnd;
export const selectEmail = (state) => state.regpolice.email;

export default regpoliceSlice.reducer;
