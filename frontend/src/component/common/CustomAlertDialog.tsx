import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";

const CustomAlertDialog: React.FC<Props> = ({
  title,
  description,
  isOpen = false,
  okBtnText = "OK",
  cancleBtnText = "Cancel",
  onOk,
  onClose,
}) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose!}>
      <AlertDialogOverlay>
        <AlertDialogContent background="#121212">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title || "Title"}
          </AlertDialogHeader>

          <AlertDialogBody>{description || "Description"}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancleBtnText}
            </Button>
            <Button colorScheme="red" onClick={onOk} ml={3}>
              {okBtnText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CustomAlertDialog;

type Props = {
  isOpen?: boolean;
  title?: string;
  description?: string;
  cancleBtnText?: string;
  okBtnText?: string;
  onOk?: () => void;
  onClose?: () => void;
};
