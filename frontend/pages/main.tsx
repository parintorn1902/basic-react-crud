import { NextPage } from "next";
import useMainController from "../src/component/main/MainController";
import PageContainer from "../src/component/common/PageContainer";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  CircularProgress,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import {
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaTimes,
  FaTrashAlt,
  FaUsers,
} from "react-icons/fa";
import ArrayUtils from "../src/util/ArrayUtils";
import React, { useState } from "react";
import AuthManager from "../src/core/auth/AuthManager";
import { useRouter } from "next/dist/client/router";
import StudentFormDialog from "../src/component/main/StudentFormDialog";
import StudentType from "../src/type/StudentType";
import ToastUtil from "../src/util/ToastUtil";
import CustomAlertDialog from "../src/component/common/CustomAlertDialog";

const MainScreen: NextPage = () => {
  const router = useRouter();
  const { state, controller } = useMainController();
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(null);
  const [filter, setFilter] = useState("");
  const [studentFormVisible, setStudentFormVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const filteredStudents: StudentType[] = ArrayUtils.filterAllField(state.students, filter);

  const handleLogout = () => {
    AuthManager.destroyToken();
    router.push("/");
  };

  const handleAddStudent = () => {
    setStudentFormVisible(true);
  };

  const handleAddStudentSubmit = async (student: StudentType) => {
    const success = await controller.addStudent(student);
    if (success) {
      setStudentFormVisible(false);
      ToastUtil.success("Add Student Success");
      controller.fetchStudents();
    }
  };

  const handleEditStudent = (student: StudentType) => {
    setSelectedStudent(student);
    setStudentFormVisible(true);
  };

  const handleEditStudentSubmit = async (student: StudentType) => {
    const success = await controller.updateStudent(student);
    if (success) {
      setStudentFormVisible(false);
      ToastUtil.success("Update Student Success");
      controller.fetchStudents();
    }
  };

  const handleStudentFormSubmit = (student: StudentType) => {
    if (selectedStudent) {
      // case update
      handleEditStudentSubmit(student);
    } else {
      // case add
      handleAddStudentSubmit(student);
    }
  };

  const handleDeleteStudent = (student: StudentType) => {
    setSelectedStudent(student);
    setDeleteDialogVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogVisible(false);
    setSelectedStudent(null);
  };

  const handleDeleteStudentSubmit = async () => {
    setDeleteDialogVisible(false);
    setSelectedStudent(null);
    const success = await controller.deleteStudent(selectedStudent);
    if (success) {
      ToastUtil.success("Delete Student Success");
      controller.fetchStudents();
    }
  };

  const handleCloseStudentFormDialog = () => {
    setStudentFormVisible(false);
    setSelectedStudent(null);
  };

  const renderStudentList = () => {
    return filteredStudents.map((item) => (
      <Box
        shadow="md"
        borderRadius="lg"
        w="full"
        p="4"
        background="#212121"
        key={"stu_" + item._id}
      >
        <HStack>
          <VStack alignItems="flex-start" w="full">
            <Box fontWeight="bold" fontSize="md">
              {item.firstName + " " + item.lastName}
            </Box>
            <Box>{item.email}</Box>
            <Box>{dayjs(item.dob).format("DD MMM YYYY")}</Box>
          </VStack>
          <VStack>
            <Box>
              <IconButton
                onClick={() => handleEditStudent(item)}
                aria-label="Edit Student"
                icon={<FaPencilAlt />}
              />
            </Box>
            <Box>
              <IconButton
                color="red.400"
                onClick={() => handleDeleteStudent(item)}
                aria-label="Delete Student"
                icon={<FaTrashAlt />}
              />
            </Box>
          </VStack>
        </HStack>
      </Box>
    ));
  };

  return (
    <>
      <PageContainer title="Student Management" justifyContent="flex-start" flexDirection="column">
        <Flex
          w="full"
          h="20"
          flexDirection="column"
          alignItems="center"
          borderBottom="1px solid #212121"
        >
          <Flex
            w="full"
            h="full"
            maxW="2xl"
            flexDirection="row"
            alignItems="center"
            paddingInline="4"
          >
            <Icon as={FaUsers} w="8" h="8" />
            <Text fontSize="2xl" fontWeight="bold" ml="4" w="full">
              Student Management
            </Text>
            <IconButton onClick={handleLogout} aria-label="Log out" icon={<FaSignOutAlt />} />
          </Flex>
        </Flex>
        <Flex flexDirection="column" alignItems="center" w="full" h="full">
          <Flex w="full" h="full" maxW="2xl" paddingInline="4">
            <VStack mt="4" w="full">
              <HStack w="full">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="whiteAlpha.500"
                    children={<Icon as={FaSearch} />}
                  />
                  <Input
                    placeholder="Search student ..."
                    focusBorderColor="teal.400"
                    variant="filled"
                    onChange={({ target }) => setFilter(target.value)}
                    value={filter}
                  />
                  {filter.length > 0 && (
                    <InputRightElement
                      onClick={() => setFilter("")}
                      color="whiteAlpha.500"
                      children={<Icon as={FaTimes} />}
                    />
                  )}
                </InputGroup>
                <Button colorScheme="teal" leftIcon={<FaPlus />} w={200} onClick={handleAddStudent}>
                  Add Student
                </Button>
              </HStack>
              {state.isFetching ? (
                <Box pt="3">
                  <CircularProgress isIndeterminate color="teal.400" />
                </Box>
              ) : (
                renderStudentList()
              )}
            </VStack>
          </Flex>
        </Flex>
        <StudentFormDialog
          isOpen={studentFormVisible}
          student={selectedStudent}
          onSubmit={handleStudentFormSubmit}
          onClose={handleCloseStudentFormDialog}
        />
      </PageContainer>
      <CustomAlertDialog
        isOpen={deleteDialogVisible}
        title="Delete Student"
        description={`Are you sure to delete "${
          selectedStudent?.firstName + " " + selectedStudent?.lastName
        }" ?`}
        okBtnText="Delete"
        onClose={handleDeleteCancel}
        onOk={handleDeleteStudentSubmit}
      />
    </>
  );
};

export const getStaticProps = async () => {
  return { props: {} };
};

export default MainScreen;
