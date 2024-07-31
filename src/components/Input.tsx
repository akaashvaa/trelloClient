import { ChangeEvent, FC, useState } from "react";

interface InputProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

const Input: FC<InputProps> = ({
  name,
  value,
  placeholder,
  onChange,
  autoComplete,
}) => {
  const [visibility, setVisibility] = useState(false);
  return (
    <>
      <input
        type={visibility ? "text" : name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full px-2 py-3 border focus:border-stroke rounded-md outline-none bg-input-field "
      />
      <div>
        {name === "password" && (
          <svg
            className="absolute cursor-pointer top-0 bottom-0 right-2 my-auto"
            onClick={() => setVisibility(!visibility)}
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 13C6.6 5 17.4 5 21 13"
              stroke="#999999"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z"
              fill={visibility ? "#999999" : "none"}
              stroke="#999999"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </>
  );
};

export default Input;
