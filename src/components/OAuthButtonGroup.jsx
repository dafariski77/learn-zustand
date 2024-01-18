import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { FacebookIcon, GitHubIcon, GoogleIcon } from "./ProviderIcons";
const providers = [
  {
    name: "Google",
    icon: <GoogleIcon />,
  },
  {
    name: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    name: "GitHub",
    icon: <GitHubIcon />,
  },
];

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="secondary" spacing="4">
    {providers.map(({ name, icon }) => (
      <Button key={name} flexGrow={1}>
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
);
