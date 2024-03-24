import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  UserSlice, FeedbackSlice, LoadingSlice
} from '../types/reducers';
import feedback from './reducers/feedback';
import loading from './reducers/loading';
import user from './reducers/user';

export const store = configureStore({
  reducer: {
    feedback,
    loading,
    user
  }
});

export type ReduxStoreStateType = {
  feedback: FeedbackSlice,
  loading: LoadingSlice,
  user: UserSlice
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxStoreStateType> = useSelector;

export default store;
