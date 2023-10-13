import { csrfFetch } from "./csrf";

const JOIN_GROUP = 'membership/JOIN_GROUP'
const GET_MEMBERS = 'membership/GET_MEMBER'

// --------------------------- Action Creator ------------------------------------

const getMemberAction = (member) => {
    return {
        type: GET_MEMBERS,
        payload: member
    }
}


const joinGroupAction = (member) => {
    return {
        type: JOIN_GROUP,
        payload: member
    }
}

// --------------------------------------------- Thunk Creator ---------------------------------------------------------------

export const getMember = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/memberships/${groupId}`)

    if (response.ok) {
      const data = await response.json()
      await dispatch(getMemberAction(data.Members))
      return data
    }
  }

export const joinGroup = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/memberships/${groupId}`, {
      method: 'POST'
    })

    if (response.ok) {
      const data = await response.json()
      await dispatch(joinGroupAction(data))
      await dispatch(getMember(groupId))
      return data
    }
  }




// --------------------------- Membership Reducer ---------------------------------------------

const memberReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_MEMBERS:
        newState = {}
        action.payload.forEach(el => newState[el.id] = el)
        console.log(newState)
        return newState
    case JOIN_GROUP:
        newState = {...state}
        newState[action.payload.id] = action.payload
        return newState
    default:
      return state;
  }
};

export default memberReducer;
