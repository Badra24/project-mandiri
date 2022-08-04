import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Avatar,
    AvatarGroup,
    useBreakpointValue,
    IconProps,
    Icon,
    useToast,
    Link,
    useDisclosure,
    Modal, 
    ModalCloseButton,
    ModalOverlay, 
    ModalHeader, 
    ModalBody,
    FormControl, 
    FormLabel, 
    FormHelperText, 
    ModalContent,
    ModalProfPicture,
    IconButton,
  } from '@chakra-ui/react';
  import { AiOutlinePlus } from "react-icons/ai";
  import { GrHomeRounded } from "react-icons/gr"
  import { useRef, useState, useEffect } from "react";
  import { useFormik } from "formik";
  import { useRouter } from "next/router";
// import  userEdit from '../../redux/action/userEdit';
 import * as Yup from "yup"
import { useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {GoVerified} from "react-icons/go"
import { axiosInstance } from "../../config/api"
import { userEdit } from '../../redux/action/userEdit';
import auth_style from '../../redux/reducer/types';
import qs from 'qs';

export default function SettingProfile() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedFile,setSelectedFile] = useState(null)
    const toast = useToast()
    const autoReducer = useSelector((state) => state.autoRender)
 const [isLoading, setIsloding] = useState(true)
    const dispatch = useDispatch(); 
    const inputFileRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const initialRef = React.useRef (null)
const router = useRouter()
const handleFile = (event) =>{
  setSelectedFile(event.target.files[0])
}
const userSelector = useSelector((state)=>(state.auth))


const formik = useFormik({
  initialValues : {
    full_name: `${userSelector?.full_name}`,
    username: `${userSelector?.username}`,
    bio: `${userSelector?.bio}`,
    id: userSelector.id,
    avatar_url : `${userSelector?.avatar_url}`
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    full_name: Yup.string().required("full name is required"),
  }),
  validateOnChange: false,
  onSubmit: async (values, {setSubmitting}) => {
    const formData = new FormData()
const {full_name,username,bio} = formik.values

    formData.append("avatar", selectedFile)
    formData.append("user_id", userSelector.id)
    formData.append("full_name", full_name)
    formData.append("username", username)
    formData.append("bio", bio)


    try{
      console.log(selectedFile)
      // dispatch(userEdit(value,formik.setSubmitting))
      // console.log(userSelector)

     const res =  await axiosInstance.patch(`/user/${userSelector.id}`, formData)
    //  .then(()=>{
      console.log("sdsadas")
      console.log(userSelector.id)
        dispatch({
          type:auth_style.AUTH_LOGIN,
          payload: res.data.result,
        })


        toast({
            title: 'Post has been added',
            status: 'success',
            isClosable: true,
        })

      
    // })
    console.log(res)

    setSubmitting(false);

      // toast({
      //   title: "new user created", 
      //   description: "added user",
      //   status: "success",
      //   isClosable: true
      // })
      
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
const sendVerification = async () => {

  const body = qs.stringify({ id : userSelector?.id, email: userSelector?.email,
  username : userSelector?.username})
  try{
    const res = await axiosInstance.post("/user/verifysend",
    body
    )

    toast({
      title: "Check the email",
      status:"success",
    isClosable:"true",

    })
    
  }catch(error){
    console.log(error);
  }
}
useEffect(() => {
  if (!userSelector?.id ){

    router.push("/")
  } else{
    setIsloding(false)
  }

},[userSelector?.id])


useEffect(()=>{
  userSelector.id
},[])




    return (
      <Box position={'relative'} zIndex={10} >
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}>
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
              Change Photo Profile{' '}
   
            </Heading>
           <Stack bg={'transparant'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}>
              <Stack spacing={4} >


            <Avatar
              src={`${userSelector.avatar_url}`}
              /> <Text
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
            lineHeight={1.2}> {formik.values.username}
              
          </Text>
             <IconButton 
         onClick={onOpen}
         icon={<AiOutlinePlus />}
         w="90px"
         zIndex="9999"
         size="md"
         align="center"
         bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }} />
    <Link href='/home'>
        <IconButton
        size="lg"
        mt={100}
        mb={4}
        icon= {< GrHomeRounded/> }/>
        </Link>
        {!userSelector.is_verified ? (
          <Button
          onClick={sendVerification}
          borderWidth={3}
          colorScheme={"facebook"}>
 Send Verification
          </Button>
        ):(
          
            <Icon as={GoVerified}
            mt={100}
            />

          
        )}
             <Modal
         initialFocusRef={initialRef}
         finalFocusRef={finalRef}
         isOpen={isOpen}
         onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
         <Box backgroundColor={"#FAFAFA"}>
        <Flex 
        minH={'80vh'}
        align={'center'}
        justify={'center'}>
            <Stack spacing={4}>

                <FormControl>
                <FormLabel>Image</FormLabel>
                <Input type={'file'} display={"none"} onChange={handleFile}
                accept={"image/png, image/jpg, image/jpeg, image/gif"}
                ref={inputFileRef}  ></Input>
                <Button colorScheme={"blue"}
                onClick={() => inputFileRef.current.click()
                
                }>Upload Image</Button>
                </FormControl>

                <FormControl>
                    <FormLabel>username</FormLabel>
                    <Input onChange={(e)=>{
                        formik.setFieldValue('username', e.target.value)
                    }}></Input>
                </FormControl>

                <FormControl align={'center'}>
                    <Button colorScheme={'green'} onClick={formik.handleSubmit}>Submit</Button>
                </FormControl>

            </Stack>
    
        </Flex>
    </Box>


          </ModalContent>
          </Modal>
         </Stack>
              </Stack>
          </Stack>
          <Stack
            bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}>
            <Stack spacing={4}>
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                    Setting Profile                
                     <Text
                  as={'span'}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text">{' '}
                     For username, email, and bio
                 
                </Text>
              </Heading>
             
            </Stack>
            <Box as={'form'} mt={10}>
              <Stack spacing={4}>
                <FormControl isInvalid={formik.errors.full_name}>
                <Input
                  placeholder="full_name"
                  defaultValue={userSelector.full_name}
                  onChange={(event) => formik.setFieldValue("full_name", event.target.value)}
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  />
                  </FormControl>
                  <FormControl isInvalid={formik.errors.username}>
                <Input
                  placeholder="username"
                  defaultValue={userSelector.username}
                  onChange={(event) => formik.setFieldValue("username", event.target.value)}
                  
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  />
                  </FormControl>
                  <FormControl isInvalid={formik.errors.username}>

                <Input
                  placeholder="Bio"
                  h="120px"
                  defaultValue={userSelector.bio}
                  onChange={(event) => formik.setFieldValue("bio", event.target.value)}
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  />

                  </FormControl>
              </Stack>
              <FormControl>

              <Button
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}
                onClick={formik.handleSubmit}>
                Submit
              </Button>
                  </FormControl>
            </Box>
            form
          </Stack>
        </Container>
        <Blur
          position={'absolute'}
          top={-10}
          left={-10}
          style={{ filter: 'blur(70px)' }}
        />
      </Box>
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