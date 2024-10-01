import { Feather } from "@expo/vector-icons";
import { useToaster } from "@hooks/useToast";
import { useApp } from "@provider/app.provider";
import { useAuthLoginMutation } from "@resources/gql/auth.gql";
import { UserModel } from "@resources/model/user.model";
import { useRouter } from "expo-router";
import { Box, Button, Center, FormControl, HStack, Heading, Icon, Input, Link, Pressable, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import * as SecureStore from "expo-secure-store";
import { useAtomic } from "@lib/jotai";
import { tokenAtom } from "@states/atom/token.atom";

const LoginScreen = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [credentials, setCredentials] = useState<{ email: string; password: string }>({ email: "", password: "" });

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
        <Box safeArea px="12" py="8" w="100%">
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
                    InputLeftElement={<Icon ml="10px" as={<Feather name="user" size={24} color="black" />} name="home" />}
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

                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    I'm a new user.{" "}
                  </Text>
                  <Link
                    _text={{
                      color: "indigo.500",
                      fontWeight: "medium",
                      fontSize: "sm",
                    }}
                    href="#"
                  >
                    Sign Up
                  </Link>
                </HStack>
              </VStack>
            )}
          </Formik>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default LoginScreen;
