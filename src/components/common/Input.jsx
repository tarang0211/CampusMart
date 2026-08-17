import React from "react";

export const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <label
          htmlFor={name}
          className="text-xs font-semibold uppercase tracking-wider text-[#d7ddd9] dark:text-gray-300"
        >
          {label}{" "}
          {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7f8b85] pointer-events-none" />
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full
            ${Icon ? "pl-11" : "pl-4"}
            pr-4
            py-3
            rounded-2xl
            border
            ${
              error
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-[#34413b] focus:border-[#2f9d82] focus:ring-[#2f9d82]/20"
            }
            bg-[#111916]
            dark:bg-[#111916]
            text-[#f1f5f2]
            placeholder:text-[#69756f]
            text-sm
            outline-none
            transition-all
            duration-200
            focus:ring-2
            disabled:opacity-50
            disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs text-rose-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};