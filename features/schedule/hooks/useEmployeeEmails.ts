import { useState } from 'react';

import { EmployeeEmail } from '@/features/schedule/types';

export const useEmployeeEmails = () => {
  const [employeeEmails, setEmployeeEmails] = useState<EmployeeEmail[]>([{ email: '' }]);

  const getValidEmployeeEmails = () => {
    return employeeEmails.filter((employeeEmail) => employeeEmail.email.trim() !== '');
  };

  return {
    employeeEmails,
    setEmployeeEmails,
    getValidEmployeeEmails,
  };
};
