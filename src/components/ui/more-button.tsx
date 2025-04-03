import { Ellipsis } from "lucide-react";
import { Box, Menu, Portal } from "@chakra-ui/react";

interface MoreButtonProps {
  onDelete: () => void;
}

function MoreButton({ onDelete }: MoreButtonProps) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Box
          color="gray.400"
          _hover={{ color: "white" }}
          onClick={(e) => e.stopPropagation()}
          border="none"
          focusRing="none"
          backgroundColor="transparent"
          p={0}
        >
          <Ellipsis size={24} />
        </Box>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="delete" onClick={() => onDelete()}>
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export default MoreButton;
