import { types } from "mobx-state-tree"

const {model, string, number} = types

export const Todo = model({
    name: "",
    done: false
})



