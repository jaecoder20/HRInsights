"use client";
import React, { useState, useContext } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
//import authContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function LoginPage() {
  const navigate = useNavigate();
  // const { setAuth } = useContext(authContext);

  // State to manage form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for error handling
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const toast = useToast();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors before validation
    setEmailError("");
    setPasswordError("");

    let valid = true;
    let body1;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (valid) {
      try {
        const response = await axios.post(
          "/api/login",
          {
            email: email,
            passwordHash: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
            },
          }
        );

        const data = response.data;
        const token = data.token;
        const employee = data.employee;
        // setAuth({ token, employee });

        Cookies.set("employee", JSON.stringify(employee), {
          expires: new Date(new Date().getTime() + 5 * 60 * 1000), // 5 minutes expiration
          secure: true,
          sameSite: "Strict",
        });

        Cookies.set("token", token, {
          expires: new Date(new Date().getTime() + 5 * 60 * 1000), // 5 minutes expiration
          secure: true,
          sameSite: "Strict",
        });

        navigate("/home");
        toast({
          title: "Login successful.",
          description: "You have successfully logged in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log(data);
      } catch (error) {
        if (!error?.response?.data?.message) {
          console.log(error);
          setPasswordError("An error occurred. Please try again.");
        } else {
          setPasswordError(error.response.data.message);
        }
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>LOGIN</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} as="form" onSubmit={handleSubmit}>
            <FormControl id="email" isInvalid={!!emailError}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
            </FormControl>

            <FormControl id="password" isInvalid={!!passwordError}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              )}
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"#ffc808"}>Forgot password?</Text>
              </Stack>
              <Button
                type="submit"
                bg={"#ffc808"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
