import { useEffect, useState } from "react";
import UserList from "src/components/userlist";
import { fetchUsers, deleteUser } from "../Api";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const res = await fetchUsers();
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p className="loading">Loading users...</p>;
  if (error) return <p className="error">{error}</p>;

  return <UserList users={users} onDelete={removeUser} />;
}
