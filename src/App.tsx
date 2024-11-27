import { Banner } from "./pages/home/Banner";
import { CategoriesSection } from "./pages/home/Categories";
import { ProductSection } from "./pages/home/ProductSection";
import { ProtectedLayout, PublicLayout } from "./pages/layouts/AuthLayout";
import Footer from "./pages/layouts/Footer";

function App() {
  return (
    <ProtectedLayout title="Home">
      <Banner />
      <ProductSection />
      <CategoriesSection />
      <Footer />
    </ProtectedLayout>
  );
}

export default App;
