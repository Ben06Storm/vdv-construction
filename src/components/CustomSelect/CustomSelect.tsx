import { useEffect, useRef, useState } from 'react';

import {
  ChevronDown,
  Check,
} from 'lucide-react';

import './CustomSelect.scss';

type Option = {
  value: string;
  label: string;
};

type OptionProps = {
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

const CustomSelect = ({
  placeholder,
  options,
  value,
  onChange,
}: OptionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () =>
      document.removeEventListener('mousedown', handleClick);
  }, []);
  const selectedOption = options.find(
    option => option.value === value,
  );
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (!isOpen) {
      if (
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex(prev =>
          prev === options.length - 1
            ? 0
            : prev + 1,
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex(prev =>
          prev === 0
            ? options.length - 1
            : prev - 1,
        );
        break;
      case 'Enter':
        event.preventDefault();
        onChange(options[activeIndex].value);
        setIsOpen(false);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      className="customSelect"
      ref={selectRef}
    >
      <button
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
        className={`customSelect__button ${isOpen ? 'customSelect__button--open' : ''
          }`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span
          className={
            value
              ? 'customSelect__value'
              : 'customSelect__placeholder'
          }
        >
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`customSelect__arrow ${isOpen ? 'customSelect__arrow--open' : ''
            }`}
        />
      </button>
      {isOpen && (
        <ul
          className="customSelect__menu"
          role="listbox">
          {options.map((option, index) => (
            <li
              role="option"
              aria-selected={value === option.value}
              key={option.value}
              className={`customSelect__item ${activeIndex === index
                ? 'customSelect__item--active'
                : ''
                }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <Check size={18} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;