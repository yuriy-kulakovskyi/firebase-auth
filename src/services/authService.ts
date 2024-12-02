import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { db } from './firebaseConfig';

export const registerUser = async (email: string, password: string, displayName: string, role?: string) => {
  const usersRef = collection(db, 'users');

  const q = query(usersRef, where('email', '==', email));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    throw new Error('Користувач із таким email вже існує.');
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  await addDoc(usersRef, { email, passwordHash, displayName, role: role || 'super admin' });
  localStorage.setItem('user', JSON.stringify({ email, displayName, role: role || 'super admin' }));
  return { message: 'Реєстрація успішна' };
};

export const loginUser = async (email: string, password: string) => {
  const usersRef = collection(db, 'users');

  const q = query(usersRef, where('email', '==', email));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    throw new Error('Користувач із таким email не знайдений.');
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  const isPasswordValid = bcrypt.compareSync(password, userData.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Неправильний пароль.');
  }
  localStorage.setItem('user', JSON.stringify(userData));
  return { message: 'Вхід успішний', user: userData };
};