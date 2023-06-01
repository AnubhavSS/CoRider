//import '@/styles/globals.css'
import { ChakraProvider,extendTheme } from '@chakra-ui/react'
export default function App({ Component, pageProps }) {

  const customTheme = extendTheme({
    colors: {
      customGreen: "#1EA509 ", // Replace with your custom color value
      customBlue:"#317BF4"
    },
  });
  

 return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
