import { subscribe } from "./actions";

async function getCurrentUser() {
  return { name: "Ada Lovelace", plan: "Pro" };
}

export default async function AccountPage() {
  const user = await getCurrentUser();

  return (
    <>
      <h1>Account</h1>

      <user-card name={user.name} plan={user.plan}></user-card>

      <form action={subscribe}>
        <ui-field>
          <ui-label for="email">Email</ui-label>
          <ui-input id="email" name="email" type="email" required suppressHydrationWarning></ui-input>
        </ui-field>
        <ui-button type="submit">Subscribe</ui-button>
      </form>
    </>
  );
}
