import { useState, useRef, useEffect } from 'react';

import { MultiSelectProps } from '@/features/schedule/types';

const MultiSelect = ({
  options,
  selectedValues,
  onChange,
  placeholder = '担当者を選択',
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(
    (option) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (email: string) => {
    if (!email || email.trim() === '') return;

    const newSelectedValues = selectedValues.includes(email)
      ? selectedValues.filter((value) => value !== email)
      : [...selectedValues, email];

    onChange(newSelectedValues);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`w-full border rounded p-2 min-h-[45px] bg-white cursor-pointer flex flex-wrap gap-1 focus ${selectedValues.length === 0 ? 'items-center' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length > 0 ? (
          selectedValues.map((email, index) => {
            const option = options.find((opt) => opt.email === email);
            if (!option) return null;
            return (
              <span
                key={`${email}-${index}`}
                className="bg-blue-100 text-sm px-2 py-1 rounded flex items-center gap-1 text-black"
              >
                {option.name}
              </span>
            );
          })
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div
          className="absolute z-10 w-full bottom-full bg-white border rounded shadow-lg"
          style={{ marginBottom: '10px' }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="検索"
            className="w-full p-2 border-b text-black focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="max-h-[400px] min-h-[400px] overflow-y-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.email}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  selectedValues.includes(option.email) ? 'bg-blue-50' : ''
                } text-black`}
                onClick={() => toggleOption(option.email)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.email)}
                    readOnly
                  />
                  <div>{option.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
