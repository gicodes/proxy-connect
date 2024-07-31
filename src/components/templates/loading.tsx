import React from 'react';
import { Text } from '@chakra-ui/react';

const LoadingConnect = () => {
  return (
    <div>
        <Text
          className="justify-center px-4 lg:px-8"
          fontSize={"18"}
          fontWeight={"248"}
        > 
          Searching for services available...
        </Text>
    </div>
  )
}

export default LoadingConnect;