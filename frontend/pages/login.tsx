import type { NextPage } from "next";
import {
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  ScaleFade,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa";
import useLoginController from "../src/component/login/LoginController";
import PageContainer from "../src/component/common/PageContainer";

const LoginScreen: NextPage = () => {
  const { state, controller } = useLoginController();

  return (
    <PageContainer title="Sign In">
      <Flex alignItems="center" justifyContent="center" h="100vh" background="#151515">
        <ScaleFade in={true} initialScale={0.7}>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            p="5"
            borderRadius={20}
            shadow="lg"
            background="#212121"
          >
            <Text fontSize="lg" fontWeight="bold" alignSelf="flex-start" mb="5">
              Sign In to Your Account
            </Text>
            <form onSubmit={controller.onSubmit}>
              <VStack w="full" mb="2">
                <FormControl id="username" isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<Icon as={FaUser} />} />
                    <Input
                      autoFocus
                      focusBorderColor="teal.400"
                      variant="filled"
                      w="full"
                      placeholder="Username"
                      value={state.username}
                      onChange={({ target }) => state.setUsername(target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="password" isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<Icon as={FaLock} />} />
                    <Input
                      focusBorderColor="teal.400"
                      variant="filled"
                      type="password"
                      w="full"
                      placeholder="Password"
                      value={state.password}
                      onChange={({ target }) => state.setPassword(target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </VStack>
              <Button isLoading={state.isLoading} type="submit" w="full" mt="5" colorScheme="teal">
                Sign In
              </Button>
            </form>
          </Flex>
        </ScaleFade>
      </Flex>
    </PageContainer>
  );
};

export default LoginScreen;
