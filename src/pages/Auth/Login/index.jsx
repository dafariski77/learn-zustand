import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { PasswordField } from "../../../components/PasswordField";
import { OAuthButtonGroup } from "../../../components/OAuthButtonGroup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useLoginMutation } from "../../../hooks/useAuth";
import { useAuthStore } from "../../../stores/auth-store";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  const toast = useToast();

  const { login, user } = useAuthStore(
    useShallow((state) => ({
      login: state.login,
      user: state.user,
    }))
  );

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const { mutate, isLoading } = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (data) => {
          login(data.data.data);
          toast({
            status: "success",
            isClosable: true,
            position: "top-right",
            title: "Login Success!",
          });
          navigate("/home");
        },
        onError: (error) => {
          toast({
            status: "error",
            isClosable: true,
            position: "top-right",
            title: error.response.data.message,
          });
        },
      });
    },
  });

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={{
                base: "xs",
                md: "sm",
              }}
            >
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Dont have an account? <Link to={"/auth/register"}>Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={{
            base: "transparent",
            sm: "bg.surface",
          }}
          boxShadow={{
            base: "none",
            sm: "md",
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Stack spacing="6">
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <PasswordField
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                  id="password"
                />
              </Stack>
              <HStack justify="end">
                <Button variant="text" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
