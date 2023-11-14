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
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";

const ResultFailed = () => {
  return (
    <>
      <Stack spacing={3}>
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={SmallCloseIcon} color="red.500" />
            Construction Type
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            EPC
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Property Tenure
          </ListItem>
          {/* You can also use custom icons from react-icons */}
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Property Condition
          </ListItem>
        </List>
      </Stack>
    </>
  );
};

export default ResultFailed;
