import { formatDistanceToNow, format } from 'date-fns';

/**
 * Format date relative to now (e.g., "2 hours ago")
 */
export const formatTimeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

/**
 * Format date to readable format (e.g., "Feb 24, 2026")
 */
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  return format(new Date(date), formatStr);
};

/**
 * Format time to readable format (e.g., "2:30 PM")
 */
export const formatTime = (date) => {
  return format(new Date(date), 'h:mm a');
};

/**
 * Format currency in INR
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Get status color class
 */
export const getStatusColorClass = (status) => {
  const colors = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    accepted: 'bg-blue-50 text-blue-700 border-blue-200',
    ongoing: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  };
  return colors[status] || colors.pending;
};

/**
 * Get status badge text
 */
export const getStatusText = (status) => {
  const texts = {
    pending: 'Pending',
    accepted: 'Accepted',
    ongoing: 'Ongoing',
    completed: 'Completed',
    rejected: 'Rejected',
  };
  return texts[status] || 'Unknown';
};

/**
 * Get urgency color class
 */
export const getUrgencyColorClass = (urgency) => {
  const colors = {
    flexible: 'bg-blue-50 text-blue-700 border-blue-200',
    moderate: 'bg-amber-50 text-amber-700 border-amber-200',
    urgent: 'bg-red-50 text-red-700 border-red-200',
  };
  return colors[urgency?.toLowerCase()] || colors.flexible;
};

/**
 * Merge class names conditionally
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Generate mock ID
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Check if array is empty
 */
export const isEmpty = (arr) => {
  return !arr || arr.length === 0;
};

/**
 * Simulate delay (for demo)
 */
export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
