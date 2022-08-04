import React from "react";
import { Box, Flex, Icon, Image, chakra,Tabs, TabList, TabPanels, Tab, TabPanel, Grid,GridItem} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PostProfile from "./PostProfile"
import { MdEmail, MdHeadset, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";

export default function App(){
  const userSelector = useSelector ((state)=> state.auth)
  return (
    <>
    
    <Flex
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="sm"
        mx="auto"
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Image
          w="full"
          h={56}
          fit="cover"
          objectPosition="center"
          src={`${userSelector.avatar_url}`}
          alt="avatar"
        />

        <Flex alignItems="center" px={6} py={3} bg="gray.900">
          <Icon as={MdHeadset} h={6} w={6} color="white" />

          <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
          {`${userSelector.username}`}
          </chakra.h1>
        </Flex>

        <Box py={4} px={6}>
          <chakra.h1
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "white" }}
          >
                      {`${userSelector.full_name}`}

          </chakra.h1>

          <chakra.p py={2} color="gray.700" _dark={{ color: "gray.400" }}>
            Full Stack maker & UI / UX Designer , love hip hop music Author of
            Building UI.
          </chakra.p>

          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
            arkham asylum
            </chakra.h1>
          </Flex>

          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <Icon as={MdLocationOn} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
            Ghottam city
            </chakra.h1>
          </Flex>
          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <Icon as={MdEmail} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
            {`${userSelector.email}`}
            </chakra.h1>
          </Flex>
        </Box>
        
      </Box>
      
    </Flex>

    <Tabs variant='unstyled'  >
    <TabList>
      <Tab boxSize="50px" w="100px" _selected={{ color: 'white', bg: 'blue.500' }} fontFamily="koulen">Post</Tab>
      <Tab  boxSize="50px" w="100px" _selected={{ color: 'white', bg: 'green.400' }}fontFamily="koulen">Like</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
      <PostProfile />
        
      </TabPanel>
      <TabPanel>
        <p>Like!</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
 
  </>
  );
};

