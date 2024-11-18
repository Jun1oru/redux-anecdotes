import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return (state = action.payload);
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const { setMessage, clearNotification } =
  notificationSlice.actions;

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
