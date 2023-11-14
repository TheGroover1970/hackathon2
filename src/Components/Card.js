import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

const CardBox = ({ index, item, onClick }) => {
  return (
    <div onClick={onClick}>
      <Card key={index} mb={4}>
        <CardHeader>
          <Heading size="md">Customer Address</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {item.address}
              </Heading>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardBox;
