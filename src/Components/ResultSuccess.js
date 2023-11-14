import React from "react";
import {
  Alert,
  AlertIcon,
  Heading,
  Stack,
  List,
  ListItem,
  ListIcon,
  Box,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const ResultSuccess = () => {
  return (
    <>
      <Stack spacing={3}>
        <Alert status="success">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            EPC
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Lease Property Tenure
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Construction Type
          </ListItem>
          {/* You can also use custom icons from react-icons */}
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Property Condition
          </ListItem>
        </List>
        <Alert status="info">
          <AlertIcon />
          <Heading as="h2" size="xl" noOfLines={1}>
            Improvements to consider
          </Heading>
        </Alert>
      </Stack>
    </>
  );
};

export default ResultSuccess;
