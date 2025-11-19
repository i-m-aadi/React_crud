import { useEffect, useState } from "react";
import { updateUser, fetchUsers } from "src/api";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "src/components/userform";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initial, setInitial] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetchUsers();
      const data = await res.json();
      const user = data.find((u) => u.id === Number(id));
      setInitial(user);
    };
    load();
  }, [id]);

  const handleUpdate = async (form) => {
    await updateUser(id, form);
    navigate("/");
  };

  if (!initial) return <p className="loading">Loading user...</p>;

  return (
    <div>
      <h2>Edit User</h2>
      <UserForm initial={initial} onSubmit={handleUpdate} />
    </div>
  );
}
