import { useGqlMutation } from "@hooks/useGql";
import { GqlModel } from "@lib/graphql/model";
import { UserModel } from "@resources/model/user.model";
import { rawString, types } from "typed-graphqlify";
import { UserLoginInput } from "./../input/auth.input";

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
