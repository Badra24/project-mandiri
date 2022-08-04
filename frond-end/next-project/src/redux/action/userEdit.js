


import { axiosInstance } from "../../config/api";
import qs from "qs"
import auth_style from "../reducer/types";

  export function userEdit(values, setSubmitting) {
  return async function (dispatch) {
        try {

                // alert("asdas")
                      let body = {
                          username: values.username,
                         full_name: values.full_name,
                         bio: values.bio,
                         user_id: values.id,
                       };

            console.log(body)

                       const res = await axiosInstance.patch("/user/:id", qs.stringify(body));
                 
      console.log(res.data)
      dispatch({
        type:auth_style.AUTH_LOGIN,
        
        payload: res,
      })


      setSubmitting(false);
     
    } catch (err) {
      console.log(err);

      setSubmitting(false);
    }
  };
}

    
