import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "../../types/products";

export function Slider({ data }: { data: Product[] }) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1); // Small screen
      } else if (window.innerWidth < 768) {
        setVisibleItems(2); // Medium screen
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3); // Large screen
      } else {
        setVisibleItems(4); // Extra large screen
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + visibleItems >= data.length ? 0 : prevIndex + visibleItems
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, data.length - visibleItems)
        : Math.max(0, prevIndex - visibleItems)
    );
  };

  const displayedItems = data.slice(startIndex, startIndex + visibleItems);

  return (
    <div className="relative w-full py-8">
      <div className={`grid grid-cols-${visibleItems} gap-4 w-full`}>
        {displayedItems.map((item) => (
          <SliderData key={item.id} item={item} />
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full shadow-md"
        onClick={prevSlide}
        disabled={startIndex === 0}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full shadow-md"
        onClick={nextSlide}
        disabled={startIndex + visibleItems >= data.length}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function SliderData({ item }: { item: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-full overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <CardContent className="p-0">
        <Link to={`/p/${item.id}`}>
          <div className="relative h-[280px] w-full overflow-hidden">
            {item.variants && (
              <img
                src={item.variants[0].image as string}
                alt={item.name}
                className="w-full h-full object-cover transform transition-transform duration-500 ease-out"
                style={{ transform: isHovered ? "scale(1.2)" : "scale(1)" }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-white/500" />
            <h3 className="absolute bottom-4 left-4 text-md text-white">
              {item.name}
            </h3>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
