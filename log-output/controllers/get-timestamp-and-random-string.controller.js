import crypto from 'crypto';
const randomString = crypto.randomUUID();

console.log(`Random String: ${randomString}`);
const getTimestampAndRandomString = () => {
    const timestamp = new Date().toISOString();
    return {
        timestamp: timestamp,
        randomString: randomString
    };
};

export default getTimestampAndRandomString;