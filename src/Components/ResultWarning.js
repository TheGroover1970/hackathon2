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
import { CheckIcon,SmallCloseIcon } from "@chakra-ui/icons";

const ResultWarning = () => {
  return (
    <>
      <Stack spacing={3}>

        <Alert status="warning">
          <AlertIcon />
          Action needed for 24 properties
        </Alert> 
      <List spacing={3}>
          <ListItem>
            <ListIcon as={SmallCloseIcon} color="red.500" />
            Property Tenure
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            EPC
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
      </Stack>
    </>
  );
};

export default ResultWarning;
