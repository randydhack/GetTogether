const ALL_GROUPS = "group/ALL_GROUPS";
const GET_GROUP = "group/GET_GROUP";
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
    default:
      return state;
  }
};

export default groupReducer;
