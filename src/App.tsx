import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Оголошуємо тип для об'єкта користувача
type User = {
  id: number;
  name: string;
  // Додайте інші властивості користувача, якщо вони є в даних з API
};

const UsersComponent = () => {
  // Створюємо стейт для збереження отриманих даних
  const [users, setUsers] = useState<User[]>([]);
  // Створюємо стейт для відстеження стану завантаження
  const [loading, setLoading] = useState(true);
  // Створюємо стейт для відстеження помилок
  const [error, setError] = useState('');

  // Функція для отримання списку користувачів з API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      // Зберігаємо отримані дані в стані
      setUsers(response.data);
      setLoading(false); // Встановлюємо стан завантаження в false після отримання даних
    } catch (error) {
      setError('Помилка при отриманні даних'); // Встановлюємо стан помилки в разі помилки
      setLoading(false); // Встановлюємо стан завантаження в false після помилки
    }
  };

  // Викликаємо функцію отримання даних один раз при монтуванні компоненту
  useEffect(() => {
    fetchUsers();
  }, []);

  // Перевіряємо, чи дані вже отримані
  if (loading) return <div>Завантаження...</div>;
  // Перевіряємо, чи виникла помилка
  if (error) return <div>{error}</div>;

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-semibold mt-6 mb-6'>4. Створіть компонент, який буде запитувати дані з API при монтуванні і зберігати їх у локальному сховищі.</h1>
      <h2 className='text-2xl'>Список користувачів</h2>
      <ul className='max-w-[50%] min-h-[200px] mt-4 bg-slate-400/40 p-4 rounded-lg'>
        {users.map(user => (
          <li  key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersComponent;
