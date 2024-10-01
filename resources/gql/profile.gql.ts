import { useGqlQuery } from "@hooks/useGql";
import { GqlModel } from "@lib/graphql/model";
import { UserModel } from "@resources/model/user.model";

export function useGetProfileQuery() {
  const model = new GqlModel({
    userPersonalProfile: UserModel,
  });

  const [trigger, { data, ...result }] = useGqlQuery<typeof model.data>();

  function execute() {
    return trigger(model.query());
  }

  return [
    execute,
    { ...result, data: data?.data.userPersonalProfile },
  ] as const;
}
