import React, { createContext, useReducer } from 'react'
import users from '../data/users'

const initialState = { users }
const UsersContext = createContext({})

const actions = {
    createUser(state, action) {
        const user = action.payload
        user.id = Math.random()
        return {
            ...state,
            users: [...state.users, user],
        }
    },
    updateUser(state, action) {
        const userUpdated = action.payload
        return {
            ...state,
            users: state.users.map(u => u.id === userUpdated.id ? userUpdated : u)
        }
    },
    deleteUser(state, action) {
        const userId = action.payload
        return {
            ...state,
            users: state.users.filter(u => u.id !== userId)
        }
    }
}

export const UsersProvider = props => {

    function reducer(state, action) {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UsersContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersContext