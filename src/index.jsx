import React from 'react'
import ReactDOM from 'react-dom/client'
import Script from './Script'
import './style.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { BrowserRouter as Router } from 'react-router-dom'


const styles ={

  global: (props) =>({

    body:{

      bg:mode("gray.100", "#000")(props),
      color:mode("gray.800", "#fff")(props)

    }

  })

}


const config ={

	initialColorMode: "dark",
	useSystemColorMode: false,

}

const theme = extendTheme({ config, styles })


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Router>

        <ChakraProvider theme={theme}>

            <Script />

        </ChakraProvider>

    </Router>

  </React.StrictMode>
)
