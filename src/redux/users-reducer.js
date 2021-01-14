import { usersAPI } from "../api/api";
import { updateUsersArray } from "../Utils/users-helper";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";
const TOGGLE_FOLLOWING = "TOGGLE_FOLLOWING";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 100,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateUsersArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateUsersArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }
    case TOGGLE_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_FOLLOWING: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};
// Action Creators
export const followSuccess = (userId) => ({ type: FOLLOW, userId });

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });

export const setUsers = (users) => ({ type: SET_USERS, users });

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const setTotalUsersCount = (totalCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount,
});

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_FETCHING,
  isFetching,
});

export const toggleFollowing = (isFetching, userId) => ({
  type: TOGGLE_FOLLOWING,
  isFetching,
  userId,
});

// Thunks
export const getUsers = (page, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(page));
  let data = await usersAPI.getUsers(page, pageSize);
  dispatch(toggleIsFetching(false));
  let users = data.items;
  dispatch(setUsers(users));
};

const followUnfollow = () => async (
  dispatch,
  userId,
  apiCall,
  actionCreator
) => {
  dispatch(toggleFollowing(true, userId));
  let data = await apiCall(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowing(false, userId));
};

export const follow = (userId) => async (dispatch) => {
  let apiCall = usersAPI.follow.bind(usersAPI);
  followUnfollow(dispatch, userId, apiCall, followSuccess);
};

export const unfollow = (userId) => async (dispatch) => {
  let apiCall = usersAPI.unfollow.bind(usersAPI);
  followUnfollow(dispatch, userId, apiCall, unfollowSuccess);
};

export default usersReducer;
