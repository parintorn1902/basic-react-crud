import Head from "next/head";
import { Flex, FlexProps } from "@chakra-ui/react";

const PageContainer: React.FC<Props & FlexProps> = ({ title, children, ...rest }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Flex alignItems="center" justifyContent="center" h="100vh" background="#151515" {...rest}>
        {children}
      </Flex>
    </>
  );
};

export default PageContainer;

type Props = {
  title?: string;
  children: any;
};
