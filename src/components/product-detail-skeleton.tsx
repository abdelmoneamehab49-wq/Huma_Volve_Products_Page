import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div
      aria-hidden
      className="grid gap-8 rounded-3xl border border-border bg-card p-5 sm:p-6 lg:grid-cols-2 lg:p-8"
    >
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}
