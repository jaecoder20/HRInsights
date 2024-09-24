import { Box, Text, Icon, Stack } from "@chakra-ui/react";

export default function StatisticsCard({ label, quantity, icon, color = "#ffc808" }) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      p={4}
      textAlign="center"
    >
      <Stack direction="row" align="center">
        {/* Icon */}
        <Box bg={`${color}20`} p={3} borderRadius="lg" marginRight="30%">
          <Icon as={icon} color={color} w={6} h={6} />
        </Box>

        {/* Info */}
        <Box textAlign="left">
          <Text fontSize="md" color="gray.500">
            {label}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {quantity}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
