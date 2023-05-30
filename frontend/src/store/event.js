const ALL_EVENTS = "event/ALL_EVENTS";
const GROUP_EVENTS = 'event/GROUP_EVENTS'

export const allEvents = (events) => {
  return {
    type: ALL_EVENTS,
    events,
  };
};

export const groupEvents = (events) => {
    return {
        type: GROUP_EVENTS,
        events
    }
}

// Get All Event
export const fetchEvent = () => async (dispatch) => {
  const response = await fetch("/api/events");
  const events = await response.json();
  dispatch(allEvents(events));
};

export const getEventByGroup = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}/events`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const events = await res.json();
    dispatch(groupEvents(events));
  }
};

const eventReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ALL_EVENTS:
      newState = {};
      action.events.Events.forEach((event) => (newState[event.id] = event));
      return newState;
    case GROUP_EVENTS:
        newState = {};
        action.events.Events.forEach((event) => (newState[event.id] = event));
        return newState;
    default:
      return state;
  }
};

export default eventReducer;
