export function generateRandomColor(transactionId) {

    let hash = 0;

    for (let i = 0; i < transactionId.length; i++) {
        hash = transactionId.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to a hex color
    const color = `#${((hash >> 24) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 16) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 8) & 0xFF).toString(16).padStart(2, '0')}`;

    return color.substring(0, 7); // Ensure the color is a valid hex
}
