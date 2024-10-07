import { useGqlMutation } from "@hooks/useGql";
import { GqlModel } from "@lib/graphql/model";
import { UserModel } from "@resources/model/user.model";
import { rawString, types } from "typed-graphqlify";
import { UserLoginInput, UserRegisterInput } from "./../input/auth.input";

export function useAuthLoginMutation() {
  const model = new GqlModel({
    userLogin: {
      access_token: types.string,
      user: UserModel,
    },
  });

  const [trigger, { data, ...result }] = useGqlMutation<typeof model.data>();

  function execute(payload: UserLoginInput) {
    model.setParams("userLogin", {
      args: {
        email: rawString(payload.email),
        password: rawString(payload.password),
      },
    });

    return trigger(model.mutation());
  }

  return [execute, { ...result, data: data?.data?.userLogin }] as const;
}

export function useAuthSignupMutation() {
  const model = new GqlModel({
    userRegister: {
      access_token: types.string,
      user: UserModel,
    },
  });
  const [trigger, { data, ...result }] = useGqlMutation<typeof model.data>();

  function execute(payload: UserRegisterInput) {
    model.setParams("userRegister", {
      args: {
        email: rawString(payload.email),
        name: rawString(payload.name),
        password: rawString(payload.password),
      },
    });

    return trigger(model.mutation());
  }

  return [execute, { ...result, data: data?.data?.userRegister }] as const;
}
