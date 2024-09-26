import React, { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import {
  Box,
  Text,
  Avatar,
  Stack,
  Input,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "../api/axios"; //
import Cookies from "js-cookie"; //
import { useDisclosure } from "@chakra-ui/react";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import { em } from "framer-motion/client";
export default function EmployeeCard() {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageReceived, setMessageReceived] = useState("");
  const toast = useToast();
  const currUser = JSON.parse(Cookies.get("employee"));
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [dateOfHire, setDateOfHire] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `api/employee/search?query=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setMessageReceived(response.data.message);
      console.log(response.data);

      const employee = response.data.employee;
      setEmployeeId(employee.employeeId);
      setName(employee.firstName + " " + employee.lastName);
      setSalary(employee.salary);
      setAvatarUrl(employee.photoUrl);
      setEmail(employee.email);
      setPhoneNumber(employee.phoneNumber);
      setPosition(employee.position);
      setDateOfHire(new Date(employee.dateOfHire).toLocaleDateString());
      setStatus(
        employee.status === 0
          ? "Onboarding"
          : employee.status === 1
          ? "Active"
          : "On Leave"
      );
      setRole(employee.role);

      toast({
        title: "Employee found.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setMessageReceived("");
    } catch (error) {
      console.log(error);
      toast({
        title: messageReceived || "An error occurred.",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      {/* Search bar */}
      <Flex justifyContent="center" mb={8}>
        <Input
          placeholder="Search for an employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width={{ base: "90%", md: "400px" }}
          bg="white"
          border="2px solid"
          borderColor="gray.300"
          borderRadius="lg"
          _hover={{ borderColor: "gray.400" }}
          _focus={{ borderColor: "#ffc808", boxShadow: "0 0 0 1px #ffc808" }}
        />
        <Button
          onClick={handleSearch}
          isLoading={isLoading}
          loadingText="Searching..."
          ml={4}
          bg="#ffc808"
          color="white"
          _hover={{ bg: "#e0b707" }}
        >
          Search
        </Button>
      </Flex>

      {/* Show employee details after search */}
      {name || salary || avatarUrl ? (
        <Box
          p={8}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          width={{ base: "100%", md: "auto" }} // Full width on smaller screens
          maxW={{ base: "100%", md: "800px" }} // Limit max width on larger screens
          bg="white"
          boxShadow="sm"
          textAlign="center"
        >
          <Stack direction="row" align="center">
            {/* Avatar */}
            <Box
              p={4}
              borderRadius="lg"
              marginRight={{ base: 0, md: "30%" }}
              mb={{ base: 4, md: 0 }}
            >
              <Avatar src={avatarUrl} size="xl" />
            </Box>

            {/* Info */}
            <Box textAlign="left">
              <Text fontSize="lg" color="gray.500">
                {name}
              </Text>
              <Text marginBottom="5%" fontSize="3xl" fontWeight="bold">
                ${salary}
              </Text>

              {/* Display additional employee details below */}
              <Text fontSize="md" color="gray.600">
                <Text as="span" fontWeight="bold">
                  ID:
                </Text>{" "}
                {employeeId}
              </Text>
              <Text fontSize="md" color="gray.600">
                <Text as="span" fontWeight="bold">
                  Email:
                </Text>{" "}
                {email}
              </Text>
              <Text fontSize="md" color="gray.600">
                <Text as="span" fontWeight="bold">
                  Phone:
                </Text>{" "}
                {phoneNumber}
              </Text>
              <Text fontSize="md" color="gray.600">
                <Text as="span" fontWeight="bold">
                  Position:
                </Text>{" "}
                {position}
              </Text>
              <Text fontSize="md" color="gray.600">
                <Text as="span" fontWeight="bold">
                  Date of Hire:
                </Text>{" "}
                {dateOfHire}
              </Text>
              <Text fontSize="md" color="gray.600">
                <Text as="span" fontWeight="bold">
                  Status:
                </Text>{" "}
                {status}
              </Text>
              <Text fontSize="md" color="gray.600">
                <Text as="span" fontWeight="bold">
                  Role:
                </Text>{" "}
                {role}
              </Text>
            </Box>
          </Stack>
          {currUser.role === "HR Administrator" && (
            <IconButton
              color={"orange"}
              icon={<FiEdit />}
              aria-label="Edit"
              size="sm"
              variant="outline"
              position={"relative"}
              left={"50%"}
              top={"20px"}
              onClick={onOpen}
            />
          )}
          {/* PopupForm to update employee details */}
          <UpdateEmployeeModal
            isOpen={isOpen}
            onClose={onClose}
            employeeData={{
              photoUrl: avatarUrl,
              EmployeeId: employeeId,
              FirstName: name.split(" ")[0],
              LastName: name.split(" ")[1],
              Email: email,
              PhoneNumber: phoneNumber,
              Position: position,
              DateOfHire: dateOfHire,
              Salary: salary,
              Status: status === "Active" ? 1 : status === "On Leave" ? 0 : 2,
              Role: role,
            }}
            
            refreshData={handleSearch}
          />
        </Box>
      ) : null}
    </Box>
  );
}
