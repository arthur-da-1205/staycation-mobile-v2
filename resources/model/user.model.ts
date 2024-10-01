import { types } from "typed-graphqlify";

export const UserModel = {
  id: types.number,
  name: types.string,
  email: types.string,
};
