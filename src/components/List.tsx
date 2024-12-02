import { collection, getDocs } from "firebase/firestore";
import { db } from '../services/firebaseConfig';
import { User } from "../types/User";
import { useState } from "react";
import UserModal from "./ui/UserModal";

const List = () => {
  const users = collection(db, 'users');
  const [list, setList] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  
  const currentUser: any = JSON.parse(localStorage.getItem('user') || '{}');  

  async function getUsers() {
    try {
      const querySnapshot = await getDocs(users);
      const userList = querySnapshot.docs.map(doc => ({
        uid: doc.id, 
        ...doc.data(), 
      }));
      setList(userList);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }
  
  getUsers();
  
  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-start items-center gap-20 p-[10px]">
      {currentUser.role === "admin" || currentUser.role === "super admin" && <button onClick={() => setOpenModal(true)} className="w-[30px] h-[30px] text-[16px] rounded-full text-white cursor-pointer bg-gray-400 hover:opacity-70">+</button>}

      <ul className="min-w-[500px] flex flex-col items-center justify-between gap-[10px]">
        {list.map((user: User) => (
          <li onClick={() => {
            // log user id
            console.log(user.uid);
          }} className="w-full bg-gray-400 p-[20px] text-white" key={user.email}>
            {user.displayName} <br />
            {user.email} <br />
            {user.role}
          </li>
        ))}
      </ul>

      {openModal && <UserModal setOpenModal={setOpenModal} />}
    </div>
  );
}
 
export default List;