import { useState } from "react";
import { registerUser } from "../../services/authService";

interface UserModalProps {
  setOpenModal: (value: boolean) => void;
}

const UserModal:React.FC<UserModalProps> = ({
  setOpenModal
}) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-[20px] flex flex-col items-center">
        <button className="p-[10px] text-[16px] text-white cursor-pointer bg-gray-400 hover:opacity-70" onClick={() => setOpenModal(false)}>Закрити</button>
        <h1 className="text-center">Додати користувача</h1>
        <form className="flex flex-col">
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} type="text" placeholder="Ім'я" className="mb-[10px] p-[10px] text-[16px]" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="mb-[10px] p-[10px] text-[16px]" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" className="mb-[10px] p-[10px] text-[16px]" />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="mb-[10px] p-[10px] text-[16px]">
            <option value="user">Користувач</option>
            <option value="admin">Адміністратор</option>
          </select>

          <button onClick={(e) => {
            e.preventDefault();
            registerUser(email, password, displayName, role);
            setOpenModal(false);
            }} className="p-[10px] text-[16px] text-white cursor-pointer bg-gray-400 hover:opacity-70">Додати</button>
        </form>
      </div>
    </div>
  );
}
 
export default UserModal;