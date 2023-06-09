import Head from 'next/head'
import { useEffect,useState,useRef } from 'react'
import { Inter } from 'next/font/google'
import { Flex, Text, Avatar,Box } from '@chakra-ui/react'
import Topbar from '@/components/Topbar'
import Bottombar from '@/components/Bottombar'

import {  useBottomScrollListener } from 'react-bottom-scroll-listener';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [info, setinfo] = useState({})
let [messages, setmessages] = useState([])
const [page, setPage] = useState(0);
const [index, setindex] = useState(5)
const ref=useRef(null)



const fetchChats = async (page) => {
  try {
    const response = await fetch(`https://qa.corider.in/assignment/chat?page=${page}`);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    return data || {};
  } catch (error) {
    console.error(error);
    return {};
  }
};

useEffect(() => {
  const initialFetch = async () => {
    const initialChats = await fetchChats(0);
    
   setinfo(initialChats)
  };

  initialFetch();


}, []);

const sentMessage = (val) => {
  if (messages.length === 1) {
    messages.pop();
  }
  messages.push(val);
  console.log(messages);

  const newChats = [...info.chats];
  newChats.splice(index, 0, ...messages);

  setinfo((prevInfo) => ({
    ...prevInfo,
    chats: newChats,
  }));
};

  const loadMoreChats = async () => {
   
    const nextPage = page + 1;
    const newChats = await fetchChats(nextPage);
    setinfo((prevInfo) => {
      return {
        ...prevInfo,
        from:newChats.from,
        to:newChats.to,
        name:newChats.name, 
        chats: [...(prevInfo.chats || []), ...newChats.chats],
      };
    });
    if(messages.length==1)
 {
  messages.pop()
 }
    setPage(nextPage); 
    setindex(index+5)
    
  };


  // When ScrollBar hits bottom 
  useBottomScrollListener(loadMoreChats, {
    offset: 100,
    debounce: 1,
    triggerOnNoScroll: true
  });
  

  
  return (
    <>
      <Head>
        <title>Corider</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    
    
      <Flex flex={1} h={'100vh'} direction={'column'}>
        <Topbar name={info.name} to={info.to} from={info.from} />
      
 
        {/* Main Body */}

       <Box>
        <Flex flex={1} direction={'column'} pt={4} mx={5}  position='relative'    >


        <Box textAlign="center" color='gray.300'>
      <Box borderBottom="1px solid " mx="auto" width="100%" my={4} />
      <Box as="span" bg="white" px={2} fontSize='smaller' position="relative" top="-30px">
        {info.chats && info.chats[0].time}
      </Box>
    </Box>

        {/* Incoming */} 
        
        {info.chats &&
  info.chats.slice(0,index).map((item) =>
    !item.message.startsWith('@12') ? (
      <Flex key={item.id}>
        <Avatar src={item.sender.image} marginEnd={1} size='sm' />
        <Flex bg='whiteAlpha.200' w='fit-content' minWidth='100px' borderRadius='lg' p={2} m={1}>
          <Text boxShadow='lg' p='6' rounded='md' fontSize='sm' ref={ref}   >
            {item.message}
          </Text>
        </Flex>
      </Flex>
    ) : (
      <Flex key={item.id} bg='customBlue' alignSelf='flex-end' w='fit-content' minWidth='100px' borderRadius='lg' p={2} m={1}>
        <Text color={'white'} fontSize='sm'>
          {item.message.substring(3)}
        </Text>
      </Flex>
    )
  )}
        </Flex>
        </Box>
        
        <Bottombar sentMessage={sentMessage} />
       
        
      </Flex>
    </>
  )
}
