import { Box, Text, Icon, Stack } from "@chakra-ui/react";
export default function StatisticsCard({
  label,
  quantity,
  icon,
  color = "#ffc808",
}) {
  return (
    <Box
      maxW="sm"
      p={8}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      textAlign="center"
    >
      <Stack direction="row" align="center">
        {/* Icon */}
        <Box bg={`${color}20`} p={4} borderRadius="lg" marginRight="30%">
          <Icon as={icon} color={color} w={8} h={8} />
        </Box>

        {/* Info */}
        <Box textAlign="left">
          <Text fontSize="lg" color="gray.500">
            {label}
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            {quantity}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
