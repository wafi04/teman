import { userGetCheckout } from "../../api/order/order";
import { useGetProducts } from "../../api/products/products.query";
import { Slider } from "../home/Slider";
import { HeaderDashboard } from "./components/Header";

export function DashboardHome() {
  const { data: products } = useGetProducts();

  return (
    <section className="p-6 space-y-6 h-[80vh] overflow-y-auto">
      <HeaderDashboard title="Dashboard" subTitle="Dashboard" />
      {products && <Slider data={products} variant="SLiderData2" />}
    </section>
  );
}
