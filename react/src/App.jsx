import { useState } from "react";

export function App({ user }) {
  const [email, setEmail] = useState("");

  return (
    <>
      <h1>Account</h1>

      <user-card name={user.name} plan={user.plan}></user-card>

      <form method="post" action="/subscribe">
        <ui-label for="email">Email</ui-label>
        <ui-input id="email" name="email" type="email" autocomplete="email" required onchange={(event) => setEmail(event.target.value)}></ui-input>
        <p>{email ? `Ready to subscribe ${email}.` : "Enter your email."}</p>
        <ui-button type="submit">Subscribe</ui-button>
      </form>
    </>
  );
}
