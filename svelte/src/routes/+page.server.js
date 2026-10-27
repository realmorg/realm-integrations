export function load() {
  return { user: { name: "Ada Lovelace", plan: "Pro" } };
}

export const actions = {
  subscribe: async ({ request }) => {
    const data = await request.formData();
    return { email: String(data.get("email") ?? "") };
  },
};
