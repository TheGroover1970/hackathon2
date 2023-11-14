import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Switch,
} from "@chakra-ui/react";
import { useFormik } from "formik";

export default function Form() {
  const formikInit = useFormik({
    initialValues: {
      postcode: "",
      specificProperty: false,
    },
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form submitted with values:", values);
    },
  });
  return (
    <Flex h="100vh">
      <Box bg="white" py={6} rounded="md">
        <form onSubmit={formikInit.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="address" mb="0">
                Do you know the specific Property
              </FormLabel>
              <Switch
                id="specificProperty"
                name="specificProperty"
                isChecked={formikInit.values.specificProperty}
                onChange={formikInit.handleChange}
              />
              {/* <FormLabel htmlFor="postCode">
                Do you know the specific Property
              </FormLabel>
              <Field
                as={Input}
                id="postCode"
                name="postCode"
                type="postCode"
                variant="filled"
              /> */}

              <FormLabel htmlFor="postcode">UK Postcode</FormLabel>
              <Input
                type="text"
                id="postcode"
                name="postcode"
                placeholder="Enter UK Postcode"
                onChange={formikInit.handleChange}
              />
            </FormControl>

            <Button type="submit" colorScheme="purple" width="full">
              Search
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
