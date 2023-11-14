import { Formik, Field } from "formik";
import React, { useState, useEffect } from "react";
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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import CardBox from "./Card";
import ResultSuccess from "./ResultSuccess";
import EvaluationResult from "./EvaluationResult";

export default function Form() {
  const [data, setData] = useState();
  const [postcode, setPostCode] = useState();
  const [loading, setLoading] = useState(true);
  const [uprn, setUprn] = useState();
  const [status, setStatus] = useState();
  const [show, setShow] = useState(false);

  const formikInit = useFormik({
    initialValues: {
      postcode: "",
    },
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form submitted with values:", values);
      fetchData(values.postcode);
    },
  });

  const fetchData = async (postcode) => {
    try {
      const response = await axios.get(
        `https://jubilant-zebra-rq57wq76xgx3pw66-5000.app.github.dev/getaddresses/${postcode}`
      );
      // Update state with the fetched data
      setData(response.data);
      setLoading(false);
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchUprn = async (uprn) => {
    try {
      const response = await axios.get(
        `https://jubilant-zebra-rq57wq76xgx3pw66-5000.app.github.dev/evaluateproperty/${uprn}`
      );
      setLoading(false);
      setStatus(response.data);
      console.log(status);
      setShow(true)
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }; 

  useEffect(() => {}, [status]);

  return (
    <Flex h="50vh">
      <Box bg="white" py={6} rounded="md">
        <form onSubmit={formikInit.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="postcode">UK Postcode</FormLabel>
              <Input
                mb={4}
                type="text"
                id="postcode"
                name="postcode"
                placeholder="Enter UK Postcode"
                onChange={formikInit.handleChange}
              />
            </FormControl>

            <Button type="submit" colorScheme="purple" width="full" mb={4}>
              Submit
            </Button>
          </VStack>
        </form>
        
        {data?.map((item, index) => {
          return (
            <CardBox
              key={index}
              index={index}
              item={item}
              onClick={() => fetchUprn(item.uprn)}
            />
          );
        })}
    {
        show && status && <EvaluationResult {...status} />
    }
        
      </Box>
    </Flex>
  );
}
