import { useController, useFormContext } from "react-hook-form";

export default function ToggleInput({ name, label, value, onChange, required = false }) {
  // Try to get form context, but handle case where it doesn't exist
  const formContext = useFormContext();

  // If we have form context, use react-hook-form
  if (formContext) {
    const { control } = formContext;
    const {
      field: { value: fieldValue, onChange: fieldOnChange },
    } = useController({ name, control });

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <label className="relative inline-block w-12 h-7 cursor-pointer">
          <input
            type="checkbox"
            checked={fieldValue}
            onChange={(e) => fieldOnChange(e.target.checked)}
            className="sr-only"
          />
          <span
            className={`absolute inset-0 rounded-full transition-colors duration-300 ${
              fieldValue ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                fieldValue ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </span>
        </label>
      </div>
    );
  }

  // Fallback to regular input when no form context
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <label className="relative inline-block w-12 h-7 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={value || false}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only"
        />
        <span
          className={`absolute inset-0 rounded-full transition-colors duration-300 ${
            value ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
              value ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </span>
      </label>
    </div>
  );
}
