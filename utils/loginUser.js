const loginUser = async ( username, password ) => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        username,
        password
      }
    )
  });

  return response.status;
}

export default loginUser;