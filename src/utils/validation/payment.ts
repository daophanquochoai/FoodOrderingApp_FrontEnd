/**
 * Validates credit card number using Luhn algorithm
 */
export const validateCardNumber = (cardNumber: string): string | undefined => {
    const sanitized = cardNumber.replace(/\s+/g, '');
    if (!sanitized) return "Card number is required";
    if (!/^\d+$/.test(sanitized)) return "Card number must contain only digits";
    if (sanitized.length < 13 || sanitized.length > 19) return "Card number should be between 13 and 19 digits";
    
    // Luhn algorithm for card number validation
    let sum = 0;
    let shouldDouble = false;
    for (let i = sanitized.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitized.charAt(i));
        
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    return sum % 10 === 0 ? undefined : "Invalid card number";
};

/**
 * Validates expiration date in MM/YY format
 */
export const validateExpiry = (expiry: string): string | undefined => {
    if (!expiry) return "Expiration date is required";
    
    // Check format MM/YY
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return "Format should be MM/YY";
    
    const [monthStr, yearStr] = expiry.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10) + 2000; // Convert to 4-digit year
    
    // Check month validity
    if (month < 1 || month > 12) return "Invalid month";
    
    // Check if card is expired
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    if (year < currentYear) return "Card has expired";
    if (year === currentYear && month < currentMonth) return "Card has expired";
    
    return undefined;
};

/**
 * Validates CVV code
 */
export const validateCVV = (cvv: string): string | undefined => {
    if (!cvv) return "CVV is required";
    if (!/^\d{3,4}$/.test(cvv)) return "CVV must be 3 or 4 digits";
    return undefined;
};

/**
 * Validates cardholder name
 */
export const validateCardholder = (cardholder: string): string | undefined => {
    if (!cardholder.trim()) return "Cardholder name is required";
    if (cardholder.trim().length < 3) return "Please enter full name";
    return undefined;
};

/**
 * Format card number with spaces after every 4 digits
 */
export const formatCardNumber = (value: string): string => {
    const sanitized = value.replace(/\D/g, '');
    const parts = [];
    for (let i = 0; i < sanitized.length; i += 4) {
        parts.push(sanitized.substring(i, i + 4));
    }
    return parts.join(' ');
};

/**
 * Format expiry date to MM/YY
 */
export const formatExpiry = (value: string): string => {
    const sanitized = value.replace(/\D/g, '');
    if (sanitized.length > 2) {
        return `${sanitized.slice(0, 2)}/${sanitized.slice(2, 4)}`;
    }
    return sanitized;
};

/**
 * Sanitize CVV to only contain digits and limit length
 */
export const formatCVV = (value: string): string => {
    return value.replace(/\D/g, '').substring(0, 4);
};