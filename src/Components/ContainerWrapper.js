import React from 'react';
import { Container } from '@chakra-ui/react';

const ContainerWrapper = ({ children }) => {
  return (
    <Container maxW="container.xl" mt={4} mb={8}>
      {children}
    </Container>
  );
};

export default ContainerWrapper;