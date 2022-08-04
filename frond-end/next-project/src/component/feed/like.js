import { Box, Avatar, Text, Divider, Link } from '@chakra-ui/react';

export default function ManyLike(props) {
 const { slUsername, slFullname, slImg_Url, slUserId } = props
 return (
  <Box >
   <Box display='flex'>
    <Avatar
     size='md'
     name='Prosper Otemuyiwa'
     src={`http://${slImg_Url}`}
    />
    <Box ml='20px' >
     <Text fontWeight='semibold'>{slFullname}</Text>
    </Box>
   </Box>
   <Divider my='10px' />
  </Box>
 )
}