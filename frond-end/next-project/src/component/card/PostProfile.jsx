import { Grid,GridItem,Image,Center } from "@chakra-ui/react";
import { axiosInstance } from "../../config/api";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";

const PostProfile = () =>{
  const autoReducer = useSelector((state) => state.autoRender)
  const userSelector = useSelector((state)=> state.auth)
  const [postProfile , setPostProfile ] = useState([])
  useEffect(() => {
        async function f_postProfile() {
      try {
        const res = await axiosInstance.get("/post/" + userSelector.id)
                const data = res.data.result
                console.log('try');
                console.log(res.data.result);
                setPostProfile([...data])        
      } catch (error) {
          // alert('error')
          console.log(error)
      }
    }

    if(autoReducer?.value != undefined )
    {
      f_postProfile();
      console.log('ini ada ga');
      console.log(userSelector)
    }

  },[autoReducer])

return(
  <Center >

    <Grid  templateColumns='repeat(3, 1fr)' gap={2} gridAutoRows >
      {
        postProfile ?
        <>
         {postProfile.map((val,idx)=> {
           
           return(
             
             
                <Image 
                src={`${val.image_url}`}
                boxSize='md'
                objectFit={'cover'}
                transition="0.4s ease-in-out"
                _hover={{
                  filter:"auto",
                  brightness:"40%",
                }}

                />
             
          
                )
              })}  
        </>
      :<div>loading</div>
    }
         
            
    
  </Grid>
    </Center>
)
    }

export default PostProfile