import React from "react";
import format from "date-fns/format";
import {
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "../api/axios";
import Cookies from "js-cookie";

export default function UpdateEmployeeModal({
  isOpen,
  onClose,
  employeeData,
  refreshData,
}) {
  const [formData, setFormData] = useState(
    employeeData || {
      imageUrl: "",
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
    }
  );
  console.log(formData);
  console.log(employeeData);
  const date = new Date(formData.DateOfHire); //will be used to convert date to correct format for date picker
  const toast = useToast();
  const [responseReceived, setResponseReceived] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "Salary"
          ? parseFloat(value)
          : name === "Status"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/api/employee/${formData.EmployeeId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setResponseReceived(response.data.message);
      console.log(response.data);
      toast({
        title: responseReceived || "Employee updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refreshData();
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: responseReceived || "Error updating employee.",
        description: "An error occurred while updating employee data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Employee Information</ModalHeader>
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Employee ID</FormLabel>
              <Input
                type="text"
                name="EmployeeId"
                value={formData.EmployeeId}
                onChange={handleInputChange}
                placeholder="Enter employee ID"
                isDisabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="text"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Position</FormLabel>
              <Input
                type="text"
                name="Position"
                value={formData.Position}
                onChange={handleInputChange}
                placeholder="Enter position"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Date of Hire</FormLabel>
              <Input
                type="date"
                name="DateOfHire"
                value={format(date, "yyyy-MM-dd")}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Salary</FormLabel>
              <Input
                type="number"
                name="Salary"
                step={0.01}
                onChange={handleInputChange}
                value={formData.Salary}
                placeholder="Enter salary"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                name="Status"
                value={formData.Status}
                onChange={handleInputChange}
                placeholder="Select status"
              >
                <option value="1">Active</option>
                <option value="0">On Leave</option>
              </Select>
            </FormControl>

            <FormControl>
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
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="yellow" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
