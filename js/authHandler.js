
export const authenticate = async (endpoint, username, password) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: username,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      const { jwt, user } = data;
      localStorage.setItem('jwtToken', jwt);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

export const isLoggedin = () => {

}






