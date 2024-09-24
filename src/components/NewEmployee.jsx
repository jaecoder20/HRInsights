import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "../api/axios";
import Cookies from "js-cookie";

export default function NewEmployee() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    position: "",
    dateOfHire: "",
    salary: "",
    status: "",
    roleId: "",
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/employee", formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(response.data);

      toast({
        title: "Employee added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        position: "",
        dateOfHire: "",
        salary: "",
        status: "",
        roleId: "",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error adding employee.",
        description: response.data.message || "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={8}
      maxW="500px"
      mx="auto"
      bg="white"
      borderRadius="md"
      boxShadow="lg"
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Position</FormLabel>
            <Input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Enter position"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Date of Hire</FormLabel>
            <Input
              type="date"
              name="dateOfHire"
              value={formData.dateOfHire}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Salary</FormLabel>
            <Input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Enter salary"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              placeholder="Select status"
            >
              <option value="1">Active</option>
              <option value="0">OnLeave</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Role ID</FormLabel>
            <Select
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              placeholder="Select role"
            >
              <option value="1">HR Administrator</option>
              <option value="2">Employee</option>
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="yellow" isFullWidth>
            Add Employee
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
