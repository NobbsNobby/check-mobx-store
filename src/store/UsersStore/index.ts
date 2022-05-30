import { flow, types } from "mobx-state-tree";
import axios from "axios";

const {
  model,
  string,
  number,
  reference,
  map,
  optional,
  identifier,
  identifierNumber,
  array,
  maybeNull,
  maybe
} = types;

const GeoLocation = model("GeoLocation", {
  lat: maybeNull(string),
  lng: maybeNull(string),
});

const UserAddress = model("UserAddress", {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: optional(GeoLocation, {}),
});

const User = model("User", {
  id: identifierNumber,
  name: string,
  username: string,
  email: string,
  address: UserAddress,
  phone: string,
  website: string,
})
  .views((self) => ({
    get getName() {
      return 'User name: ' + self.name;
    },
  }))
  .actions((self) => ({
    changeEmail(value: string) {
      self.email = value;
    },
  }));

export const Users = model({
  users: array(User),
  selectedUser: maybe(reference(User))
}).actions((self) => ({
  fetchUsers: flow(function* fetchUsers() {
    try {
      const { data } = yield axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      self.users = data;
      self.selectedUser = self.users[0]
    } catch (e) {
      console.log(e);
    }
  }),
}));
