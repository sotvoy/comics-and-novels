'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  showText?: boolean;
}

// YouTube-style animated button
export default function AnimatedButton({
  children,
  variant = 'default',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  icon,
  iconPosition = 'left',
  showText = true,
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  const variantClasses = {
    default: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white',
    primary: 'bg-red-500 hover:bg-red-600 text-white',
    secondary: 'bg-blue-500 hover:bg-blue-600 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => {
        setIsPressed(false);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className={`
        relative flex items-center justify-center rounded-full font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      initial={{ scale: 1 }}
      animate={{ scale: isPressed ? 0.95 : 1 }}
    >
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {showText && <span>{children}</span>}
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </motion.button>
  );
}

// YouTube-style Like Button with animation
interface LikeButtonProps {
  initialLiked?: boolean;
  initialCount?: number;
  onClick?: (liked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function LikeButton({ 
  initialLiked = false, 
  initialCount = 0,
  onClick,
  size = 'md'
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const handleClick = () => {
    setIsAnimating(true);
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setCount(prev => newLiked ? prev + 1 : prev - 1);
    onClick?.(newLiked);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const formatCount = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`flex items-center gap-1 group ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={isAnimating ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Icons.Heart className={`${sizeClasses[size]} ${isLiked ? 'fill-current' : ''}`} />
      </motion.div>
      <span className="text-sm font-medium">{formatCount(count)}</span>
    </motion.button>
  );
}

// YouTube-style Bookmark/Save Button
interface SaveButtonProps {
  initialSaved?: boolean;
  onClick?: (saved: boolean) => void;
}

export function SaveButton({ initialSaved = false, onClick }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);

  const handleClick = () => {
    setIsSaved(!isSaved);
    onClick?.(!isSaved);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`flex items-center gap-1 group ${isSaved ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'}`}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    >
      <Icons.Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
      <span className="text-sm font-medium">{isSaved ? 'Saved' : 'Save'}</span>
    </motion.button>
  );
}

// YouTube-style Share Button
interface ShareButtonProps {
  onClick?: () => void;
}

export function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    >
      <Icons.Share className="w-6 h-6" />
      <span className="text-sm font-medium">Share</span>
    </motion.button>
  );
}

// YouTube-style Subscribe Button
interface SubscribeButtonProps {
  initialSubscribed?: boolean;
  subscriberCount?: number;
  onClick?: (subscribed: boolean) => void;
}

export function SubscribeButton({ 
  initialSubscribed = false, 
  subscriberCount = 0,
  onClick 
}: SubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);

  const handleClick = () => {
    setIsSubscribed(!isSubscribed);
    onClick?.(!isSubscribed);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`
        px-6 py-2 rounded-full font-medium flex items-center gap-2
        ${isSubscribed 
          ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300' 
          : 'bg-red-500 hover:bg-red-600 text-white'
        }
      `}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
    >
      {isSubscribed ? (
        <>
          <Icons.CheckCircle className="w-5 h-5" />
          <span>Subscribed</span>
        </>
      ) : (
        <>
          <span>Subscribe</span>
          <span className="text-xs opacity-80">{subscriberCount > 0 ? subscriberCount.toLocaleString() : ''}</span>
        </>
      )}
    </motion.button>
  );
}

// YouTube-style Follow Button
interface FollowButtonProps {
  initialFollowing?: boolean;
  onClick?: (following: boolean) => void;
}

export function FollowButton({ initialFollowing = false, onClick }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const handleClick = () => {
    setIsFollowing(!isFollowing);
    onClick?.(!isFollowing);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`
        px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1
        ${isFollowing 
          ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300' 
          : 'bg-red-500 hover:bg-red-600 text-white'
        }
      `}
      whileTap={{ scale: 0.95 }}
    >
      {isFollowing ? (
        <>
          <Icons.Check className="w-4 h-4" />
          <span>Following</span>
        </>
      ) : (
        <>
          <Icons.UserPlus className="w-4 h-4" />
          <span>Follow</span>
        </>
      )}
    </motion.button>
  );
}

// YouTube-style Play Button
interface PlayButtonProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showText?: string;
}

export function PlayButton({ onClick, size = 'md', showText }: PlayButtonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-2 text-white hover:text-red-500"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`${sizeClasses[size]} bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors`}>
        <Icons.Play className={`${size === 'sm' ? 'w-4' : size === 'md' ? 'w-6' : 'w-8'} h-` + (size === 'sm' ? '4' : size === 'md' ? '6' : '8')} fill-current`} />
      </div>
      {showText && <span className="font-medium">{showText}</span>}
    </motion.button>
  );
}

// YouTube-style Plus Menu Button (for create menu)
interface PlusMenuButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
}

export function PlusMenuButton({ isOpen = false, onClick }: PlusMenuButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="w-12 h-8 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Icons.Plus className="w-5 h-5 text-white" />
      </motion.div>
    </motion.button>
  );
}

// YouTube-style Icon Button (circular)
interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary';
}

export function IconButton({ 
  icon, 
  onClick, 
  label,
  size = 'md',
  variant = 'default'
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      className={`
        ${sizeClasses[size]} rounded-full flex items-center justify-center
        ${variant === 'primary' 
          ? 'bg-red-500 text-white hover:bg-red-600' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }
      `}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    >
      {icon}
    </motion.button>
  );
}

// YouTube-style Notification Button with badge
interface NotificationButtonProps {
  count?: number;
  onClick?: () => void;
}

export function NotificationButton({ count = 0, onClick }: NotificationButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    >
      <Icons.Bell className="w-6 h-6" />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
        >
          {count > 9 ? '9+' : count}
        </motion.span>
      )}
    </motion.button>
  );
}
