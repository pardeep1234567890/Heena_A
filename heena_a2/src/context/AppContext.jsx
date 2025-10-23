import React from 'react'
import { createContext } from 'react'
// this is the object that components will subscribe to for changes
export const AppContext = createContext()
export const AppContextProvider = (props) => {
    const backend_url = import.meta.env.VITE_API_URL || ""
    const value = {
        backend_url
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
