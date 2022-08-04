import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormHelperText, 
    Link,
    InputRightAddon,
    Icon
  } from "@chakra-ui/react";
  import { useState,useEffect } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

  import { useFormik } from "formik"
  import * as Yup from "yup"
  import YupPassword from "yup-password"
  import { useDispatch , useSelector} from "react-redux"
import  { userRegister } from "../../redux/action/userRegister"
import { useToast } from "@chakra-ui/react";
  import { useRouter } from "next/router"
  import { IoMdEye, IoMdEyeOff } from "react-icons/io";

  export default function simpleSignup() {
    YupPassword(Yup);
    const toast = useToast()
    const [showPassword, setShowPassword] = useState(false);
    const [passwordViewRep, setPasswordViewRep] = useState(false);
    const dispatch = useDispatch()
    const authSelector = useSelector((state) => state.auth);
    const formik = useFormik({
        initialValues: {
            full_name: "",
            username: "",
            password: "",
            email: "",
            confrimpassword : "",
        },

      validationSchema: Yup.object().shape( {
        email: Yup.string()
        .email("not a email")
        .required("tolong isi emailnya"),
        full_name: Yup.string().required("isi nama anda"),
        username: Yup.string().required("isi username anda"),
        password: Yup.string().required("isi password anda")
        .minLowercase(1, "harus ada 1 huruf kecil")
        .minUppercase(1, "harus ada 1 huruf besar")
        .minSymbols(1, "harus ada 1 symbol")
        .min(8, " minimal 8 karakter"),
        confrimpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
        
    }),
    validateOnChange : false,
    onSubmit : async (value)=>{
      try{
         dispatch(userRegister(value,formik.setSubmitting))
         
        //  .then(()=> {

        // }) )
        
        toast({
          title: "new user created", 
          description: "added user",
          status: "success",
          isClosable: true
        })
        
      }
      catch(err){
        toast({
          title: "ERROR",
          description: err.toString(),
          status: "error",
          isClosable: true
        })

      }
      
    }
})
const router = useRouter();

useEffect(() => {
  if (authSelector?.id) {
    router.push("/home");
  }
}, [authSelector?.id]);
const login = () =>{

  router.push("/")

}


    return (
  <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    id = "background-image"
    bg={useColorModeValue("transparant")}
    textColor="white">
    <Stack spacing={8} mx={'auto'}  >
      <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Sign up
        </Heading>
        <Text fontSize={'lg'} color={''}>
         {/* test register  */}
        {formik.values.username}
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('transparant', 'gray.700')}
        boxShadow={'lg'}
        width={"500px"}
        p={20}
        >
        
        <Stack spacing={4}>
            <Box>
              <FormControl id="fullname" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" onChange={
                    (e) => {
                    formik.setFieldValue("full_name", e.target.value)
                    }
                }/>
                <FormHelperText> {formik.errors.full_name} </FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="Username">
                <FormLabel>Username</FormLabel>
                <Input type="text" 
                onChange={
                    (e) => {
                    formik.setFieldValue("username", e.target.value)
                    }
                } />
                <FormHelperText> {formik.errors.username} </FormHelperText>

              </FormControl>
            </Box>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={
                    (e) => {
                    formik.setFieldValue("email", e.target.value)
                    }
                }/>
          <FormHelperText>{formik.errors.email}</FormHelperText>
          </FormControl>


          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} 
              onChange={
                (e) => {
                formik.setFieldValue("password", e.target.value)
                }
            }
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>

            </InputGroup>
            <FormHelperText> {formik.errors.password} </FormHelperText>


          </FormControl>
          <FormControl
              marginTop={"20px"}
              isInvalid={formik.errors.confrimpassword}
            >
             <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  required
                  maxLength={"30"}
                  type={passwordViewRep ? "text" : "password"}
                  onChange={(event) =>
                    formik.setFieldValue("confrimpassword", event.target.value)
                  }
                />
                <InputRightAddon>
                  <Icon
                    fontSize="xl"
                    onClick={() => setPasswordViewRep(!passwordViewRep)}
                    as={passwordViewRep ? IoMdEye : IoMdEyeOff}
                    sx={{ _hover: { cursor: "pointer" } }}
                  />
                </InputRightAddon>
              </InputGroup>
              <FormHelperText color="red">
                {formik.errors.confrimpassword}
              </FormHelperText>
            </FormControl>

          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={formik.handleSubmit}
              >
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Already have account? 
              <Button onClick={login} color={'blue.400'} ml="2">
                Login
                </Button>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
);
}
    
    // return (
    //   <Flex
    //     minH={"100vh"}
    //     align={"center"}
    //     justify={"center"}
    //     bg={useColorModeValue("gray.50", "gray.800")}
    //   >
    //     <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
    //       <Stack align={"center"}>
    //         <Heading fontSize={"4xl"} textAlign={"center"}>
    //           Sign up
    //         </Heading>
    //         <Text fontSize={"lg"} color={"gray.600"}>
    //           to enjoy all of our cool features ✌️
    //         </Text>
    //       </Stack>
    //       <Box
    //         rounded={"lg"}
    //         bg={useColorModeValue("white", "gray.700")}
    //         boxShadow={"lg"}
    //         p={8}
    //       >
    //         <Stack spacing={4}>
    //           <HStack>
    //             <Box>
    //               <FormControl id="firstName" isRequired>
    //                 <FormLabel>First Name</FormLabel>
    //                 <Input type="text" />
    //               </FormControl>
    //             </Box>
    //             <Box>
    //               <FormControl id="lastName">
    //                 <FormLabel>Last Name</FormLabel>
    //                 <Input type="text" />
    //               </FormControl>
    //             </Box>
    //           </HStack>
    //           <FormControl id="email" isRequired>
    //             <FormLabel>Email address</FormLabel>
    //             <Input type="email" />
    //           </FormControl>
    //           <FormControl id="password" isRequired>
    //             <FormLabel>Password</FormLabel>
    //             <InputGroup>
    //               <Input type={showPassword ? "text" : "password"} />
    //               <InputRightElement h={"full"}>
    //                 <Button
    //                   variant={"ghost"}
    //                   onClick={() =>
    //                     setShowPassword((showPassword) => !showPassword)
    //                   }
    //                 >
    //                   {showPassword ? <ViewIcon /> : <ViewOffIcon />}
    //                 </Button>
    //               </InputRightElement>
    //             </InputGroup>
    //           </FormControl>
    //           <Stack spacing={10} pt={2}>
    //             <Button
    //               loadingText="Submitting"
    //               size="lg"
    //               bg={"blue.400"}
    //               color={"white"}
    //               _hover={{
    //                 bg: "blue.500",
    //               }}
    //             >
    //               Sign up
    //             </Button>
    //           </Stack>
    //           <Stack pt={6}>
    //             <Text align={"center"}>
    //               Already a user?{" "}
    //               <Link href={"/"} color="blue">
    //                 Login
    //               </Link>
    //             </Text>
    //           </Stack>
    //         </Stack>
    //       </Box>
    //     </Stack>
    //   </Flex>
    // );