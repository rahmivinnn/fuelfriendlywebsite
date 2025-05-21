<<<<<<< HEAD
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a string
 */
export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {}): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj);
}

/**
 * Formats a number as currency
 */
export function formatCurrency(amount: number, currency: string = 'USD', options: Intl.NumberFormatOptions = {}): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };
  
  return new Intl.NumberFormat('en-US', defaultOptions).format(amount);
}

/**
 * Truncates a string to a specified length
 */
export function truncateString(str: string, maxLength: number = 50): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Generates a random ID
 */
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Debounces a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Checks if the device is mobile
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Checks if the device is a tablet
 */
export function isTablet(): boolean {
  return /(iPad|tablet|Tablet|Android(?!.*Mobile))/i.test(navigator.userAgent);
}

/**
 * Checks if the device is desktop
 */
export function isDesktop(): boolean {
  return !isMobile() && !isTablet();
}

/**
 * Gets the device type
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
}

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Validates a phone number
 */
export function isValidPhone(phone: string): boolean {
  const re = /^\+?[0-9]{10,15}$/;
  return re.test(String(phone).replace(/\s+/g, ''));
}

/**
 * Validates a password
 */
export function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
}

/**
 * Gets the strength of a password
 */
export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (!password) return 'weak';
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  if (score < 3) return 'weak';
  if (score < 5) return 'medium';
  return 'strong';
}

/**
 * Formats a file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Converts hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

/**
 * Converts RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Gets a random color
 */
export function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * Gets a contrasting text color (black or white) based on background color
 */
export function getContrastColor(hexColor: string): 'black' | 'white' {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return 'black';
  
  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  
  return luminance > 0.5 ? 'black' : 'white';
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

/**
 * Delays execution for a specified time
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Checks if an object is empty
 */
export function isEmptyObject(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Gets a value from localStorage with expiration check
 */
export function getWithExpiry(key: string): any {
  const itemStr = localStorage.getItem(key);
  
  if (!itemStr) return null;
  
  const item = JSON.parse(itemStr);
  const now = new Date();
  
  if (item.expiry && now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  
  return item.value;
}

/**
 * Sets a value in localStorage with expiration
 */
export function setWithExpiry(key: string, value: any, ttl: number): void {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  
  localStorage.setItem(key, JSON.stringify(item));
}

/**
 * Checks if the app is running in a PWA
 */
export function isPwa(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
}

/**
 * Checks if the device is online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Formats a phone number
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  
  return phoneNumber;
=======
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
}
