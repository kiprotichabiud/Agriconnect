// @ts-check
import { module } from "@prisma/composer";
import agriconnectService from "./service.mjs";

export default module("agriconnect", ({ provision }) => {
  provision(agriconnectService);
});
