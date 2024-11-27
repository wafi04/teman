import { useGetProducts } from "../../api/products/products.query";
import { HeaderMainPage } from "./Header_Main";
import { Slider } from "./Slider";

export function ProductSection() {
  const { data } = useGetProducts();
  console.log(data);

  const products = data?.pages.flatMap((p) => p.data);

  return (
    <section className="container  w-full space-y-6 mt-10">
      <HeaderMainPage title={"Featured Products"} />
      {products && <Slider data={products} />}
    </section>
  );
}
