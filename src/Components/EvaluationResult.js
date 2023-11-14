import React from "react";
import { Box, Text } from "@chakra-ui/react";

const EvaluationResult = ({ success, evaluation }) => {
  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Box p="6">
        <Text fontSize="xl" fontWeight="semibold" mb="2">
          Evaluation Result
        </Text>
        {success ? (
          <Box>
            {evaluation.map((item, index) => (
              <Box key={index} mb="4">
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color={item.type.toLowerCase()}
                >
                  {item.title}
                </Text>
                <Text color="gray.600">{item.description}</Text>
              </Box>
            ))}
          </Box>
        ) : (
          <Text color="red.500">Evaluation failed</Text>
        )}
      </Box>
    </Box>
  );
};

export default EvaluationResult;
