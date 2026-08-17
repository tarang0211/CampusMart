import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // primary | secondary | outline | ghost | danger | success
  size = 'md', // sm | md | lg
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#176b5b] hover:bg-[#125448] text-white shadow-md shadow-[#176b5b]/20 focus:ring-[#176b5b] border border-transparent dark:bg-[#2f8c76] dark:hover:bg-[#26735f] dark:focus:ring-[#3faf91]',

    secondary:
      'bg-[#eeece6] hover:bg-[#e3e0d8] text-[#363431] dark:bg-[#18201d] dark:hover:bg-[#202a26] dark:text-[#f3f4f1] focus:ring-[#176b5b] border border-transparent',

    outline:
      'border border-[#d6d3cb] dark:border-[#35403a] bg-transparent hover:bg-[#f7f6f2] dark:hover:bg-[#18201d] text-[#5f5c56] dark:text-[#d0d6d3] focus:ring-[#176b5b]',

    ghost:
      'bg-transparent hover:bg-[#f1efe9] dark:hover:bg-[#18201d] text-[#5f5c56] dark:text-[#d0d6d3] focus:ring-[#176b5b] border border-transparent',

    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20 focus:ring-rose-500 border border-transparent',

    success:
      'bg-[#176b5b] hover:bg-[#125448] text-white shadow-md shadow-[#176b5b]/20 focus:ring-[#176b5b] border border-transparent dark:bg-[#2f8c76] dark:hover:bg-[#26735f] dark:focus:ring-[#3faf91]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  const iconSize =
    size === 'sm'
      ? 'w-3.5 h-3.5'
      : size === 'lg'
        ? 'w-5 h-5'
        : 'w-4 h-4';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={iconSize} />
      )}

      <span>{children}</span>

      {Icon && iconPosition === 'right' && (
        <Icon className={iconSize} />
      )}
    </button>
  );
};