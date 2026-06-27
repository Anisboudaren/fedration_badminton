import { Loader2 } from "lucide-react";

export function AdminLoader({ label = "Loading admin..." }: { label?: string }) {
  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-md rounded-xl border bg-card p-8 text-center shadow-sm">
        <Loader2 className="mx-auto h-7 w-7 animate-spin text-primary" />
        <p className="mt-3 text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
