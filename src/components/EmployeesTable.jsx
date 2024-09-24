import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
  AlertIcon,
  Avatar,
  Button,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { FiDelete, FiEdit } from "react-icons/fi";
import axios from "../api/axios";

const EmployeesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employee", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setEmployees(response.data.employees);
        console.log(response.data);
        console.log(response.data.employees);
        console.log(employees);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error fetching employee data: {error}
      </Alert>
    );
  }

  return (
    <Table backgroundColor={"white"} variant="striped" colorScheme="orange">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Position</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {employees.map((employee) => (
          <Tr key={employee.id}>
            <Td>
              <HStack spacing="4">
                <Avatar size="sm" src={employee.avatarUrl} />{" "}
                {/* Employee Avatar */}
                <span>{employee.firstName + " " + employee.lastName}</span>
              </HStack>
            </Td>
            <Td>{employee.email}</Td>
            <Td>{employee.position}</Td>
            <Td>
              <HStack spacing="2">
                {employee.status === 0 && (
                  <>
                    <span style={{ color: "#ffc808" }}>Onboarding</span>
                    <span style={{ color: "#ffc808" }}>●</span>
                  </>
                )}
                {employee.status === 1 && (
                  <>
                    <span style={{ color: "green" }}>Active</span>
                    <span style={{ color: "green" }}>●</span>
                  </>
                )}
                {employee.status === 2 && (
                  <>
                    <span style={{ color: "red" }}>On Leave</span>
                    <span style={{ color: "red" }}>●</span>
                  </>
                )}
              </HStack>
            </Td>

            <Td>
              <HStack spacing="2">
                {" "}
                {/* Add HStack to align them side by side with spacing */}
                <IconButton
                  color={"orange"}
                  icon={<FiEdit />}
                  aria-label="Edit"
                  size="sm"
                  variant="outline"
                />
                <IconButton
                  color={"red"}
                  icon={<FiDelete />}
                  aria-label="delete"
                  size="sm"
                  variant="outline"
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default EmployeesTable;
