import toast from "react-hot-toast";

let HOST_FRONTEND = "https://vybes.onrender.com";
let HOST_BACKEND = "https://vybes-backend.onrender.com";

if (process.env.NODE_ENV === 'development') {
  HOST_FRONTEND = "http://localhost:3000";
  HOST_BACKEND = "http://localhost:8000";
}

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const getUser = async ({ userId, token }) => {
  if (userId && token) {
    const response = await fetch(`${HOST_BACKEND}/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      toast.error("Unable to fetch given user.")
      return null
    }
  } else {
    toast.error("Unable to fetch given user.")
    return null;
  }
};

export {
  classNames,
  getUser,
  HOST_FRONTEND,
  HOST_BACKEND
};
