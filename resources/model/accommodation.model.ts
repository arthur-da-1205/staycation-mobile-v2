import { types } from "typed-graphqlify";

export const AccommodationModel = {
  description: types.string,
  id: types.number,
  location: types.string,
  name: types.string,
  price: types.number,
  status: types.string,
  type: types.string,
};
