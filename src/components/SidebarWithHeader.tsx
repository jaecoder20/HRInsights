"use client";
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import svgLogo from "../assets/logo.svg";
import DashboardCards from "./DashboardCards";
import { IoMdAdd } from "react-icons/io";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  FiHome,
  FiClock,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiSmile,
  FiUsers,
  FiGrid,
  FiUserCheck,
  FiSearch,
} from "react-icons/fi";
import { MdOutlinePersonOutline } from "react-icons/md";

import { IconType } from "react-icons";
import { BiMoneyWithdraw } from "react-icons/bi";
import StatisticsCard from "./StatisticsCard";
import EmployeesTable from "./EmployeesTable";
import EmployeeCard from "./EmployeeCard";
import NewEmployee from "./NewEmployee";
interface User {
  avatar: string;
  name: string;
  accountType: string;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onPageChange: (page: string) => void;
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome },
  { name: "Employees", icon: MdOutlinePersonOutline },
  { name: "Find Employee", icon: FiSearch },
  { name: "Add Employee", icon: IoMdAdd },
  { name: "Settings", icon: FiSettings },
];

const SidebarContent = ({ onClose, onPageChange, ...rest }: SidebarProps) => {
  const handleLinkClick = (page: string) => {
    onPageChange(page);
    onClose(); // Close the sidebar
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image marginTop="20px" boxSize="87%" src={svgLogo} alt="Logo" />

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          marginTop="10px"
          key={link.name}
          icon={link.icon}
          onClick={() => handleLinkClick(link.name)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#ffc808",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

interface MobileNavProps extends FlexProps {
  onOpen: () => void;
  user: User;
  handleSignOut: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  onOpen,
  user,
  handleSignOut,
  ...rest
}) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image
        marginTop="20px"
        marginBottom="20px"
        boxSize="87%"
        src={svgLogo}
        alt="Logo"
        display={{ base: "flex", md: "none" }}
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={user.avatar} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user.accountType}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

interface SidebarWithHeaderProps {
  user: User;
}

const SidebarWithHeader: React.FC<SidebarWithHeaderProps> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activePage, setActivePage] = useState("Home");
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setActivePage(page);
  };
  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("employee");
    navigate("/");
  };
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        onPageChange={handlePageChange}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} onPageChange={handlePageChange} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} handleSignOut={handleSignOut} user={user} />
      <Box overflow="auto" ml={{ base: 0, md: 60 }} p="8">
        {activePage === "Home" && <DashboardCards />}{" "}
        {/* Use the dynamic cards component */}
        {activePage === "Employees" && <EmployeesTable />}
        {activePage === "Find Employee" && <EmployeeCard />}
        {activePage === "Add Employee" && <NewEmployee />}
        {/* Add other components here */}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
