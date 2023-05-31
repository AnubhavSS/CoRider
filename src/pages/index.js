import Image from 'next/image'
import { useEffect,useState,useRef} from 'react';
import { Inter } from 'next/font/google'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer, MessageContainer, EllipsisButton,InfoButton,TypingIndicator,MessageSeparator, ChatContainer,ConversationHeader,  MessageList,
  Message,InputToolbox, AttachmentButton,SendButton,MessageInput,Avatar} from "@chatscope/chat-ui-kit-react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
const [info, setinfo] = useState({})

const inputRef = useRef();
const [msgInputValue, setMsgInputValue] = useState("");
const [messages, setMessages] = useState([]);

const handleSend = message => {
  setMessages([...messages, {
    message,
    direction: 'outgoing'
  }]);
  setMsgInputValue("");
  inputRef.current.focus();
};

  useEffect(() => {
    const corider = async () => {
      try {
        const response = await fetch('http://3.111.128.67/assignment/chat?page=0');
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        console.log(data.chats)
        setinfo(data)
      } catch (error) {
        console.error(error);
      }
    };
  
    corider();
  }, []);
  const customBubbleStyle = {
    backgroundColor: 'blueviolet',
  };
console.log(info)
  const localSender="Me"
  return (
   <div>
   <div style={{ 
  height: "100vh"
}}>
      <ChatContainer>
        <ConversationHeader style={{backgroundColor:'white'}}>
          <Avatar src={'./p1.jpg'} name="Emily" />
          <ConversationHeader.Content  userName={<div className=' bg-white'> {info.name}</div>} info={<div className=' bg-white'> From <span className='font-semibold text-black'>{info.from}</span><br />To <span className='font-semibold text-black'>{info.to}</span></div> }/>
          <ConversationHeader.Actions>
            
            <EllipsisButton orientation="vertical" style={{color:'black', fontSize:'16px'}} />
           
          </ConversationHeader.Actions>          
        </ConversationHeader>
        <MessageList>
          
           
          <MessageSeparator style={{ color:'gray'}} content={info.chats && info.chats[0].time} />
          
        { info.chats && info.chats.map(item=> <Message model={{
           message: item.message,
           sentTime: item.time,
           sender: item.sender.user_id,
           direction: "incoming",
           position: "single"
         }}
         key={item.id}  style={{backgroundColor:'white'}}
       >
            <Avatar src={item.sender.image} name={item.sender.user_id} />
          </Message>
)}
            
            {messages.map((m, i) => <Message key={i} model={m} />)}
        </MessageList>
        <MessageInput  placeholder="Type message here" attachButton={false} onSend={handleSend} onChange={setMsgInputValue} value={msgInputValue} ref={inputRef} />
        <InputToolbox>
        <AttachmentButton />
      </InputToolbox>
      </ChatContainer>
    </div>
   </div>
  )
}
