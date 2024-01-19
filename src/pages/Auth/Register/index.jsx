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
import { useAuthStore } from "../../../stores/auth-store";
import { useShallow } from "zustand/react/shallow";
import { useRegisterMutation } from "../../../hooks/useAuth";
import { useFormik } from "formik";
import { useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();

  const toast = useToast();

  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const { mutate, isLoading } = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          toast({
            status: "success",
            isClosable: true,
            position: "top-right",
            title: "Check your email for OTP!",
          });
          navigate("/auth/verify");
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
              Create your account
            </Heading>
            <Text color="fg.muted">
              Already have an account? <Link to={"/auth/login"}>Sign In</Link>
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
                  <FormLabel htmlFor="fullName">Full Name</FormLabel>
                  <Input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                  />
                </FormControl>
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
                <PasswordField
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                />
              </Stack>
              <Stack spacing="6">
                <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                  Sign Up
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
