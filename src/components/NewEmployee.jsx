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
  const [messsageReceived, setMessageReceived] = useState("");
  const [formData, setFormData] = useState({
    EmployeeId: "",
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Position: "",
    DateOfHire: "",
    Salary: 0.0,
    Status: 0,
    Role: "",
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]:
          name === "Salary"
            ? parseFloat(value) // Convert salary to decimal/float
            : name === "Status"
            ? parseInt(value) // Convert status to integer
            : value, // Leave other fields as strings
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
      console.log(formData);
      setMessageReceived(response.data.message);
      toast({
        title: "Employee added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        EmployeeId: "",
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNumber: "",
        Position: "",
        DateOfHire: "",
        Salary: 0.0,
        Status: 0,
        Role: "",
      });
    } catch (error) {
      console.log(formData);
      console.error(error);
      toast({
        title: "Error adding employee.",
        description: messsageReceived || "An error occurred.",
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
            <FormLabel>Employee ID</FormLabel>
            <Input
              type="text"
              name="EmployeeId"
              value={formData.EmployeeId}
              onChange={handleInputChange}
              placeholder="Enter employee ID"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Position</FormLabel>
            <Input
              type="text"
              name="Position"
              value={formData.Position}
              onChange={handleInputChange}
              placeholder="Enter position"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Date of Hire</FormLabel>
            <Input
              type="date"
              name="DateOfHire"
              value={formData.DateOfHire}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Salary</FormLabel>
            <Input
              type="number"
              name="Salary"
              value={formData.Salary}
              onChange={handleInputChange}
              placeholder="Enter salary"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              name="Status"
              value={formData.Status}
              onChange={handleInputChange}
              placeholder="Select status"
            >
              <option value="1">Active</option>
              <option value="0">OnLeave</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Role</FormLabel>
            <Select
              name="Role"
              value={formData.Role}
              onChange={handleInputChange}
              placeholder="Select role"
            >
              <option value="HR Administrator">HR Administrator</option>
              <option value="Employee">Employee</option>
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="yellow">
            Add Employee
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
