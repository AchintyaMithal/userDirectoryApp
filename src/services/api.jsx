const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Fetch users from the provided API
export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Fetch user details by ID from the provided API
export const getUserDetails = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
};

// Fetch posts by user ID from the provided API
export const getUserPosts = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
};

// Fetch list of countries and timezones from the provided API
export const getCountries = async () => {
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

// Fetch current time for a specific country and timezone from the provided API
export const getCurrentTime = async (area) => {
  try {
    const response = await fetch(`http://worldtimeapi.org/api/timezone/${area}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current time:', error);
  }
};
