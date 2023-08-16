const logoutUser = async ( id ) => {
  await fetch('http://localhost:3000/api/logout', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });
}

export default logoutUser;