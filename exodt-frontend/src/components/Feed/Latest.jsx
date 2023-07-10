import React from 'react'
import { AuthClient } from "@dfinity/auth-client";

const Latest = () => {

  const init = async () => {
    const authClient = await AuthClient.create();

    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient);
    } else {
      await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: () => {
          handleAuthenticated(AuthClient);
        },
      });
    }
  };

  async function handleAuthenticated(authClient) {
    const identity = await authClient.getIdentity();
    const userPrincipal = identity.getPrincipal().toString();
    console.log(userPrincipal);
  }

  return (
    <div><button onClick={() => init()}>Login</button></div>
  )
}

export default Latest