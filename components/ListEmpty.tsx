import { ComponentProps } from "react";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const ListEmpty = ({
  message,
  containerStyle,
  messageStyle,
}: {
  message?: string;
  containerStyle?: ComponentProps<typeof VStack>["className"];
  messageStyle?: ComponentProps<typeof Text>["className"];
}) => {
  return (
    <VStack
      className={`bg-secondary rounded-lg h-25 justify-center items-center flex-1 ${containerStyle}`}
    >
      <Text className={messageStyle}>{message ?? "No options available."}</Text>
    </VStack>
  );
};

export default ListEmpty;
