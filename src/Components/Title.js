import React from 'react';
import { Heading } from '@chakra-ui/react'

const Title = ({ title, as=null, size=null }) => {
  return (
    <Heading as={as} size={size}>{title}</Heading>
  )
}

export default Title