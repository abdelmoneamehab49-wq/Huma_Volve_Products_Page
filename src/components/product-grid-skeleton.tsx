import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_SIZE } from "@/lib/catalog";

export function ProductGridSkeleton({ count = PAGE_SIZE }: { count?: number }) {
  return (
    <ul
      aria-hidden
      className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <div className="flex h-full flex-col gap-3 rounded-2xl bg-secondary p-5">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-3 w-2/5" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="mt-auto h-10 w-full rounded-xl" />
          </div>
        </li>
      ))}
    </ul>
  );
}
