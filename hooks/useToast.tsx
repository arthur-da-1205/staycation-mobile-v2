import { Alert, HStack, Text, useToast as Toaster, VStack } from "native-base";

export const useToaster = () => {
  const toast = Toaster();

  const success = (message: string) => {
    toast.show({
      duration: 5000,
      placement: "top",
      render: ({}) => {
        return (
          <Alert w="100%" status="success" variant="left-accent">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="sm" color="coolGray.500">
                    {message}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Alert>
        );
      },
    });
  };

  const info = (message: string) => {
    toast.show({
      duration: 5000,
      placement: "top",
      render: ({}) => {
        return (
          <Alert w="100%" status="info" variant="left-accent">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="sm" color="coolGray.500">
                    {message}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Alert>
        );
      },
    });
  };

  const error = (message: string) => {
    toast.show({
      duration: 5000,
      placement: "top",
      render: ({}) => {
        return (
          <Alert w="100%" status="error" variant="left-accent">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="sm" color="coolGray.500">
                    {message}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Alert>
        );
      },
    });
  };

  return { success, info, error };
};
