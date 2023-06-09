import { csrfFetch } from "./csrf";

const ALL_EVENTS = "event/ALL_EVENTS";
const GROUP_EVENTS = "event/GROUP_EVENTS";
const GET_EVENT = "event/GET_EVENT";
const ADD_IMAGE = "event/ADD_IMAGE";
const CREATE_EVENT = "event/CREATE_EVENT";
const DELETE_EVENT = 'event/DELETE_EVENT'

// ----------------------------------------------------------------------------------------------------

// ACTION CREATOR
export const allEvents = (events) => {
  return {
    type: ALL_EVENTS,
    events,
  };
};

export const groupEvents = (events) => {
  return {
    type: GROUP_EVENTS,
    events,
  };
};

export const singleEvent = (event) => {
  return {
    type: GET_EVENT,
    event,
  };
};

export const newEvent = (event) => {
  return {
    type: CREATE_EVENT,
    event,
  };
};

export const removeEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
}

export const addImage = (image, eventId) => {
  return {
    type: ADD_IMAGE,
    payload: {
      image,
      eventId,
    },
  };
};


// --------------------------------------------------------------------------------------------------------

// Get All Event
export const fetchEvent = () => async (dispatch) => {
  const response = await fetch("/api/events");
  const events = await response.json();
  dispatch(allEvents(events));
};

// GET EVENT BY GROUP
export const getEventByGroup = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}/events`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const events = await res.json();
    dispatch(groupEvents(events));
    return events
  }
};

// GET A SINGLE EVENT DETAIL
export const getEventDetail = (eventId) => async (dispatch) => {
  const res = await fetch(`/api/events/${eventId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const event = await res.json();
    dispatch(singleEvent(event));
    return event;
  }
};

// CREATE A NEW EVENT BY GROUP ID
export const createEvent = (event, groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: "POST",
    body: JSON.stringify({
      venueId: event.venueId,
      name: event.name,
      type: event.type,
      capacity: event.capacity,
      price: event.price,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
    }),
  });

  if (response.ok) {
    const eventData = await response.json();
    dispatch(newEvent(eventData));
    return eventData;
  }
};

// ADD IMAGE TO EVENT
export const addEventImage = (image, eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/images`, {
    method: "POST",
    body: JSON.stringify({
      url: image,
      preview: true,
    }),
  });

  if (response.ok) {
    const image = await response.json();
    dispatch(addImage(image, eventId));
    return image;
  }
};

// DELETE AN EVENT
export const deleteEvent = (eventId) => async dispatch => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(removeEvent(eventId))
  }
}


// ----------------------------------------------------------------------------------------------------------------

// EVENT REDUCER
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

    case GET_EVENT:
      return { ...state, [action.event.id]: action.event };

    case CREATE_EVENT:
      newState = { ...state, [action.event.id]: action.event }
      return newState

    case DELETE_EVENT:
      newState = { ...state }
      delete newState[action.eventId]
      return newState;

    default:
      return state;
  }
};

export default eventReducer;
