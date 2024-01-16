// components/ChipInput.tsx

import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent , FocusEvent} from 'react';


interface ChipItem {
  name: string;
  email: string;
  image: string;
}

interface ChipInputProps {
  items: ChipItem[];
}




const ChipInput: React.FC<ChipInputProps> = ({ items }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [chips, setChips] = useState<ChipItem[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const selectedItem = items.find((item) => item.name.toLowerCase() === inputValue.trim().toLowerCase());
      if (selectedItem) {
        setChips([...chips, selectedItem]);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      
      e.preventDefault()
      setChips(chips.slice(0, -1));
    }
      
  };

  const handleChipRemove = (chip: ChipItem) => {
    setChips(chips.filter((c) => c !== chip));
  };

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };
  
  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  


  useEffect(() => {
    // Focus on input when chips or inputValue change
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chips, inputValue]);


  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {chips.map((chip) => (
          <div key={chip.name} className="flex items-center bg-gray-500 text-white p-2 rounded-full">
            <img src={chip.image} alt={chip.name} className="w-10 h-10 mr-2 rounded-full" />
            {chip.name}{' '}
            <span className="cursor-pointer ml-2" onClick={() => handleChipRemove(chip)}>
              X
            </span>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Add New User..."
        className="border-b-4 border-violet-300 p-2 rounded w-full box-content"
      />
      {isInputFocused && (
        <div className="mt-2 max-h-32 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {items
          .filter((item) => !chips.some((chip) => chip === item) && item.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map((filteredItem) => (
            <div
              key={filteredItem.name}
              onMouseDown={(e) => {
                e.preventDefault();
                setChips([...chips, filteredItem]);
                setInputValue('');
                // Focus on the input field again
                inputRef.current && inputRef.current.focus();
              }}
              className="cursor-pointer flex py-2 px-4 bg-gray-200 rounded hover:bg-gray-300"
            >
              <img src={filteredItem.image} alt={filteredItem.name} className="w-4 h-4 mr-2 rounded-full" />
              <span className="font-bold mr-2">{filteredItem.name}</span>
              <span className="text-gray-500 text-sm ml-1">{filteredItem.email}</span>
            </div>
          ))}
      </div>
      )}
      
    </div>
  );
};

export default ChipInput;
