import { csrfFetch } from "./csrf";

const ALL_GROUPS = "group/ALL_GROUPS";
const GET_GROUP = "group/GET_GROUP";
const CREATE_GROUP = 'group/CREATE_GROUP'
const DELETE_GROUP = 'group/DELETE_GROUP'
const UPDATE_GROUP = 'group/UPDATE_GROUP'
const ADD_IMAGE = 'group/ADD_IMAGE'

// --------------------------- Action Creator ------------------------------------

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

export const removeGroup = (groupId) => {
  return {
    type: DELETE_GROUP,
    groupId
  }
}

export const addImage = (image, groupId) => {
  return {
    type: ADD_IMAGE,
    payload: {
      image,
      groupId
    }

  }
}

export const editGroup = (group) => {
  return {
    type: UPDATE_GROUP,
    group
  }
}

// --------------------------------------------- Thunk Creator ---------------------------------------------------------------

// Get All Groups
export const fetchGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");
  const groups = await response.json();
  await dispatch(allGroups(groups));
};

// Get a group
export const getGroup = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const group = await res.json();
    await dispatch(singleGroup(group));
    return group;
  }
};

// Create Group
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

  if (response.ok) {
    const groupData = await response.json();
    await dispatch(newGroup(groupData));
    return groupData;
  }
};

// Delete group
export const deleteGroup = (groupId) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    await dispatch(removeGroup(groupId))
  }
}

// Add image to group
export const addGroupImage = (url, groupId) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${groupId}/images`, {
    method: 'POST',
    body: JSON.stringify({
      url: url,
      preview: true
    }),
  })

  if (response.ok) {
    const image = await response.json()
    await dispatch(addImage(image, groupId))
    return image
  }
}

export const updateGroup = (group, groupId) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "PUT",
    body: JSON.stringify({
      name: group.name,
      about: group.about,
      type: group.type,
      city: group.city,
      state: group.state,
      private: group.privated
    }),
  });

  if (response.ok) {
    const groupData = await response.json();
    await dispatch(editGroup(groupData));
    return groupData;
  }
}

// --------------------------- Group Reducer ---------------------------------------------

const groupReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ALL_GROUPS:
      newState = {};
      action.groups?.Groups?.forEach((group) => (newState[group.id] = group));
      return newState;

    case GET_GROUP:
      return { ...state, [action.group.id]: action.group };

    case CREATE_GROUP:
      return { ...state, [action.group.id]: action.group};

    case DELETE_GROUP:
      newState = { ...state }
      delete newState[action.groupId]
      return newState

    case UPDATE_GROUP:
      newState = { ...state }
      newState[action.group.id] = action.group
      return newState

    default:
      return state;
  }
};

export default groupReducer;
