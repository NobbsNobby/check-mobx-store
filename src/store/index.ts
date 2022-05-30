import { Instance, types } from "mobx-state-tree"
import {createContext, useContext} from "react";
import Reactotron from "reactotron-react-js";

import {Users} from "./UsersStore";
import {Todo} from "./stores";

const {model} = types

export const RootModel = model("RootStore", {
    todo: Todo,
    users: Users,
});

export const rootStore = RootModel.create({
    todo: {},
    users: {},
});
export type RootInstance = Instance<typeof RootModel>;

// Create context and <Provider>
const RootStoreContext = createContext<null | RootInstance>(null);
export const Provider = RootStoreContext.Provider;

// create custom hook to use Store
export function useMst() {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store cannot be null, please add a context provider");
    }
    return store;
}

// add reactotron in development mode
if (process.env.NODE_ENV !== "production") {
    // @ts-ignore
    Reactotron.trackMstNode(rootStore);
}
