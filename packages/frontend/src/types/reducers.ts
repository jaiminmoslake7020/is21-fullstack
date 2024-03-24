import {NotificationType} from './base';
import {User, Paint} from './app';

export type LoadingSlice = {
  isLoading: boolean,
  loadingMsg: undefined | string,
  progressPercentage: undefined | number,
  loadingLocation: undefined | string,
};

export type FeedbackSlice = {
  notifications: NotificationType[],
};

export type PaintsSlice = {
  paintsList: Paint[],
};

export type UserSlice = {
  user: null | User
};
