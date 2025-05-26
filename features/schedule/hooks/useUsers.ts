import { useState } from 'react';

import { User } from '@/features/schedule/types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([{ email: '' }]);

  const getValidUsers = () => {
    return users.filter((u) => u.email.trim() !== '');
  };

  return {
    users,
    setUsers,
    getValidUsers,
  };
};
