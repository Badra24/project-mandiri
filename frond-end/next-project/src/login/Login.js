import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  InputGroup,
  usecolorModeValue,
  InputRightElement,
  FormHelperText,
  Icon,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {FaFacebookF, FaGoogle } from "react-icons/fa"
import {userLogin} from "../redux/action/userLogin"




export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
   const toast = useToast();
  const router = useRouter();
  const authSelector = useSelector((state) => state.auth);
 
  const formik = useFormik({
    initialValues: {
      username : "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("username harus di isi"),
      email: Yup.string().required("email harus diisi"),
      password: Yup.string().required("password harus diisi"),
    }),
    validateOnChange: false,
    onSubmit:  (values) => {
      try{
        
        dispatch(userLogin(values, formik.setSubmitting))
        toast({
          status: "success",
        title: " login"
        })
      } catch(err){
        toast({
          status: "error",
        title: "failed login"
        })
      }
    },
  });
  useEffect(() => {
    if (authSelector?.id) {
      router.push("/home");
    }
  }, [authSelector?.id]);
  
  const register = () =>{

    router.push("/register")
  }

  
  return (
    <Flex backgroundColor= "#000000"   height="100vh" alignItems="center" justifyContent="center">
      <Flex wrap="wrap" id="background-register" rounded="2xl">

      <Flex direction="column"  padding= {8} borderRightWidth="10px" borderColor="white" h="500px">
        <Heading mb={6} size="3xl"  fontFamily="Koulen" justifyContent="center" textColor="white">
          hello hello 
        </Heading>
        <Heading border={2} borderColor="white"></Heading>
        <Text mb={20} textColor="white" fontFamily="Koulen" size="3xl">Let start journey with us </Text>
        
        <Button
            mb={6}
            backgroundColor="#4FD1C5"
            color={"white"}
            onClick={register}
            _hover={{
              bg: "blue.500",
            }}
            // onClick={formik.handleSubmit}
            >
            Sign up
          </Button>
          
      </Flex>
      <Flex >
        <Flex direction="column"  p={6} rounded="2xl" marginLeft={4} h="600px" >
          <Heading mb={6} color={"white"}>
            Login
          </Heading>
            <Flex color ="white"mb="15px" justifyContent="left" rounded="full" alignContent="space-around" >
            <Heading border="2px"padding="3" mx="1" marginLeft="15px" size="sm" rounded="full">< FaGoogle /></Heading>
            </Flex>
            <FormControl color="white"id="username" isInvalid={formik.errors.username}>
              <FormLabel>Username</FormLabel>

              <Input
                type="username"
                onChange={(event) =>
                  formik.setFieldValue("username", event.target.value)
                }
                />
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>
            <FormControl color="white"id="email" isInvalid={formik.errors.email}>
              <FormLabel>Email address</FormLabel>

              <Input
                type="email"
                onChange={(event) =>
                  formik.setFieldValue("email", event.target.value)
                }
                />
              <FormHelperText>{formik.errors.email}</FormHelperText>
            </FormControl>
          <FormControl
            id="password"
            isInvalid={formik.errors.password}
            placeholder="********"
            variant="filled"
            color="white"
            mb={6}
            >
            <FormLabel>Password</FormLabel>

            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(event) => {
                  formik.setFieldValue("password", event.target.value);
                }}
              />
              <InputRightElement h={"30px"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                  >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText>{formik.errors.password}</FormHelperText>
          </FormControl>
          <Button
            mb={5}
            height="35px"
            backgroundColor="#4FD1C5"
            color="white"
            _hover={{
              bg: "blue.500",
            }}
            onClick={formik.handleSubmit}
            >
            Login
          </Button>
  
   
           
        </Flex>
      </Flex>
            </Flex>
            <Box>
            <Blur
          position={'absolute'}
          top={-10}
          left={-10}
          style={{ filter: 'blur(70px)' }}
        />
              </Box>

    </Flex>
  );
}
export const Blur = (props,IconProps) => {
                return (
                  <Icon
                    width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
                    zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
                    height="560px"
                    viewBox="0 0 528 560"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...props}>
                    <circle cx="71" cy="61" r="111" fill="#54BAB9" />
                    <circle cx="244" cy="106" r="139" fill="#54BAB9" />
                    <circle cy="291" r="139" fill="#54BAB9" />
                    <circle cx="80.5" cy="189.5" r="101.5" fill="#54BAB9" />
                    <circle cx="196.5" cy="317.5" r="101.5" fill="#810955" />
                    <circle cx="70.5" cy="458.5" r="101.5" fill="#810955" />
                    <circle cx="426.5" cy="-0.5" r="101.5" fill="#810955" />
                  </Icon>
                );
              };