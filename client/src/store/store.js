import React, {createContext, useReducer} from "react";
import Reducer from '../reducer/reducer'


const initialState = {
    user: null,
    userInventory: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;