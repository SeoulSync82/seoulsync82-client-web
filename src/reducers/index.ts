import testReducer, { TestState } from '@/reducers/testReducer';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  testReducer,
});

export type RootState = {
  testReducer: TestState | undefined; // Allow for undefined
};
export default rootReducer;
