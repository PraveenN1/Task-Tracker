import { useEffect, useState } from "react";
import axios from "axios";

const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000", { withCredentials: true })
      .then((res) => {
        setUser(res.data.name);
      })
      .catch(() => {
        setUser(null); // user not logged in or token invalid
      });
  }, []);

  return user;
};

export default useCurrentUser;
