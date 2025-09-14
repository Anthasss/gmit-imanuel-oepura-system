// components/ui/inputs/AutoCompleteInput.jsx
import { useId, useState, useEffect, useRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { ChevronDown, X } from "lucide-react";
import axios from "@/lib/axios";

export default function AutoCompleteInput({
  name,
  label,
  options,
  placeholder,
  apiEndpoint,
  required = false,
  value,
  onChange,
  error: externalError,
}) {
  const inputId = useId();
  
  // Try to get form context, but handle case where it doesn't exist
  const formContext = useFormContext();
  
  const [apiOptions, setApiOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Only use useController if form context exists
  let field = null;
  let error = externalError;
  
  if (formContext) {
    const { control } = formContext;
    const controllerResult = useController({ name, control });
    field = controllerResult.field;
    error = controllerResult.fieldState.error;
  }

  // Fetch options from API if apiEndpoint is provided
  useEffect(() => {
    if (apiEndpoint) {
      setIsLoading(true);
      axios.get(apiEndpoint)
        .then((response) => {
          const data = response.data;
          if (data.success && Array.isArray(data.data)) {
            setApiOptions(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching options:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [apiEndpoint]);

  // Use API options if available, otherwise use provided options
  const finalOptions = apiEndpoint ? apiOptions : options || [];

  // Update input value when field value changes
  useEffect(() => {
    const currentValue = field ? field.value : value;
    if (currentValue) {
      const selectedOption = finalOptions.find(
        (option) => option.value === currentValue
      );
      setInputValue(
        selectedOption
          ? selectedOption.label || selectedOption.value
          : currentValue
      );
    } else {
      setInputValue("");
    }
  }, [field?.value, value, finalOptions]);

  // Filter options based on input
  useEffect(() => {
    if (inputValue && finalOptions.length > 0) {
      const filtered = finalOptions.filter((option) =>
        (option.label || option.value)
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(finalOptions);
    }
  }, [inputValue, finalOptions]);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowDropdown(true);

    // If input matches an option exactly, set the field value
    const exactMatch = finalOptions.find(
      (option) =>
        (option.label || option.value).toLowerCase() === newValue.toLowerCase()
    );

    const valueToSet = exactMatch ? exactMatch.value : newValue;
    
    if (field) {
      field.onChange(valueToSet);
    } else if (onChange) {
      onChange(valueToSet);
    }
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setInputValue(option.label || option.value);
    
    if (field) {
      field.onChange(option.value);
    } else if (onChange) {
      onChange(option.value);
    }
    
    setShowDropdown(false);
    inputRef.current?.blur();
  };

  // Handle input focus
  const handleFocus = () => {
    setShowDropdown(true);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clear input
  const handleClear = () => {
    setInputValue("");
    
    if (field) {
      field.onChange("");
    } else if (onChange) {
      onChange("");
    }
    
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <div className="form-control w-full mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-50" : "bg-white"}
          `}
          disabled={isLoading}
          autoComplete="off"
        />

        {/* Clear button */}
        {inputValue && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Dropdown arrow */}
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {showDropdown && !isLoading && filteredOptions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {filteredOptions.map((option, index) => (
              <div
                key={option.value || index}
                onClick={() => handleOptionSelect(option)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-700 text-sm"
              >
                {option.label || option.value}
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {showDropdown &&
          !isLoading &&
          inputValue &&
          filteredOptions.length === 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
            >
              <div className="px-3 py-2 text-sm text-gray-500">
                Tidak ada hasil ditemukan
              </div>
            </div>
          )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}

      {isLoading && (
        <p className="mt-1 text-sm text-gray-500">Memuat data...</p>
      )}
    </div>
  );
}
