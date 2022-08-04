import {
  Box,
  Image,
  Avatar,
  Text,
  Icon,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  useToast,
  Link,
  Divider,
  FormControl,
  InputGroup,
  InputRightElement,
  IconButton

} from "@chakra-ui/react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { BiPlanet } from "react-icons/bi"
import { BsThreeDotsVertical } from "react-icons/bs"
import { axiosInstance } from "../../config/api";
import axios from "axios";
import CommentPost from "../feed/comment"
import ManyLike from "../feed/like";
import EditContent from "../edit/Edit";
import qs from 'qs';
import { FcLike } from "react-icons/fc";
import { useRouter } from "next/router";

import moment from 'moment';
import { useFormik } from "formik";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';





function ContentCard(props) {
  const {numberOfLikes, arrcomments, username, location, caption, number_Of_likes, number_of_comments, image_url, id, createdDate ,avatarPost} = props;
  const [Comments, setComments] = useState([...arrcomments]);
  const [commentInput, setCommentInput] = useState("");
  const [displayCommentInput, setDisplayCommentInput] = useState(false);
  const [likeInput, setlikeInput] = useState(numberOfLikes);
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()  
  const { isOpen:isOpenLike, onOpen : onOpenLike, onClose : onCloseLike} = useDisclosure()
  const toast = useToast()
  const [manyLikePost,setManyLikePost] = useState([])
  const userSelector = useSelector ((state)=> state.auth)
  const [displayLikeInput, setDisplayLikeInput] = useState()
  const [displaySaveInput, setDisplaySaveInput] = useState(false)
  const [scrollBehavior, setScrollBehavior] = useState('inside')
  const dispatch = useDispatch()
  const router = useRouter();
  const autoReducer = useSelector((state) => state.autoRender)
  const [numbComments, setNumComments] = useState(number_of_comments)

  // -------------------- Delete Post Content -------------------- //
  async function deletePost() {
    try {
      let body = {

        UserId: userSelector.id,
        PostId: id
      }
      

      await axiosInstance.patch("/user/" + userSelector.id, qs.stringify(body))
      await axiosInstance.delete("/post/" + id)
      dispatch({
        type: "RENDER_POST",
        payload: { value: !autoReducer.value }
      })

      toast({
        title: "Succes",
        description: "Succes deleting Post",
        status: "success",
        isClosable: true,
      })
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: err.toString(),
        status: "error",
        isClosable: true,
      })
    }
  }

  // -------------------- Like Post Content -------------------- //
  // ---------- Add and Delete Like ---------- //
  const handleLikeInput = async () => {
    // if (!idUserLike) {
    if (!displayLikeInput) {
      setlikeInput(likeInput + 1)
      setDisplayLikeInput(true)
      // alert(numberOfLikes)

      try {
        let body = {
          number_of_likes: likeInput,
        }
        let body2 = {
          UserId: userSelector.id,
          PostId: id
        }

        await axiosInstance.patch('/post/' + id, qs.stringify(body))
        await axiosInstance.post('/like', qs.stringify(body2))
        dispatch({
          type: "RENDER_POST",
          payload: { value: !autoReducer.value }
        })
      } catch (err) {
        console.log(err);
      }
    } else {
      setlikeInput(likeInput - 1)
      setDisplayLikeInput(false)
      // alert(numberOfLikes)
      const dislike = numberOfLikes ? numberOfLikes-1 : 0;
      try {
        let body = {
          number_of_likes: dislike,
        }
        await axiosInstance.patch('/post/' + id, qs.stringify(body))
        await axiosInstance.delete(`/like/user/${userSelector.id}/post/${id}`)
        dispatch({
        type: "RENDER_POST",
         payload: { value: !autoReducer.value }
        })
      } catch (err) {
        console.log(err);
      }
    }
  };

  // ---------- Fetching who Like Content Post ---------- //
  async function fetchManyLikePost() {
    try {
      axiosInstance.get("/like/post/" + id)
        .then((res) => {
          setManyLikePost(res.data.result)
          const temp = res.data.result

          // console.log(temp[0].User)
        })
    } catch (err) {
      console.log(err)
    }
  };

  const renderManyLikePost = () => {
    {manyLikePost?  manyLikePost.map((val, index) => {
      return (
        <ManyLike key={index}
          slImg_Url={val.User?.image_url}
          slUsername={val.User?.username}
          slFullname={val.User?.full_name}
          slUserId={val.User?.id}
        />
      )
    }):
    null}
    
   
  }

  useEffect(() => {
    fetchManyLikePost()
  }, [autoReducer]);

  // -------------------- Comment Post Content -------------------- //
  // ---------- Add Comment ---------- //
  const formik = useFormik({
    initialValues: {
      comment_post: "",
    },
    onSubmit: async () => {
      const { comment_post } = formik.values
      try {
        let body = {
          content: comment_post,
          UserId: userSelector.id,
          PostId: id
        }
        let body2 = {
          number_of_comments: arrcomments.length + 1,
        }

 

        setNumComments(numbComments + 1)
        await axiosInstance.patch("/post/" + id, qs.stringify(body2))
        await axiosInstance.post("/comment/post", qs.stringify(body))
        dispatch({
        type: "RENDER_POST",
       payload: { value: !autoReducer.value }
        })
        toast({
          title: `Comment send`,
          status: "success",
          isClosable: true,
        })
      } catch (err) {
        console.log(err);
      }
      formik.setSubmitting(false)
      formik.resetForm('content', "")
    }
  })

  // // ---------- Fetching Comments ---------- //
  async function fetchCommentPost () {
    try {
      axiosInstance.get("/comment/post/" +id)
        .then((res) => {
          
          setComments(res.data.result)
           const temp = res.data.result
        })
    } catch (err) {
      console.log(err)
    }
  };


 

  const renderCommentPost = () => {
    return Comments.map((val, index) => {
      
    console.log(val)

      return (
        <CommentPost key={index}
          cmUsername={val.User?.username}
          cmDate={val.createdAt}
          cmComment={val.content}
          cmUserId={val.UserId}
          cmPostId={val.PostId}
          cmId={val.id}
          cmAvatar={val.User?.avatar_url}
          cmNumComment={val.Post?.number_of_comments}
        />
      )
    })
  }

  useEffect(() => {
    fetchCommentPost()
  }, [autoReducer?.value]);

  return (
    <Box borderWidth="1px" borderRadius="lg" maxW="lg" paddingY="2" marginY="4">
      {/* Card Header */}
      <Box paddingX="3" paddingBottom="2" display="flex" alignItems="center" justifyContent="space-between">
  
        <Box display="flex">

        <Avatar
          src={`${avatarPost}`}
          size="md"
        />
        <Box marginLeft="2">
          <Text fontSize="md" fontWeight="bold">
            {username}
          </Text>
          <Text fontSize="sm" color="GrayText">
            {location} , {moment(createdDate).format("DD-MM-YYYY")}
          </Text>
        </Box>
          </Box>
      <Box>
        <Menu>
          <MenuButton cursor="pointer" >
        <Icon boxSize={6} as={ BsThreeDotsVertical }/>

          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpenEdit}>Edit Post</MenuItem>
            <Modal isOpen={isOpenEdit} onClose={onCloseEdit} size='md' maxH = "370px" maxW="420px">
                  <ModalOverlay />
                      <EditContent 
                      imageEdit={image_url}
                      captionEdit={caption}
                      locationEdit={location}
                      idEdit={id}/>
                  {/* <ModalContent>
                    <ModalHeader>Edit Post</ModalHeader>

                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <Box justifyContent={'space-between'}>
                        <Text>Are you sure want to edit this post?</Text>
                      </Box>
                      <Box mt='10px' display='flex' justifyContent='flex-end'>
                        <Button mr={3} colorScheme='blue' onClick={() => {
                          // async function submit() {
                          //   await deletePost();
                          //   onCloseDelete();
                          // }
                          // submit()
                        }}>
                          Edit
                        </Button>
                      </Box>
                    </ModalBody>
                  </ModalContent> */}
                </Modal>
            <MenuItem onClick={onOpenDelete}>Delete Post</MenuItem>
            <Modal isOpen={isOpenDelete} onClose={onCloseDelete} size='xs'>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Delete Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <Box justifyContent={'space-between'}>
                        <Text>Are you sure want to delete this post?</Text>
                      </Box>
                      <Box mt='10px' display='flex' justifyContent='flex-end'>
                        <Button mr={3} colorScheme='red' onClick={() => {
                          async function submit() {
                             await deletePost();
                             onCloseDelete();
                          }
                           submit()
                        }}>
                          Delete
                        </Button>
                      </Box>
                    </ModalBody>
                  </ModalContent>
                </Modal>
          </MenuList>
        </Menu>
      </Box>
      </Box>

      {/* Card Media/Content */}
      <Image 
      cursor={"pointer"}
      src={image_url} minW="lg"
      onClick={() => {          
        router.push(`/postDetail/${id}`);}} />

      {/* Action Buttons */}
      <Box paddingX="3" paddingY="2" display="flex" alignItems="center">
        <Icon 
        onClick={() => handleLikeInput ()}
        boxSize={6} as={displayLikeInput ? FcLike :  FaRegHeart} sx={{_hover : {cursor : "pointer",} }} />
        
        <Icon
          onClick={() => setDisplayCommentInput(true)}
          marginLeft="4"
          boxSize={6}
          as={FaRegComment}
          sx={{
            _hover: {
              cursor: "pointer",
            },
          }}
        />
        <Icon boxSize={7} 
        marginLeft="370px" 
        as={ BiPlanet }
        sx={{
          _hover: {
            cursor: "pointer",
          },
        }}
         />
      </Box>

      {/* Like Count */}
      <Box paddingX="3">
        <Text fontWeight="bold" fontSize="md"> 
        <Link className = "linkModal" onClick={onOpenLike} style={{ textDecoration : "none"}}>{likeInput} likes
        </Link>
        </Text>
        <Text fontWeight="bold" fontSize='xs' textColor='gray.500'>
          {moment(createdDate).fromNow()}
        </Text>
      </Box>
      <Modal isOpen={isOpenLike} onClose={onCloseLike} scrollBehavior={scrollBehavior} size='xs'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>Likes</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            {renderManyLikePost()} 
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Caption */}
      <Box paddingX="3">
        <Text display="inline" fontWeight="bold" marginRight="2">
          {username}
        </Text>
        <Text display="inline">{caption}</Text>
      </Box>
      <Box paddingX="3" marginTop="4">

        <Text fontWeight="bold" decoration="uderline" marginBottom="2">
        {displayCommentInput ? 
          // <Box display="flex">
          //   {/* <Input
          //   onChange="2"
          //   marginBottom="2"
          //   type="text"
          //   placeholder="Insert Comment"
          //   marginRight="4" />
          //   <Button  colorScheme="green">
          //     POST
          //   </Button> */}
          
          <Link className='linkModal' onClick={() => setDisplayCommentInput(false)} style={{ textDecoration: 'none' }}>
          Close Comments
        </Link>
        :
        <Link className='linkModal' onClick={() => setDisplayCommentInput(true)} style={{ textDecoration: 'none' }}>
          See {arrcomments?.length}  Comments
        </Link>
          
}
        </Text>
        {!displayCommentInput ?
          null :
          <>
          <Box mb='5px'>
            {renderCommentPost()}
          </Box>
          </>
        }
      </Box>
      <Divider />
      <FormControl>
        {/* <Text>{formik.values.content}</Text> */}
        <InputGroup size='sm'>
          <Input id='inputComment'
            onChange={(event) =>
              formik.setFieldValue("comment_post", event.target.value)}
            focusBorderColor='none'
            border='0'
            maxLength='300'
            pr='4.5rem'
            type='text'
            value={formik.values.comment_post}
            placeholder='Add Comment'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' variant='ghost'
              onClick={formik.handleSubmit}
              disabled={formik.values.comment_post.length > 0 ? false : true} >
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Box>
  );
}

export default ContentCard;
