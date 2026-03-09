'use client';

import { motion } from 'framer-motion';

// Button Variants
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}) {
  const variants = {
    primary: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700',
    outline: 'border-2 border-red-500 text-red-500 hover:bg-red-50 active:bg-red-100 dark:hover:bg-red-900/20',
    ghost: 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    success: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-5 py-2.5 text-base rounded-xl',
    lg: 'px-8 py-3.5 text-lg rounded-2xl',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`
        font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Icon Button
export function IconButton({ 
  children, 
  className = '', 
  size = 'md',
  variant = 'ghost',
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'primary' | 'danger';
}) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  const variants = {
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
    primary: 'bg-red-500 text-white hover:bg-red-600',
    danger: 'bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={`
        rounded-full inline-flex items-center justify-center transition-colors
        ${sizes[size]} ${variants[variant]} ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Floating Action Button
export function FAB({ 
  children, 
  onClick,
  className = '',
  position = 'bottom-right',
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
}) {
  const positions = {
    'bottom-right': 'bottom-20 right-4',
    'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-20 left-4',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`
        fixed ${positions[position]} z-40
        w-14 h-14 rounded-full shadow-xl
        bg-gradient-to-br from-red-500 to-red-600
        text-white flex items-center justify-center
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

// Chip/Badge
export function Chip({ 
  children, 
  variant = 'default',
  className = '',
}: { 
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
  className?: string;
}) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    primary: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
      ${variants[variant]} ${className}
    `}>
      {children}
    </span>
  );
}

// Status Badge
export function StatusBadge({ 
  status,
}: { 
  status: 'ongoing' | 'completed' | 'hiatus' | 'dropped' | 'adopted';
}) {
  const config = {
    ongoing: { label: 'Ongoing', color: 'bg-green-500' },
    completed: { label: 'Completed', color: 'bg-blue-500' },
    hiatus: { label: 'Hiatus', color: 'bg-yellow-500' },
    dropped: { label: 'Dropped', color: 'bg-red-500' },
    adopted: { label: 'Adopted', color: 'bg-purple-500' },
  };

  const { label, color } = config[status];

  return (
    <span className={`
      ${color} text-white px-2 py-0.5 rounded text-xs font-bold uppercase
    `}>
      {label}
    </span>
  );
}

// Card
export function Card({ 
  children, 
  className = '',
  hover = true,
}: { 
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
      shadow-sm border border-gray-100 dark:border-gray-700
      ${hover ? 'transition-transform active:scale-[0.98] cursor-pointer' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}

// Input
export function Input({ 
  className = '',
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`
        w-full px-4 py-3 rounded-xl
        bg-gray-50 dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-white
        placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
        transition-all duration-200
        text-base
        ${className}
      `}
      {...props}
    />
  );
}

// Textarea
export function Textarea({ 
  className = '',
  ...props 
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`
        w-full px-4 py-3 rounded-xl
        bg-gray-50 dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-white
        placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
        transition-all duration-200
        text-base resize-none
        ${className}
      `}
      {...props}
    />
  );
}

// Avatar
export function Avatar({ 
  src, 
  alt = '',
  size = 'md',
  className = '',
}: { 
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const initials = alt.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className={`
      ${sizes[size]} rounded-full overflow-hidden
      bg-gradient-to-br from-red-500 to-purple-500
      flex items-center justify-center text-white font-bold
      ${className}
    `}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-sm">{initials}</span>
      )}
    </div>
  );
}

// Skeleton Loader
export function Skeleton({ 
  className = '',
}: { 
  className?: string;
}) {
  return (
    <div className={`
      animate-pulse bg-gray-200 dark:bg-gray-700 rounded
      ${className}
    `} />
  );
}

// Divider
export function Divider({ 
  className = '',
}: { 
  className?: string;
}) {
  return (
    <div className={`h-px bg-gray-200 dark:bg-gray-700 ${className}`} />
  );
}

// Progress Bar
export function Progress({ 
  value = 0,
  max = 100,
  className = '',
  color = 'red',
}: { 
  value?: number;
  max?: number;
  className?: string;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
}) {
  const colors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
  };

  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`}>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        className={`h-full ${colors[color]} rounded-full`}
      />
    </div>
  );
}

// Tabs
export function Tabs({ 
  tabs, 
  activeTab, 
  onChange,
  className = '',
}: { 
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`
            flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${activeTab === tab 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// Toggle
export function Toggle({ 
  checked, 
  onChange,
  className = '',
}: { 
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${checked ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}
        ${className}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
}

// Backdrop
export function Backdrop({ 
  onClick,
  className = '',
}: { 
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 ${className}`}
    />
  );
}

// Modal
export function Modal({ 
  isOpen, 
  onClose, 
  children,
  className = '',
}: { 
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`
          fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[90vw] max-w-md max-h-[90vh] overflow-auto
          bg-white dark:bg-gray-900 rounded-3xl p-6
          ${className}
        `}
      >
        {children}
      </motion.div>
    </>
  );
}

// Bottom Sheet
export function BottomSheet({ 
  isOpen, 
  onClose, 
  children,
  className = '',
}: { 
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`
          fixed z-50 bottom-0 left-0 right-0
          w-full max-h-[85vh] overflow-auto
          bg-white dark:bg-gray-900 rounded-t-3xl p-4
          safe-area-bottom
          ${className}
        `}
      >
        {children}
      </motion.div>
    </>
  );
}

// Tooltip
export function Tooltip({ 
  children, 
  text,
}: { 
  children: React.ReactNode;
  text: string;
}) {
  return (
    <div className="group relative inline-block">
      {children}
      <span className="
        absolute bottom-full left-1/2 -translate-x-1/2 mb-2
        px-2 py-1 bg-gray-900 text-white text-xs rounded
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all whitespace-nowrap z-50
      ">
        {text}
      </span>
    </div>
  );
}

// Empty State
export function EmptyState({ 
  icon,
  title,
  description,
  action,
}: { 
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && <p className="text-gray-500 dark:text-gray-400 mb-4">{description}</p>}
      {action}
    </div>
  );
}

// Loading Spinner
export function Spinner({ 
  size = 'md',
  className = '',
}: { 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg className="animate-spin w-full h-full text-red-500" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  );
}
