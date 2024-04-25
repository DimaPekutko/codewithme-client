import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  Tag,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  items: string[];
  checked: string[];
  disabled?: boolean;
  onChange: (value: any) => void;
}

export default function TagsMenu({ items, checked, onChange, disabled }: Props) {
  return (
    <Flex borderColor={"primary"} borderBottomWidth={!disabled ? 2 : 0} gap={3} w={"100%"} py={2}>
      <Flex gap={3} alignItems={"center"} width={"100%"} justifyContent={"center"} flexWrap={"wrap"}>
        {checked.map((item, i) => (
          <Tag size={"sm"} colorScheme="primary" key={i}>
            {item}
          </Tag>
        ))}
      </Flex>
      {!disabled && (
        <Menu closeOnSelect={false} placement="top-start" size={"lg"}>
          <MenuButton size={"xs"} as={Button} colorScheme="primary" variant="ghost">
            Choose
          </MenuButton>
          <MenuList background={"background.dark"}>
            <MenuOptionGroup
              title="Choose from list:"
              type="checkbox"
              defaultValue={checked}
              onChange={(value) => onChange(value)}
            >
              {items.map((item, i) => (
                <MenuItemOption background={"background.dark"} value={item} isChecked={true}>
                  {item}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}
