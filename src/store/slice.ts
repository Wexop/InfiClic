import {createSlice} from '@reduxjs/toolkit';

interface CounterState {
  token: string | undefined;
}

const initialState: CounterState = {
  token: undefined,
};

const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const {updateToken} = counterSlice.actions;
export default counterSlice.reducer;
