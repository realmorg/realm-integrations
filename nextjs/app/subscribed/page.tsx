import Link from "next/link";

export default async function SubscribedPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email = "" } = await searchParams;

  return (
    <>
      <h1>Thanks</h1>
      <p>Subscribed: {email}</p>
      <p>
        <Link href="/">Back</Link>
      </p>
    </>
  );
}
