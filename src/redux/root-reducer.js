//Import packages
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//Import files
import userReducer from './user/user.reducer';

//Set up persistconfig
const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    user:userReducer
})

export default persistReducer(persistConfig,rootReducer);
