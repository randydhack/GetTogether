import { csrfFetch } from "./csrf";

const ALL_GROUPS = "group/ALL_GROUPS";
const GET_GROUP = "group/GET_GROUP";
const CREATE_GROUP = 'group/CREATE_GROUP'

export const allGroups = (groups) => {
  return {
    type: ALL_GROUPS,
    groups,
  };
};

export const singleGroup = (group) => {
  return {
    type: GET_GROUP,
    group,
  };
};

export const newGroup = (group) => {
  return {
    type: CREATE_GROUP,
    group
  }
}

// Get All Groups
export const fetchGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");
  const groups = await response.json();
  dispatch(allGroups(groups));
};

// Get a group
export const getGroup = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const group = await res.json();
    dispatch(singleGroup(group));
    return group;
  }
};

export const createGroup = (group) => async (dispatch) => {
  const response = await csrfFetch("/api/groups", {
    method: "POST",
    body: JSON.stringify({
      name: group.name,
      about: group.about,
      type: group.type,
      state: group.state,
      private: group.privated,
      city: group.city
    }),
  });

  const groupData = await response.json();
  console.log(groupData)
  dispatch(newGroup(groupData));
  return response;
};

// const initialState = { entries: {}, isLoading: true };
const groupReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ALL_GROUPS:
      newState = {};
      action.groups.Groups.forEach((group) => (newState[group.id] = group));
      return newState;
    case GET_GROUP:
      return { ...state, [action.group.id]: action.group };
    case CREATE_GROUP:
      return { ...state, [action.group.id]: action.group}
    default:
      return state;
  }
};

export default groupReducer;
