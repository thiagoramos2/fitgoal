import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'lg';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'default', 
  size = 'default', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 py-3 text-lg"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}