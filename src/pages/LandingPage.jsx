import * as React from "react";
import { Container, chakra, Stack, Text, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export default function LandingPage() {
  return (
    <Container p={{ base: 8, sm: 14 }}>
      <Stack direction="column" spacing={6} alignItems="center">
        <Box
          py={2}
          px={3}
          bg="#ffc808"
          w="max-content"
          color="white"
          rounded="md"
          fontSize="sm"
        >
          <Stack direction={{ base: "column", sm: "row" }}>
            <Text fontWeight="bold">Your Workforce, Simplified.</Text>
          </Stack>
        </Box>
        <chakra.h1
          fontSize={{ base: "4xl", sm: "5xl" }}
          fontWeight="bold"
          textAlign="center"
          maxW="600px"
        >
          Streamline Your HR Processes with{" "}
          <chakra.span
            color="#ffc808"
            bg="linear-gradient(transparent 75%, rgba(255, 200, 8, 0.5) 50%)"
          >
            HR Insights
          </chakra.span>
        </chakra.h1>
        <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
          Manage employee data efficiently and generate insightful reports with
          ease. HR Insights is a powerful and accessible HR management tool that
          empowers you to handle employee records, track key metrics, and
          streamline your HR workflows.
        </Text>
        <Stack
          direction={{ base: "column", sm: "row" }}
          w={{ base: "100%", sm: "auto" }}
          spacing={5}
        >
          <Link to="/login">
            <Button
              border="1.2px solid #ffc808"
              _hover={{ bg: "#e6b307" }}
              bg="white"
              variant="outline"
              rounded="md"
              size="lg"
              height="3.5rem"
              fontSize="1.2rem"
            >
              Login
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
