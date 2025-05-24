import { Paper, Title, Text, Flex } from "@mantine/core";
import { Link, useLocation } from "wouter";
import SigninForm from "../components/SinginForm";
import SignupForm from "../components/SingupForm";
import { useAuthStore } from "../../core/Auth/application/auth.stores";

export default function LoginPage() {
  const { user } = useAuthStore();
  const [location, navigate] = useLocation();

  const isSignin = location === "/signin";

  if(user) {
    navigate('/')
  }

  return (
    <Flex
      h="100vh"
      bg="#051b3a"
      justify="center"
      align="center"
      direction="column"
    >
      <Title c="#fff">{`Sign ${isSignin ? "in" : "up"}`}</Title>
      <Paper miw={400} bg="#fff" shadow="md" p={30} mt={30} radius="md">
        {isSignin && <SigninForm />}
        {!isSignin && <SignupForm />}
        {isSignin && (
          <Text mt={15} ta="center" size="md" fw={500}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#051b3a" }}>
              Sign up
            </Link>
          </Text>
        )}
        {!isSignin && (
          <Text mt={15} ta="center" size="md" fw={500}>
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "#051b3a" }}>
              Sign in
            </Link>
          </Text>
        )}
      </Paper>
    </Flex>
  );
}
