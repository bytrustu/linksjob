import produce, { Draft } from 'immer';
import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../types';
import { IUserData } from '../../type/Interfaces';

export const initialState = {
  isAuthenticated: false,
  userLoading: false,
  userData: null,
  userErrorMsg: '',
};


export const registerUserAction = (userData: IUserData) => ({
  type: REGISTER_USER_REQUEST,
  data: userData,
});

export const loadUserAction = () => ({
  type: LOAD_USER_REQUEST,
  data: localStorage.getItem('token'),
});

export type UserAction =
  | ReturnType<typeof registerUserAction>
  | ReturnType<typeof loadUserAction>;

export type IUserReducerState = typeof initialState;

export default (state: IUserReducerState = initialState, action: UserAction) =>
  produce(state, (draft: Draft<IUserReducerState>) => {
    switch (action.type) {
      case LOGIN_USER_REQUEST:
      case REGISTER_USER_REQUEST : {
        draft.userErrorMsg = '';
        draft.userLoading = true;
        break;
      }
      case LOGIN_USER_SUCCESS:
      case REGISTER_USER_SUCCESS: {
        localStorage.setItem("token", action.data.token);
        draft.isAuthenticated = true;
        draft.userLoading = false;
        draft.userData = action.data.user;
        break;
      }
      case LOGIN_USER_FAILURE:
      case REGISTER_USER_FAILURE: {
        draft.isAuthenticated = false;
        draft.userLoading = false;
        draft.user = null;
        draft.userErrorMsg = action.error.data.msg;
        break;
      }

      case LOAD_USER_REQUEST : {
        draft.userErrorMsg = '';
        draft.userLoading = true;
        break;
      }
      case LOAD_USER_SUCCESS: {
        draft.isAuthenticated = true;
        draft.userLoading = false;
        break;
      }
      case LOAD_USER_FAILURE: {
        draft.isAuthenticated = false;
        draft.userLoading = false;
        draft.token = null;
        draft.user = null;
        draft.userErrorMsg = action.error.data.msg;
        break;
      }

      default: {
        break;
      }
    }
  });

