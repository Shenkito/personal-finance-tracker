// src/utils/formatDate.js

export const formatDate = (dateString) => {

    if (!dateString) return "No transactions yet"; // Return a default message if no date is provided

    return new Date(dateString).toLocaleString(); // Format the date for display

};
