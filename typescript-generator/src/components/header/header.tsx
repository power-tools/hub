import { Stack } from "office-ui-fabric-react/lib/Stack";
import { Text } from "office-ui-fabric-react/lib/Text";
import * as React from "react";
import gitHubLogo from "../../GitHub-Mark-64px.png";

const Header = () => (
  <Stack.Item align="auto">
    <Stack horizontal={true} horizontalAlign='space-between'>
      <Text block={true} variant="superLarge">
        TypeScript Generator
      </Text>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/power-tools/hub">
        <img src={gitHubLogo} alt="gitHubLogo" />
      </a>
    </Stack>
    <Text>
      Choose your entities and click Generate to get TypeScript helper classes
      for the selected entities
    </Text>
  </Stack.Item>
);

export default Header;
