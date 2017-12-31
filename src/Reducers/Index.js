import { combineReducers } from 'redux'
import Loginreducer from './LoginReducer';
import SignupReducer from './SignupReducer';
import visibilityFilter from './visibilityfilter';
import QRCodeReducer from './QRCodeReducer';
const ReducersCombined = combineReducers({
  Loginreducer,
  visibilityFilter,
  SignupReducer,
  QRCodeReducer
})

export default ReducersCombined
