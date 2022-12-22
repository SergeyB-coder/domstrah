import { configureStore } from '@reduxjs/toolkit';
import calcReducer from '../components/Calc/calcSlice';
import homeReducer from '../components/Home/homeSlice';
import regpoliceReducer from '../components/RegPolice/regpoliceSlice';
import loginReducer from '../components/Login/loginSlice';
import personReducer from '../components/Person/personSlice';

export const store = configureStore({
  reducer: {
    calc: calcReducer,
    home: homeReducer,
    regpolice: regpoliceReducer,
    login: loginReducer,
    person: personReducer,
  },
});
