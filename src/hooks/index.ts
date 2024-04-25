import { useToast } from "@chakra-ui/react";

type NotifyType = "success" | "error" | "info";

const getColor = (type) => {
  return {
    success: "green",
    error: "red",
    info: "cyan",
  }[type];
};

export const useNotify = () => {
  const toast = useToast();

  const notify = (title, type: NotifyType = "success") =>
    toast({
      title,
      duration: 3000,
      orientation: "horizontal",
      position: "bottom-right",
      colorScheme: getColor(type),
    });

  return notify;
};
