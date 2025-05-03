import AllProductsClient from "@/components/client/AllProductsClient";
import { Suspense } from "react";

export default function AllProductsPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <AllProductsClient />
    </Suspense>
  );
}
