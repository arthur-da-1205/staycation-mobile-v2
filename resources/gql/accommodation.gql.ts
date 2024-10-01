import { useGqlQueryPaginate } from "@hooks/useGql";
import { GqlPaginateModel } from "@lib/graphql/model";
import { AccommodationModel } from "@resources/model/accommodation.model";

export function useGetAccommodationList() {
  const model = new GqlPaginateModel("userAccommodationList", AccommodationModel);

  const [trigger, { items, ...result }] = useGqlQueryPaginate<typeof model.nodes>();

  function execute() {
    model.setParams("userAccommodationList", { sort: "-created_at" });

    return trigger(model.query());
  }

  return [execute, { ...result, items }] as const;
}
