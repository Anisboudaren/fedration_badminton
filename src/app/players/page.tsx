import { getPlayers } from "@/lib/data/site-data.server";
import PlayersPage from "@/views/players";

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialPlayers = await getPlayers();
  return <PlayersPage initialPlayers={initialPlayers} />;
}
