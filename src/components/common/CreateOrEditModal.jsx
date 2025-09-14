import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { showToast } from "@/utils/showToast";
import HookForm from "../form/HookForm";
import { X } from "lucide-react";
import TextInput from "../ui/inputs/TextInput";
import SelectInput from "../ui/inputs/SelectInput";
import DatePicker from "../ui/inputs/DatePicker";
import AutoCompleteInput from "../ui/inputs/AutoCompleteInput";

export default function CreateOrEditModal({
  isOpen,
  onClose,
  onSuccess,
  title,
  schema,
  fields = [],
  defaultValues = {},
  editData = null,
  onSubmit,
  isLoading = false,
}) {
  const isEdit = !!editData;

  const methods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: isEdit ? { ...defaultValues, ...editData } : defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  console.log("default value : ", defaultValues);

  // Reset form when modal opens/closes or editData changes
  useEffect(() => {
    if (isOpen) {
      const formData = isEdit
        ? { ...defaultValues, ...editData }
        : defaultValues;

      reset(formData);
    }
  }, [isOpen, editData, defaultValues, reset, isEdit]);

  const handleFormSubmit = async (data) => {
    try {
      const result = await onSubmit(data, isEdit);

      if (result.success) {
        showToast({
          title: "Berhasil",
          description:
            result.message ||
            `Data berhasil ${isEdit ? "diperbarui" : "ditambahkan"}`,
          color: "success",
        });

        onSuccess?.();
        onClose();
      } else {
        // Handle validation errors
        if (result.errors && typeof result.errors === "object") {
          Object.keys(result.errors).forEach((key) => {
            setError(key, {
              type: "manual",
              message: result.errors[key],
            });
          });
        }

        showToast({
          title: `Gagal ${isEdit ? "memperbarui" : "menambahkan"}`,
          description:
            result.message ||
            `Gagal ${isEdit ? "memperbarui" : "menambahkan"} data`,
          color: "error",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showToast({
        title: "Error",
        description: "Terjadi kesalahan sistem",
        color: "error",
      });
    }
  };

  const renderField = (field) => {
    const { type, name, label, placeholder, options, apiEndpoint, required, ...fieldProps } = field;

    switch (type) {
      case "text":
      case "email":
      case "number":
        return (
          <TextInput
            key={name}
            label={label}
            name={name}
            placeholder={placeholder}
            type={type}
            {...fieldProps}
          />
        );

      case "date":
      case "datepicker":
        return (
          <DatePicker
            key={name}
            label={label}
            name={name}
            placeholder={placeholder}
            required={required}
            {...fieldProps}
          />
        );

      case "textarea":
        return (
          <TextInput
            key={name}
            label={label}
            name={name}
            placeholder={placeholder}
            type="textarea"
            {...fieldProps}
          />
        );

      case "select":
        // If apiEndpoint is provided, use autocomplete instead
        if (apiEndpoint) {
          return (
            <AutoCompleteInput
              key={name}
              label={label}
              name={name}
              placeholder={placeholder}
              apiEndpoint={apiEndpoint}
              required={required}
              {...fieldProps}
            />
          );
        }
        return (
          <SelectInput
            key={name}
            label={label}
            name={name}
            options={options || []}
            placeholder={placeholder}
            {...fieldProps}
          />
        );

      case "autocomplete":
        return (
          <AutoCompleteInput
            key={name}
            label={label}
            name={name}
            placeholder={placeholder}
            apiEndpoint={apiEndpoint}
            options={options}
            required={required}
            {...fieldProps}
          />
        );

      default:
        return (
          <TextInput
            key={name}
            label={label}
            name={name}
            placeholder={placeholder}
            {...fieldProps}
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEdit ? `Edit ${title}` : `Tambah ${title}`}
            </h3>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <HookForm methods={methods} onSubmit={handleFormSubmit}>
              <div className="space-y-4">{fields.map(renderField)}</div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  disabled={isLoading}
                  type="button"
                  onClick={onClose}
                >
                  Batal
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      {isEdit ? "Memperbarui..." : "Menyimpan..."}
                    </div>
                  ) : isEdit ? (
                    "Perbarui"
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </HookForm>
          </div>
        </div>
      </div>
    </div>
  );
}
