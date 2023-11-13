let HOST_FRONTEND = "https://vybes-frontend.onrender.com";
let HOST_BACKEND = "https://vybes-backend.onrender.com";

if (process.env.NODE_ENV === 'development') {
  HOST_FRONTEND = "http://localhost:3000";
  HOST_BACKEND = "http://localhost:8000";
}

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const getUser = async ({ userId, token, setuser }) => {
  if (userId && token) {
    const response = await fetch(`${HOST_BACKEND}/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await response.json();
    if (response.ok) {
      setuser(user);
    } else {
      setuser(null);
    }
  } else {
    setuser(null);
  }
};

const getFriends = async ({ userId, token, setfriends }) => {
  const response = await fetch(`http://localhost:8000/user/${userId}/friends`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });
  if (response.ok) {
    const data = await response.json();
    setfriends(data);
  }
};

export {
  classNames,
  getUser,
  getFriends,
  HOST_FRONTEND,
  HOST_BACKEND
};
