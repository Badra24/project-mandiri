import jsCookie from "js-cookie";
import { axiosInstance } from "../../config/api";
import auth_style from "../reducer/types";
import qs from "qs"
import axios from "axios";

export function userLogin(values, setSubmitting) {
  return async function (dispatch) {
    try {
      // const res = await axiosInstance.get("/user", {
      //   params: {
      //     email: values.email,
      //     username : values.email,
      //     password: values.password,
      //   },
      // });
      let body = {
         username: values.username,
        email: values.email,
        password: values.password,
        location: "",
        ip_adress: "",
      };
      body.ip_address = (await axios.get("https://api.ipify.org/?format=json%22")).data.ip;

      body.location = (await axios.get( `https://ipapi.co/${body.ip_address}/json/`)).data.country_capital;

      // console.log(qs.stringify(body));
      const res = await axiosInstance.post("/user/login", qs.stringify(body));

      // const userData = res.data[0]
      
      const userData = res.data.result.user
      const token = res.data.result.token
      
      if (!res.data.result) {
        throw new Error("User not found");
      }

      //  if (userData.password !== values.password) {
      //    throw new Error("Wrong password");
      //  }

      // const userData = res.data[0];
      // const stringifiedUserData = JSON.stringify(userData.email);

      console.log(userData);

      jsCookie.set("auth_token", token)
      dispatch({
        type:auth_style.AUTH_LOGIN,
        payload: userData,
      })

      // jsCookie.set("user_data", stringifiedUserData);
      // dispatch({
      //   type: auth_style.AUTH_LOGIN,
      //   payload: userData,
      // });

      setSubmitting(false);
    } catch (err) {
      console.log(err);

      setSubmitting(false);
    }
  };
}
