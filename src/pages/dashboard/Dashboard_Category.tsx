import { GetCategory } from "../../api/categories/categories.query";
import { DialogCreateCategory } from "./buttons/category/Create";
import { HeaderDashboard } from "./components/Header";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ImageOff } from "lucide-react";
import { Dropdowns } from "./buttons/category/Dropdowns";

export function DashboardCategory() {
  const { data } = GetCategory();

  return (
    <div className="p-6 space-y-6 h-[80vh]  overflow-y-auto">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <HeaderDashboard
          title="Categories"
          subTitle="Manage your product categories here"
        />
        <DialogCreateCategory />
      </div>
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              {item.image_url ? (
                <img
                  src={item.image_url as string}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <ImageOff className="w-12 h-12" />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex  justify-between mb-2">
                <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                <Badge>{item.is_active ? "Active" : "Inactive"}</Badge>
              </div>
              <Dropdowns initialData={item} />

              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardCategory;
