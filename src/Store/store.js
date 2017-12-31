import homeReducer from '../reducers/indeereducer';


import { combineReducers } from 'redux';

const reducers = combineReducers({
  homeState: homeReducer,
  
});

export default reducers;
