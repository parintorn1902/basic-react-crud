import { createStandaloneToast } from "@chakra-ui/react";
import { theme } from "../../pages/_app";

const toast = createStandaloneToast({ theme: theme });

class ToastUtil {
  static success(message: string, title: string = "Notification") {
    toast({
      title: title,
      description: message,
      position: "top-right",
      status: "success",
      duration: 3000,
      // variant: "left-accent",
    });
  }

  static error(message: string, title: string = "Error") {
    toast({
      title: title,
      description: message,
      position: "top-right",
      status: "error",
      duration: 3000,
      // variant: "left-accent",
    });
  }
}

export default ToastUtil;
