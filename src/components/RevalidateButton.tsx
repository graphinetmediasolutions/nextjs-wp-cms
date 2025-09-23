// components/RevalidateButton.tsx (Server Component)
export default function RevalidateButton() {
  async function run() {
    "use server";
    await fetch(new URL("/api/revalidate", process.env.NEXT_PUBLIC_BASE_URL!).toString(), {
      method: "PUT", // or PUT if your route supports it
      headers: {
        "content-type": "application/json",
        "x-headless-secret-key": process.env.HEADLESS_SECRET!, // ok on server action
      },
      body: JSON.stringify({ tags: ["wordpress"] }), // ⬅️ REQUIRED
    });
  }
  return (
    <form action={run}>
      <button type="submit" className="rounded border px-3 py-2 text-sm">
        Revalidate now
      </button>
    </form>
  );
}
