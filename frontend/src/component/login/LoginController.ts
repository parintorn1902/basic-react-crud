import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import ServiceConstant from "../../constant/ServiceConstant";
import AuthManager from "../../core/auth/AuthManager";
import ServiceManager from "../../core/service/ServiceManager";
import ToastUtil from "../../util/ToastUtil";

const useLoginController = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // auto redirect to main page if user has logged in
    if (AuthManager.isLogin()) {
      router.push("/main");
    }
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const requestBody = {
        username,
        password,
      };
      const result = await ServiceManager.post(ServiceConstant.LOGIN, requestBody);
      AuthManager.saveToken(result.accessToken);
      router.push("/main");
    } catch (error) {
      setIsLoading(false);
      ToastUtil.error(String(error));
    }
  };

  return {
    state: { isLoading, username, setUsername, password, setPassword },
    controller: { onSubmit },
  };
};

export default useLoginController;
