import { IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons'; // Import Chakra's icons

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} // Use Chakra UI icons
      onClick={toggleColorMode}
      variant="ghost"
      size="lg"
      colorScheme={colorMode === 'light' ? 'blue' : 'yellow'} // Optional: Change color scheme based on mode
    />
  );
};

export default ColorModeSwitcher;
