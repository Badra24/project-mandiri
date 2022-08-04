import React from "react";
import {
  FcSearch,
  FcCamcorder,

} from "react-icons/fc"
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  Link,
  Image
} from "@chakra-ui/react";
import { Logo } from "@choc-ui/logo";
import {
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiOutlineSearch,
  AiFillBell,
} from "react-icons/ai";
import { BsFillCameraVideoFill, } from "react-icons/bs";
const navbarDashboard = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 4,
          sm: 4,
        }}
        py={1}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto" rounded={2}>
<Avatar className="relative hidden lg:inline-grid h-24 w-24 rounded-2xl"> 
              <Image classname ="rounded-full"src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Kd4qmtXO2BGn-mEsrLgDTdvEExb6ws_Vsg&usqp=CAU" 
              layout = "fill"
              objectFit="contain"/>
              </Avatar>
           
          <HStack display="flex" spacing={3} alignItems="center">


            <HStack
              spacing={3}
           
              display={{
                base: "none",
                md: "inline-flex",
              }}
              >

                 <InputGroup className="realtive mt-1 p-3">
              <InputLeftElement pointerEvents="none">
                <FcSearch />
              </InputLeftElement>
              <Input type="text" placeholder="Search..." />
            </InputGroup>
                <Link href={"/home"}>

              <Button
                variant="ghost"
                leftIcon={<AiFillHome />}
                justifyContent="center"
                alignItems="center"
                size="5px"
                ></Button>
                </Link>

              <Button
                variant="ghost"
                colorScheme="brand"
                leftIcon={<AiOutlineInbox />}
                justifyContent="center"
                alignItems="center"
                size="5px"
              ></Button>
              <Button
                variant="ghost"
                leftIcon={<BsFillCameraVideoFill />}
                justifyContent="center"
                alignItems="center"
                size="5px"
              ></Button>
            </HStack>
          </HStack>
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >

            <chakra.a
              p={3}
              color="gray.800"
              _dark={{
                color: "inherit",
              }}
              rounded="sm"
              _hover={{
                color: "gray.800",
                _dark: {
                  color: "gray.600",
                },
              }}
            >
              <AiFillBell />
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a>
            <Link href={"/login"}>

            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src="https://th.bing.com/th/id/R.75fbd5dc7c0535bf108e6eac5d22b4aa?rik=xXYqycIq%2foQOSw&riu=http%3a%2f%2fcomic-cons.xyz%2fwp-content%2fuploads%2fStar-Wars-avatar-icon-Darth-Vader.png&ehk=umaem4SpCeqd3qXMl1ZhcmPrCszrsU0Ax1yaqtBYpxw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
              />
              </Link>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
export default navbarDashboard;
