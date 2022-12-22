import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list_orders: [],
};

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setListOrders: (state, action) => {
      state.list_orders = action.payload
    },
  },
});

export const { setListOrders } = personSlice.actions;

export const selectListOrders = (state) => state.person.list_orders;

export default personSlice.reducer;
