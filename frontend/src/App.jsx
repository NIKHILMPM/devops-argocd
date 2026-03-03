import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error while fetching the users:", err);
    }
  };

  const addUser = async () => {
    if (!name) return;

    try {
      await axios.post("/api/users", {
        name,
        email: name + "@mail.com"
      });

      setName("");
      fetchUsers();
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Sample DevOps Microservices App using Argocd and gitops!!!! 😎</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        style={{ marginRight: "10px" }}
      />

      <button onClick={addUser}>
        Add User
      </button>

      <ul style={{ marginTop: "20px" }}>
        {users.map((u) => (
          <li key={u._id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
