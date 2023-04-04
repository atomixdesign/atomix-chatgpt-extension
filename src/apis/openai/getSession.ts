import { getOpenAIAccessToken, setOpenAIAccessToken } from "../../storage/accessToken";

export const getSessionAccessToken = async (userAgent: string, sessionToken: string) => {
  let res = await getOpenAIAccessToken()

  // if (res) {
  //   return res?.accessToken
  // }

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
    chrome.tabs.create({ url: 'https://chat.openai.com/chat' })
  }

  setOpenAIAccessToken(res)

  const accessToken = res?.accessToken;
  if (!accessToken) {
    throw new Error("Unable to get access token");
  }

  console.log("DEBUG accessToken: ", accessToken)
  return accessToken;
};
