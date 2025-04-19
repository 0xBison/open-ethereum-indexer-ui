export interface Event {
  id: string;
  name: string;
}

export async function fetchEvents(): Promise<Event[]> {
  console.log(
    "Fetching events from:",
    `${import.meta.env.VITE_API_ROOT}/events`
  );

  const response = await fetch(`${import.meta.env.VITE_API_ROOT}/events`, {
    headers: {
      accept: "*/*",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await response.json();
  console.log("Fetched events:", data);
  return data;
}
