const ALL_GROUPS = "group/ALL_GROUPS";

export const allGroups = (groups) => {
  return {
    type: ALL_GROUPS,
    groups,
  };
};

export const fetchGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");
  const groups = await response.json();
  dispatch(allGroups(groups));
};

// const initialState = { entries: {}, isLoading: true };
const groupReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ALL_GROUPS:
      newState = {};
      action.groups.Groups.forEach((group) => newState[group.id] = group);
      return newState;
    default:
      return state;
  }
};

export default groupReducer;
