import React, { useState, useEffect } from "react";
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
import { FiEdit } from "react-icons/fi";
import axios from "axios";

const EmployeesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees"); // Adjust the URL based on your API
        setEmployees(response.data);
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
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>
            <input type="checkbox" />
          </Th>
          <Th>Name</Th>
          <Th>Job Title</Th>
          <Th>Department</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {employees.map((employee) => (
          <Tr key={employee.id}>
            <Td>
              <input type="checkbox" />
            </Td>
            <Td>
              <HStack spacing="4">
                <Avatar size="sm" src={employee.avatarUrl} /> {/* Employee Avatar */}
                <span>{employee.name}</span>
              </HStack>
            </Td>
            <Td>{employee.jobTitle}</Td>
            <Td>{employee.department}</Td>
            <Td>
              <HStack spacing="2">
                <span>{employee.status}</span>
                {employee.status === "Active" ? (
                  <span style={{ color: "green" }}>●</span>
                ) : (
                  <span style={{ color: "orange" }}>●</span>
                )}
              </HStack>
            </Td>
            <Td>
              <IconButton
                icon={<FiEdit />}
                aria-label="Edit"
                size="sm"
                variant="outline"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default EmployeesTable;
