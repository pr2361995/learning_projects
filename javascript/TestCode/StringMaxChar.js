
function findMostFrequentChar(inputString) {
    if (typeof inputString !== 'string') {
        throw new Error('Input must be a string');
    }
    if (!inputString.length) {
        throw new Error('Input string cannot be empty');
    }

    const result = inputString.split('').reduce((acc, curr) => {
        if (!curr.trim().length) {
            return acc;
        }

        acc.frequency[curr] = (acc.frequency[curr] || 0) + 1;

        if (acc.frequency[curr] > acc.maxCount) {
            acc.maxCount = acc.frequency[curr];
            acc.maxChar = curr;
        }

        return acc;
    }, {
        frequency: {},
        maxChar: '',
        maxCount: 0
    });

    return {
        char: result.maxChar,
        count: result.maxCount
    };
}

try {
    const result = findMostFrequentChar("prasanth priyanga");
    console.log('Most frequent character:', result);
} catch (error) {
    console.error('Error:', error.message);
}

