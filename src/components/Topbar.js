import { Avatar, Flex, Button, Text,Spacer,Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverHeader } from '@chakra-ui/react'
import React from 'react'
import { BsArrowLeft,BsThreeDotsVertical,BsPencilSquare} from "react-icons/bs";
const Topbar = (props) => {
  return (
    <div>
        <Flex align='center' ms={4} fontWeight='bold' fontSize='xl' >
            <BsArrowLeft />
        <Text mx={4} >{props.name}</Text>
        </Flex>
        <Flex>
        <Flex bg='white' h='81px' w='100%' align='center' shadow='lg' p={5}>
            <Avatar src='/p1.jpg' marginEnd={3} />
            <Flex direction='column'>
            <Text fontWeight="light">
        From{" "}<Text as="span" color="black" fontWeight="semibold">{props.from}</Text>{" "}
      <br />
      To{" "} <Text as="span" color="black" fontWeight="semibold"> {props.to}</Text>
    </Text>
            </Flex>
            <Spacer />
            <Flex direction='column' align='center' gap={5}>
            <BsPencilSquare  />
            <Popover>
  <PopoverTrigger>
    <Button colorScheme='gray' variant='ghost'> <BsThreeDotsVertical/></Button>
  </PopoverTrigger>
  <PopoverContent w='fit-content' >
    
    <PopoverBody>
      <Flex direction='column'>
        <Text>Members</Text>
        <Text>Share Number</Text>
        <Text>Report</Text>
      </Flex>
    </PopoverBody>
  </PopoverContent>
</Popover>

           
          
          
            </Flex>
        </Flex>
        
        </Flex>
    </div>
  )
}

export default Topbar