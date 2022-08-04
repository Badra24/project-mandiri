import { Box, Flex, Icon, chakra, useToast, Button, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { axiosInstance } from "../../config/api";
import { useRouter } from "next/router";

export default function verify(){
  const [verified, setVerified] = useState([])
  const router = useRouter()
const Toast = useToast()
const { vertoken } = router.query

  useEffect(()=>{
    async function v_verified () {
    alert(vertoken)
    const res = await axiosInstance.patch("/user/verify/" + vertoken )
      if(res.data){
        const success = res.data.success
        console.log(success);
        setVerified(true)

        Toast({
          title:"success",
          description : "user verified",
          status : "success",
          isClosable: true,
        })
      }
    } 
    if(vertoken != undefined)
    {
      v_verified ()

    }

  }, [router?.isReady])

  return (
    <>
      {router.isReady ? (
        <>

      {!verified ? (
        <>
      <Flex
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      shadow="md"
      alignItems="center"
      justifyContent="center"
      >
     
        <Headers fontWeight = {600}>
        V for verified
        </Headers>

      <Button
      colorScheme={"facebook"}
      spacing={3}
      align={"center"}
      rounded="full"
      _hover={{
        bg:"blue.500"
      }}
      onClick > </Button>

              </Flex>
          </>
    ) : (
      <>
      <Flex justifyContent="center" alignItems="center" w={12} bg="green.500">
      <Icon as={IoMdCheckmarkCircle} color="white" boxSize={6} />
      </Flex>
      
      <Box mx={-3} py={2} px={4}>
      <Box mx={3}>
      <chakra.span
      color="green.500"
      _dark={{ color: "green.400" }}
      fontWeight="bold"
      >
            Success
            </chakra.span>
            <chakra.p
            color="gray.600"
            _dark={{ color: "gray.200" }}
            fontSize="sm"
            >
            Your account was registered!
            </chakra.p>
            </Box>
            </Box>
</>

      )}


      </>

      ) : (
      <>

      </>
      
      )} 
      </>

      );
};

