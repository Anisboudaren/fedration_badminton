import { getPlayerById } from "@/lib/data/site-data.server";
import PlayerProfilePage from "@/views/players-id";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const { id } = await params;
  const initialPlayer = (await getPlayerById(id)) ?? null;
  return <PlayerProfilePage initialPlayer={initialPlayer} />;
}
