import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Verification() {
  const navigation = useNavigate();

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
              Check your email
            </Heading>
            <Text color="fg.muted">
              We sent the verification code to your email
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
            <Stack spacing="5">
              <FormControl>
                <Input
                  id="code"
                  type="number"
                  maxLength={6}
                  placeholder="Verification Code..."
                  textAlign={"center"}
                />
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button
                colorScheme="blue"
                onClick={() => {
                  navigation("/home");
                }}
              >
                Verify
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
