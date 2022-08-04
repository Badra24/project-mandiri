import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  Center,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useToast,
  Stack,
  FormControl,
  FormLabel,
  useColorModeValue,
  HStack,
  Spacer,
  Divider
} from "@chakra-ui/react";
import DarkmodeSwitch from "../../component/DarkmodeSwitch"
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift,AiOutlinePlus } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import React from "react";
import { useFormik } from 'formik'
import { Logo } from "@choc-ui/logo";
import {GiExitDoor} from "react-icons/gi"
import AvatarWithRipple from"../../component/Icon/Onlineicon"
import auth_style from "../../redux/reducer/types"
import jsCookie from "js-cookie"
import {useDispatch,useSelector} from "react-redux"
import {useRouter} from "next/router"
import { axiosInstance } from "../../config/api"
import InfiniteScroll from 'react-infinite-scroller'
import { useState,useEffect, useRef } from "react";
import testInput from "../test_input";
import ContentCard from "../../component/card/StarwarsCard"




const HomeIndex = () => {

  const autoReducer = useSelector((state) => state.autoRender)

  const sidebar = useDisclosure();
  const [page, setPage] = useState(1)
  const [postList,setPostList] =  useState([])

  const fetchPostList = async () => {
  
      axiosInstance.get(`/post/paging`)
        .then((res) => {
          const temp = res.data.result
          setPostList(temp)
          // setContentList((contentList) => [...contentList, ...newPost])
          console.log(res)
          // console.log(temp[0].User)
        })
        .catch((err) => {
          // alert(err)
        })
      
    
  };

  const seeMore = async () => {
    const req = await axiosInstance.get(`/post/paging?page=${page}&limit=${5}`)
    const newPost = req.data.result
    if (newPost.length != 0) {
      setPostList([...postList, ...newPost])
      setPage(page + 1)
    }
    console.log(page);
    console.log(req.data.result);
   };

  //  useEffect(() => {
  //   fetchPostList()
  // },[])
  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="blackAlpha.700"
        _hover={{
          bg: "blackAlpha.300",
          color: "whiteAlpha.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "gray.300",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };
  const dispatch = useDispatch();
  const router = useRouter()

  const [selectedFile, setSelectedFile] = useState(null)
  const toast = useToast()

  const inputFileRef = useRef(null)
  const userSelector = useSelector((state)=>(state.auth))
 const [isLoading, setIsloding] = useState(true)
  const handleFile = (event) => {
      setSelectedFile(event.target.files[0])
  }

    const formik = useFormik({
        initialValues:{
            caption:'',
            location:'',
            id: userSelector.id,

        },
        onSubmit: async () =>{
            const formData = new FormData()
            const { caption, location } = formik.values

            formData.append("caption", caption)
            formData.append("location", location)
            formData.append("user_id", userSelector.id)
            formData.append("image", selectedFile)

            try{
                await axiosInstance.post("/postimage/mongo", formData).then(()=>{

                    toast({
                        title: 'Post has been added',
                        status: 'success',
                        isClosable: true,
                    })

                    dispatch({
                      type: "RENDER_POST",
                      payload : {
                        value : !autoReducer.value
                      }
                    })
                })
            } catch (err) {
                console.log(err)

                toast({
                    title: 'Error',
                    status: "error",
                    isClosable: true,
                })
            }
        }
    })

    const [postUser,setPostUser] = useState([])
    
    useEffect(() => {
      fetchPostList()
    },[autoReducer])

const setting = () => {

  router.push("/setting")
}
  
  const logout = () => {
 
    jsCookie.remove("auth_token");
    jsCookie.remove("user_data");
  

    dispatch({ type: auth_style.AUTH_LOGOUT });
    router.push("/")
  };
const register = () =>{

  router.push("/register")

}

const Verification_account = () =>{
  router.push("/setting")
}
useEffect(() => {
  if (!userSelector?.id ){

    router.push("/")
  } else{
    setIsloding(false)
  }

},[userSelector?.id])



  const SidebarContent = (props) => (
    <Box
    textColor={useColorModeValue("black","white")}
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
    bg="brand.600"
      borderColor="blackAlpha.200"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Logo />
        <Text fontSize="3xl" ml="2"  fontWeight="semibold" fontFamily="Koulen">
          SOCIAL MEDIA BETA
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        aria-label="Main Navigation"
      >
        <NavItem icon={AiFillGift} onClick={register}>Register</NavItem>
        <NavItem icon={BsGearFill} onClick={setting}>Settings</NavItem>
 <NavItem icon={GiExitDoor} onClick={logout}>logout</NavItem>
      </Flex>
    </Box>
  );


  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  return (
    <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease" >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input placeholder="Search for articles..." />
          </InputGroup>
          {userSelector.is_verified ? 
            <IconButton 
   
            onClick={onOpen}
            icon={<AiOutlinePlus />}
            size="md" />
            : 
            <>
          
          <Button
          onClick={Verification_account}
          borderWidth={3}
          colorScheme={"teal"}
          _hover={{
            bg:"teal.900"
          }}>
  Verification your account
          </Button>
       
            </>
          }

<DarkmodeSwitch />

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
            <Stack spacing={4} >

                <FormControl>
                <FormLabel>Image</FormLabel>
                <Input type={'file'} display={"none"} onChange={handleFile}
                accept={"image/png, image/jpg, image/jpeg, image/gif"}
                ref={inputFileRef}  ></Input>
                <Button colorScheme={"blue"}
                onClick={() => inputFileRef.current.click()}>Upload Image</Button>
                </FormControl>

                <FormControl>
                    <FormLabel>Caption</FormLabel>
                    <Input onChange={(e)=>{
                        formik.setFieldValue('caption', e.target.value)
                    }}></Input>
                </FormControl>

                <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Input onChange={(e)=>{
                        formik.setFieldValue("location",e.target.value)
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

            <Link href={"/profile"}>
          <Flex align="center" gap={4}  width={65}>
            {/* <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpaVMzgPEebRYQYQs24mLQGoxTdiwrJxr69g&usqp=CAU"
              cursor="pointer"
            /> */}
                        {/* <Icon color="gray.500" as={FaBell} cursor="pointer" />  */}

            <AvatarWithRipple className="btn-outline-dark" bg='black' /> 
          </Flex>
            
            </Link>
        </Flex>

        <Box as="main" p="4" display='flex' justifyContent='center' >

            <Box justifyContent={'center'}>
              
            <InfiniteScroll
            pageStart={page}
            loadMore={seeMore}
            hasMore={true}
            // loader={<div className="loader" key={0}>Loading ...</div>}
            >
          {/* <Igcard /> */}
          {/* Add content here, remove div below  */}
          {postList.map((val, idx) => {
            return (
              <div key={idx}>
            <Center justifyContent={'center'}>
              <ContentCard 
                username={val.User?.username}
                caption={val.caption}
                image_url={val.image_url}
                location={val.location}
                numberOfLikes={val.number_of_likes}
                id={val.id}
                arrcomments = {val.Comments}
                avatarPost={val.User?.avatar_url}
                />
            </Center>
            </div>
          );
        })} 
        </InfiniteScroll>
        {/* <Box justifyContent={'center'}>
       


        <Button marginLeft={'38%'} onClick={()=> seeMore()}>seeMore</Button>
        </Box>
               */}

        </Box>
<Spacer>

</Spacer>
          <Box ml={3} w="250px" h="220px" wrap="warp" borderWidth="1px"  boxShadow="2xl" rounded="xl"
          fontSize={{ base: '1xl', sm: '3xl', md: '2xl' }}>
            <Stack display = "flex" borderStyle= "solid">
              
              <HStack>

              <AvatarWithRipple  className="btn-outline-dark" bg='black'
              
              />
              <Text fontFamily="koulen"> {`${userSelector.username}`} </Text>

              </HStack>
              <Divider />
              
            </Stack>
           

          </Box>
          
        </Box>
      
      </Box>


      
    </Box>
    
  );
};
export default HomeIndex;

