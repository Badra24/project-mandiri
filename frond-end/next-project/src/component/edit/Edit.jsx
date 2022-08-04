import {
    Button, ModalBody, ModalHeader,
    ModalContent, ModalCloseButton, FormControl,
    FormLabel, Input, Box, Textarea, useToast, Image
  } from '@chakra-ui/react'
  import { useFormik } from "formik";
  import { useState, useRef, useEffect } from 'react';
  import { axiosInstance } from "../../config/api"
  import { useDispatch, useSelector } from 'react-redux';
  import { useRouter } from "next/router";
  import qs from 'qs'
  
  
  export default function EditContent(props) {
    const { captionEdit, locationEdit, imageEdit, idEdit, onClose } = props;
    const [selectedFile, setSelectedFile] = useState(null)
    const router = useRouter();
  
    const userSelector = useSelector((state) => state.auth)
  
    const toast = useToast()
  
    const inputFileRef = useRef(null)
  
    const formik = useFormik({
      initialValues: {
        caption: `${captionEdit}`,
        location: `${locationEdit}`,
      },
      onSubmit: async () => {
        const formData = new FormData();
        const { caption, location } = formik.values
  
        // formData.append("caption", caption)
        // formData.append("location", location)
        try {
          let body = {
            caption,
            location,
            
          }
  
          await axiosInstance.patch("/post/" + idEdit, qs.stringify(body)).then(() => {
            toast({
              title: `Post has been edit`,
              status: "success",
              isClosable: true,
            })
          })
  
        } catch (err) {
          console.log(err);
  
          toast({
            title: 'ERROR',
            status: "error",
            isClosable: true,
          })
        }
      }
    })
  
    const handleFile = (event) => {
      setSelectedFile(event.target.files[0])
    }
  
    return (
      <>
        <ModalContent>
          <ModalHeader>Edit Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} >
            <Box display='flex' flexWrap='wrap' justifyContent='space-evenly'>
              <Box mt='10px'>
                <FormControl>
                  <FormLabel>Caption</FormLabel>
                  <Textarea placeholder='Write a caption . . .' maxLength='2000'
                    onChange={(e) => {
                      formik.setFieldValue("caption", e.target.value)
                    }} defaultValue={captionEdit} />
                </FormControl>
  
                <FormControl mt='10px'>
                  <FormLabel>Location</FormLabel>
                  <Input placeholder='Location' maxLength='2000' w='400px'
                    onChange={(e) => {
                      formik.setFieldValue("location", e.target.value)
                    }} defaultValue={locationEdit} />
                </FormControl>
                <Box mt={'17px'} justifyContent='flex-end'>
                  <Button mr={3} colorScheme='twitter' onClick=
                    {() => {
                      async function submit() {
                        await formik.handleSubmit();
                        
                      }
                      submit()
                    }}>
                    Edit Post
                  </Button>
                </Box>
              </Box>
            </Box>
  
          </ModalBody>
        </ModalContent>
      </>
    )
  }