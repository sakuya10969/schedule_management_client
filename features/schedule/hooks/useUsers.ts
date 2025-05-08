import { useState } from 'react';

import { User } from '@/features/schedule/type';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([{ email: '' }]);

  const handleAddUser = () => {
    setUsers((prev) => [...prev, { email: '' }]);
  };

  const handleRemoveUser = (index: number) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeUserEmail = (index: number, value: string) => {
    setUsers((prev) =>
      prev.map((user, i) => (i === index ? { email: value } : user))
    );
  };

  const getValidUsers = () => {
    return users.filter((u) => u.email.trim() !== '');
  };

  return {
    users,
    setUsers,
    handleAddUser,
    handleRemoveUser,
    handleChangeUserEmail,
    getValidUsers,
  };
};
