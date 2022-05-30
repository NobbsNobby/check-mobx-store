import React, { useEffect } from "react";
import "./App.css";
import { useMst } from "./store";
import {observer} from "mobx-react-lite";

const UserComponent = observer(({user}: any) => {
  return (
    <div>
      <h2>{user.getName}</h2>
      <div>
        <input value={user.email} onChange={(e) => {
          user.changeEmail(e.target.value)
        }} />
        <p>{user.phone}</p>
        <p>{user.website}</p>
      </div>
    </div>
  );
});

function App() {
  const { users } = useMst();
  // @ts-ignore
  useEffect(() => {
    users.fetchUsers();
  }, []);
  return (
    <div className="App">
      {users.users.map((i) => (
        <UserComponent key={i.id} user={i} />
      ))}
    </div>
  );
}

export default observer(App);
