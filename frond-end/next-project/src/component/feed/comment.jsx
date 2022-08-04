import {
  Box, Flex, Text, Divider, Button, Icon, Tooltip, useDisclosure, ModalFooter
  , useToast, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, Input, Stack, FormControl, FormHelperText, Link, propNames, Avatar
} from "@chakra-ui/react";import { axiosInstance } from "../../config/api";
import { useState,useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import qs from 'qs';
import * as Yup from "yup";



  export default function Comment(props) {
    const toast = useToast()
    const {isOpen : isOpenDelete, onOpen : onOpenDelete, onClose: onCloseDelete} = useDisclosure()
    const {cmUsername, cmDate, cmComment , cmAvatar , cmId, cmPostId,cmUserId,cmNumbComment} = props
    const userSelector = useSelector((state) => state.auth)
    const [editInput, setEditInput] = useState(false)
    const dispatch = useDispatch()
    const autoReducer = useSelector((state) => state.autoRender)
    async function deletComment (){
      const { comment_post } = formik.values
      try{
        let body = {
          comment_post : cmComment,
          UserId: userSelector.id,
          PostId: cmId
        }
await axiosInstance.delete("/comment/" + cmId)
await axiosInstance.patch("/post/" + cmPostId, qs.stringify(body))
dispatch({
  type: "RENDER_POST",
  payload: { value: !autoReducer.value }
})
toast({
  title : "succes",
  description : "deleted",
  status : "success",
  isClosable : true,
})
      }catch(err) {
        console.log(err);
      }
    }
    const formik = useFormik({
        initialValues:{
          comment_post:`${cmComment}`,

            
        },
        validationSchema : Yup.object().shape({
          comment_post : Yup.string().required("Edit is required")
        }),
        validateOnChange : false,
        onSubmit: async () =>{
            const { comment_post } = formik.values
  
           
  
            try{
              let body = {
                comment_post : comment_post,
                UserId: userSelector.id,
              PostId: cmId
              }
              await axiosInstance.patch("/post/" + cmId, qs.stringify(body)).then(()=>{
                  setEditInput(false)

                 
                    toast({
                        title: 'comment edited ',
                        status: 'success',
                        isClosable: true,
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
  
    return (
      <>
        <Divider />
        <Box display='flex' justifyContent='space-between'>
          <Box>
            <Flex>
              {/* <Text fontWeight='semibold' fontSize='sm' textColor='gray.800'>{moment(cmDate).format('DD-MMMM-YYYY')}</Text> */}
            </Flex>
            <Text fontWeight='semibold' fontSize='xs' mt='-8px' textColor='gray.400'>{moment(cmDate).fromNow()}</Text>
<Flex>
  <Avatar src={cmAvatar} size={"xs"} ></Avatar>
<Text fontWeight={"bold"} display="flex" paddingRight={"5px"} paddingLeft={"5px"} marginBottom={3}>
{cmUsername}

  </Text>

  {cmComment}


</Flex>


            
  
            <Box w='390px'>
              {!editInput ?
                <Text fontWeight='semibold' fontSize='sm' textColor='gray.600'>
                </Text> :
                <FormControl isInvalid={formik.errors.comment_post}>
                  {/* <Text>{formik.values.comment_post}</Text> */}
                  <Input size='sm' mb='5px' type='text' maxLength='300'
                    onChange={(event) =>
                      formik.setFieldValue("comment_post", event.target.value)}
                    defaultValue={cmComment} />
                  <FormHelperText color="red">
                    {formik.errors.comment_post}
                  </FormHelperText>
                </FormControl>
              }
            </Box>
          </Box>
  
          <Box mt='5px'>
            {userSelector.id == cmUserId ?
              !editInput ?
                <>
                  {/* <Tooltip label='Edit Comment' fontSize='sm' >
                    <Button colorScheme="messenger" mr='5px' my='5px' size='sm' onClick={() => setEditInput(true)}>
                      <Icon boxSize={4} as={FaEdit} />
                    </Button>
                  </Tooltip> */}
                  <Tooltip label='Delete Comment' fontSize='sm' >
                    <Button colorScheme='red' size='sm' onClick={onOpenDelete}>
                      <Icon boxSize={3} as={FaTrashAlt} />
                    </Button>
                  </Tooltip>
                </> :
                <>
                  <Tooltip label='Save' fontSize='sm' >
                    <Button colorScheme='green' mr='5px' my='5px' size='sm'
                      onClick=
                      {() => {
                        async function submit() {
                        await formik.handleSubmit();
                        }
                        submit()
                      }}>
                      <Icon boxSize={4} as={IoIosSave} />
                    </Button>
                  </Tooltip>
                  <Tooltip label='Cancel' fontSize='sm' >
                    <Button colorScheme='red' size='sm' onClick={() => setEditInput(false)}>
                      <Icon boxSize={3}  />
                    </Button>
                  </Tooltip>
                </>
              :
              null
            }
            <Modal isOpen={isOpenDelete} onClose={onCloseDelete} size='xs'>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Comment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box justifyContent={'space-between'}>
                    <Text>Are you sure want to delete this comment?</Text>
                  </Box>
                </ModalBody>
                <ModalFooter pt='5px'>
                  <Button colorScheme='blue' mr={3} onClick={onCloseDelete}>
                    Close
                  </Button>
                  <Button mr={3} colorScheme='red' onClick={() => {
                    async function submit() {
                      await deletComment();
                      onCloseDelete();
                    }
                    submit()
                  }}>
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </>
    );
  };
  
  

  