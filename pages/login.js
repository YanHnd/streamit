import React from "react";
import { signIn, getProviders } from "next-auth/react";
import styles from "../styles/login.module.scss";

/**
 * @author
 * @function Login
 **/

const Login = ({ providers }) => {
  console.log(providers);
  return (
    <div className={styles.container}>
      {Object.values(providers).map((provider) => (
        <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
          Login with {provider.name}
        </button>
      ))}
    </div>
  );
};

export default Login;

Login.getLayout = (page) => <>{page}</>;

export const getServerSideProps = async (params) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
