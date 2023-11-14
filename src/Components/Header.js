// Header.js
import React from "react";
import {
  Flex,
  Box,
  Spacer,
  Heading,
  IconButton,
  useColorMode,
  Container,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      align="center"
      p={4}
      bg={colorMode === "light" ? "blue.500" : "gray.800"}
    >
      <Box p="2">
        <Heading as="h1" size="lg" color="white">
          Your Logo
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
        />
      </Box>
    </Flex>
  );
};

export default Header;
