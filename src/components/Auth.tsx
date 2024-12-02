import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const result = await loginUser(email, password);
        navigate('/');
      } else {
        const result = await registerUser(email, password, displayName);
        navigate('/');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-w-[400px] my-0 mx-auto p-[20px] border rounded-sm">
      <h1 className='text-center'>{isLogin ? 'Вхід' : 'Реєстрація'}</h1>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Ім'я"
            value={displayName}
            className='mb-[10px] p-[10px] text-[16px]'
            onChange={(e) => setDisplayName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          className='mb-[10px] p-[10px] text-[16px]'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          className='mb-[10px] p-[10px] text-[16px]'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='p-[10px] text-[16px] text-white cursor-pointer bg-gray-400 hover:opacity-70' type="submit">{isLogin ? 'Увійти' : 'Зареєструватися'}</button>
        <button className='p-[10px] text-[16px] text-white cursor-pointer bg-gray-400 mt-[5px] hover:opacity-70' type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Створити акаунт' : 'Вхід'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
