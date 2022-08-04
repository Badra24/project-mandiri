import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";
import auth_style from "../redux/reducer/types";
import { axiosInstance } from "../config/api";

function Authprovider({ children }) {
  const [isAuthChecked, setisAuthChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fecthdata = async() =>{

      const userToken = jsCookie.get("auth_token");
      
      if (userToken) {
        const userResponse = await axiosInstance.get("/user/refresh-token");
        if(userResponse) {
          dispatch({
            type: auth_style.AUTH_LOGIN,
            payload: userResponse.data.result.user,
          });
        }
        else
        {
          dispatch({
            type: auth_style.AUTH_LOGOUT,
          });
        }
    




    }




    setisAuthChecked(true);
  }
  fecthdata()
  },[]);

  if (!isAuthChecked) return <div>loading</div>;
  return children;
}

export default Authprovider;
