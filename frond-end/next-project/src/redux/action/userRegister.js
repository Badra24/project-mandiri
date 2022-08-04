import jsCookie from "js-cookie";
import { axiosInstance } from "../../config/api";
import auth_style from "../reducer/types";
import qs from "qs"
import { useToast } from "@chakra-ui/react"

export function userRegister(values, setSubmitting) {
    return async function (dispatch) {
        try {

let body = {
username: values.username,
 email: values.email,
password: values.password,
full_name : values.full_name
};
// console.log(JSON.stringify(body));
      alert("Registered")
      const res = await axiosInstance.post("/user/register", qs.stringify(body));

      // const userData = res.data[0]
      console.log(res.data)

      const userData = res.data.result.user
      const token = res.data.result.token


      // if (userData.password !== values.password) {
      //   throw new Error("Wrong password");
      // }

      // const userData = res.data[0];
    //   const stringifiedUserData = JSON.stringify(userData.email);

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
