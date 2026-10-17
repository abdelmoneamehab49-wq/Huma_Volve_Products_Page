import { Suspense } from "react";
import { ProductDetail } from "@/components/product-detail";
import { ProductDetailSkeleton } from "@/components/product-detail-skeleton";
import { SiteHeader } from "@/components/site-header";

type ProductPageProps = PageProps<"/products/[id]">;

async function ProductDetailRoute({
  params,
}: Pick<ProductPageProps, "params">) {
  const { id } = await params;
  return <ProductDetail id={id} />;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <SiteHeader />
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailRoute params={params} />
      </Suspense>
    </div>
  );
}
