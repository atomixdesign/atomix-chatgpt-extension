import { getOpenAIAccessToken } from "../../storage/accessToken";

export const getProfile = async () => {
  let res = await getOpenAIAccessToken()

  const user = res?.user;
  if (!user) {
    throw new Error("Unable to get user");
  }

  return user;
};
