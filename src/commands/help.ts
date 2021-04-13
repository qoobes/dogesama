import CommandActionReturnInterface from "../interfaces/CommandActionReturnInterface";

const action = (): CommandActionReturnInterface => ({
  success: true,
  message: "helping u",
});

const name = "help";
const description = "help meeeeeee";

export default {
  action,
  name,
  description,
};
