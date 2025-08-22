import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";

interface SearchUserProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchUser = ({
    value,
    onChange,
    placeholder = "Tìm kiếm theo tên hoặc email...",
    className = "",
}: SearchUserProps) => {
    const [inputValue, setInputValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);

    const debouncedChange = useCallback(
        debounce((val: string) => onChange(val.trim()), 400),
        [onChange]
    );

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        return () => {
            debouncedChange.cancel();
        };
    }, [debouncedChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        debouncedChange(val);
    };

    return (
        <div className={`mb-6 ${className}`}>
            <div className="relative max-w-md w-full">
                {/* Search Icon */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Search
                        size={18}
                        className={`transition-colors duration-200 ${isFocused ? "text-gray-600" : "text-gray-400"
                            }`}
                    />
                </div>

                {/* Input Field */}
                <Input
                    value={inputValue}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
            h-11 pl-10 pr-10 text-sm
            transition-all duration-200
            ${isFocused
                            ? "border-gray-400 ring-1 ring-gray-200 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"}
            bg-white rounded-lg
            placeholder:text-gray-400
            focus:outline-none
          `}
                />

                {/* Clear Button */}
                {inputValue && (
                    <button
                        type="button"
                        onClick={() => {
                            setInputValue("");
                            onChange("");
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors duration-200 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        aria-label="Xóa tìm kiếm"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchUser;
