// Helper to validate file
const validateFile = (base64String) => {
    if (!base64String) return { file_valid: false };

    try {
        const buffer = Buffer.from(base64String, 'base64');
        const mimeType = require('file-type').fromBuffer(buffer);

        return {
            file_valid: !!mimeType,
            file_mime_type: mimeType ? mimeType.mime : null,
            file_size_kb: buffer.length / 1024,
        };
    } catch (err) {
        return { file_valid: false };
    }
};

// Helper to check prime numbers
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Process POST Request
const processPostRequest = async (data) => {
    const { full_name, dob, input, file_base64 } = data;

    if (!full_name || !dob || !input || !Array.isArray(input)) {
        return { is_success: false, message: 'Invalid Input' };
    }

    // Generate User ID
    const user_id = `${full_name.replace(/\s/g, '_').toLowerCase()}_${dob.replace(/\//g, '')}`;

    // Separate Numbers and Alphabets
    const numbers = input.filter((val) => typeof val === 'number');
    const alphabets = input.filter((val) => typeof val === 'string' && /^[a-zA-Z]$/.test(val));

    // Highest Lowercase Alphabet
    const lowercaseAlphabets = alphabets.filter((char) => char === char.toLowerCase());
    const highestLowercase = lowercaseAlphabets.sort().pop() || null;

    // Check for Prime Number
    const primeExists = numbers.some((num) => isPrime(num));

    // File Validation
    const fileDetails = validateFile(file_base64);

    // Response
    return {
        is_success: true,
        user_id,
        college_email_id: `${user_id}@college.edu`,
        college_roll_number: `ROLL_${Math.floor(Math.random() * 1000)}`,
        numbers,
        alphabets,
        highest_lowercase: highestLowercase,
        prime_exists: primeExists,
        file: fileDetails,
    };
};

module.exports = { processPostRequest, validateFile, isPrime };
