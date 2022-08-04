import { Avatar, Box, Flex, keyframes, MenuList } from "@chakra-ui/react";
import { useDispatch, useSelector} from 'react-redux';
export default function AvatarWithRipple() {
  const userSelector = useSelector((state)=>(state.auth))  
  const size = "40px";
  const color = "teal";

  const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="80px"
      w="80px"
      overflow="hidden"
    >
      {/* Ideally, only the box should be used. The <Flex /> is used to style the preview. */}
      <Box
        as="div"
        position="relative"
        w={size}
        h={size}
        _before={{
          content: "''",
          position: "relative",
          display: "block",
          width: "300%",
          height: "300%",
          boxSizing: "border-box",
          marginLeft: "-100%",
          marginTop: "-100%",
          borderRadius: "50%",
          bgColor: color,
          animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
        }}
      >
        <Avatar
          src= {`${userSelector.avatar_url}`}
          size="full"
          position="absolute"
          top={0}
        />
        {/* <MenuList>
          hashsdh
        </MenuList> */}
      </Box>
    </Flex>
  );
}
