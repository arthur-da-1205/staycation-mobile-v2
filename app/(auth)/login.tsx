import Space from "@components/ui/space/space-component";
import { Feather, Fontisto } from "@expo/vector-icons";
import { useToaster } from "@hooks/useToast";
import { useApp } from "@provider/app.provider";
import { useAuthLoginMutation } from "@resources/gql/auth.gql";
import { UserModel } from "@resources/model/user.model";
import { useRouter } from "expo-router";
import { Field, Formik } from "formik";
import { Box, Button, Center, FormControl, HStack, Heading, Icon, Input, Link, Pressable, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const LoginScreen = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const { setToken, setUser } = useApp();
  const toast = useToaster();
  const [authLogin, { data: authData, error: authError }] = useAuthLoginMutation();

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required("at least 8 characters"),
  });

  const onSubmit = (values: any) => {
    authLogin({ email: values.email, password: values.password }).then((res) => {
      const { access_token, user } = res.data?.data?.userLogin || {};

      if (res.error) {
        console.log(res.error);
      }

      if (access_token) {
        setToken(access_token);
        setUser(user as typeof UserModel);
      }
    });
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }

    if (authData) {
      toast.success("Welcome! Enjoy your staycation.");
    }
  }, [authData, authError]);

  return (
    <SafeAreaView>
      <Center w="100%">
        <Box safeArea px="18" py="28" w="100%">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome Back!
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Enter your email address and password.
          </Heading>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, { resetForm }) => {
              onSubmit(values);
              resetForm();
            }}
            validationSchema={loginValidationSchema}
            validateOnMount
            validateOnChange
          >
            {({ handleChange, handleBlur, handleSubmit, errors, values, touched }) => (
              <VStack space={3} mt="5">
                <FormControl>
                  <Field
                    component={Input}
                    w="100%"
                    p="8px"
                    name="email"
                    InputLeftElement={<Icon ml="10px" as={<Fontisto name="email" size={24} color="black" />} name="email" />}
                    placeholder="Email Address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <Text fontSize="xs" color="danger.500">
                      {errors.email}
                    </Text>
                  ) : null}
                </FormControl>
                <Space height={6} />
                <FormControl>
                  <Input
                    type="password"
                    w="100%"
                    p="8px"
                    InputLeftElement={<Icon ml="10px" as={<Feather name="lock" color="black" />} name="home" />}
                    InputRightElement={
                      <Pressable
                        onPress={() => {
                          setShowPass(!showPass);
                        }}
                      >
                        <Icon as={<Feather name={showPass ? "eye" : "eye-off"} />} size={4} mr="2" color="muted.400" />
                      </Pressable>
                    }
                    placeholder="Password"
                    secureTextEntry={showPass}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <Text fontSize="xs" color="danger.500">
                      {errors.password}
                    </Text>
                  ) : null}
                  <Space height={16} />
                  <Link
                    _text={{
                      fontSize: "xs",
                      fontWeight: "500",
                      color: "indigo.500",
                    }}
                    alignSelf="flex-end"
                    mt="1"
                  >
                    Forget Password?
                  </Link>
                </FormControl>

                <Button
                  mt="2"
                  colorScheme="indigo"
                  isDisabled={!!errors.email || !!errors.password}
                  onPress={() => handleSubmit()}
                >
                  Sign in
                </Button>

                <VStack mt="6" justifyContent="center">
                  <Text
                    alignSelf="center"
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    Don't have an account yet?
                  </Text>
                  <Space height={20} />
                  <Button variant="outline" colorScheme="blueGray" onPress={() => router.push("/signup")}>
                    Sign Up
                  </Button>
                </VStack>
              </VStack>
            )}
          </Formik>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default LoginScreen;
