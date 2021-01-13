import { UserActionTypes } from './user.types';

export const setCurrentUser = user =>( {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})

export const signoutCurrentUser = () => ({
    type: UserActionTypes.SIGNOUT_CURRENT_USER
})