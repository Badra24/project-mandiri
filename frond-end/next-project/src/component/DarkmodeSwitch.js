import { useColorMode, IconButton, Box } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const DarkmodeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <IconButton
        arial-label=" Toggle Dark Switch"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      >
        {colorMode === "light" ? "Dark" : "Light"}
      </IconButton>
    </header>
  );
};
export default DarkmodeSwitch;
