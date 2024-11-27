import { Loader2, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GetCategory } from "../../api/categories/categories.query";
import { ButtonHighlight } from "../../components/ui/button/ButtonHighlight";
import { CategoriesForm } from "../../types/categories";

export function CategoriesSection() {
  const { data, isLoading } = GetCategory();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader2 className="animate-spin rounded-full text-blue-500" />;
  }

  const category = data?.data;

  if (!category || category.length === 0) {
    return null;
  }

  return (
    <section className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {category.map((item) => (
        <div
          key={item.name}
          onClick={() => navigate(`/c/${item.name}`)}
          className="relative cursor-pointer">
          <img
            src={item.image_url as string}
            alt={item.name}
            width={500}
            height={500}
            className="h-[70vh] object-cover w-full"
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-10">
            <ButtonHighlight>
              <p className="font-sans">{item.name}</p>
              <MoveRight />
            </ButtonHighlight>
          </div>
        </div>
      ))}
    </section>
  );
}
