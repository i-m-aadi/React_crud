import UserForm from "src/components/userform";
import { createUser } from "../Api";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const navigate = useNavigate();

  const handleCreate = async (form) => {
    await createUser(form);
    navigate("/");
  };

  return (
    <div>
      <h2>Create User</h2>
      <UserForm onSubmit={handleCreate} />
    </div>
  );
}
