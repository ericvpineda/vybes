function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const getUser = async ({userId, token, setuser}) => {
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await response.json();
    if (response.ok) {
      setuser(user);
    }
  };

export {classNames, getUser};