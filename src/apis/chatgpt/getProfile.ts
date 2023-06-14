import { getOpenAIAccessToken, setOpenAIAccessToken } from "../../storage/accessToken";

export const getProfile = async (userAgent: string, sessionToken: string) => {
  let res = await getOpenAIAccessToken()

  const user = res?.user;
  if (user) {
    return user
  }

  const url = "https://chat.openai.com/api/auth/session";
  const headers = {
    cookie: `__Secure-next-auth.session-token=${sessionToken}`,
    Accept: "*/*",
    "user-agent": userAgent,
    "accept-encoding": "gzip, deflate, br",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "none"
  }
  const options = {
    method: "GET",
    headers
  }

  try {
    res = await fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && chrome && chrome.tabs) {
          throw new Error("Unable to get session");
        }

        return response
      })
      .then((response) => response.json())
  }
  catch (error) {
    throw new Error("Fetch Failed");
  }
  setOpenAIAccessToken(res)

  if (!res?.user) {
    throw new Error("Unable to get access token");
  }

  return res?.user;
};
