import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import StudentType from "../../type/StudentType";

const StudentFormDialog: React.FC<Props> = (props) => {
  const { isOpen = false, student, onSubmit, onClose } = props;
  const [id, setId] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmitForm = async () => {
    const student = {
      _id: id,
      firstName,
      lastName,
      email,
      dob: dayjs(dob).toISOString(),
    };
    onSubmit && onSubmit(student);
  };

  const handleClose = () => {
    onClose && onClose();
  };

  const clearData = () => {
    setId(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setDob("");
  };

  useEffect(() => {
    if (!isOpen) {
      clearData();
    } else {
      // if open with edit student
      if (student) {
        setId(student._id);
        setFirstName(student.firstName);
        setLastName(student.lastName);
        setEmail(student.email);
        setDob(dayjs(student.dob).format("YYYY-MM-DD"));
      }
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose!}>
      <ModalOverlay />
      <ModalContent background="#121212">
        <ModalHeader>Student Form</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              focusBorderColor="teal.400"
              placeholder="First Name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              focusBorderColor="teal.400"
              placeholder="Last Name"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              focusBorderColor="teal.400"
              placeholder="Email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              focusBorderColor="teal.400"
              placeholder="Birth date"
              value={dob}
              onChange={({ target }) => setDob(target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSubmitForm} colorScheme="teal" mr={3}>
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StudentFormDialog;

type Props = {
  isOpen?: boolean;
  student?: StudentType | null;
  onSubmit?: (student: any) => void;
  onClose?: () => void;
};
