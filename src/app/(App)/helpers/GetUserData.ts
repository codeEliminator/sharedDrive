const fetchUserData = async () => {
  const response = await fetch('http://localhost:2525/api/user', { credentials: 'include' });
  if (response.ok) {
    const data = await response.json();
    return data
  }
};
export default fetchUserData