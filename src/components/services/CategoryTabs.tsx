import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  categories: Array<{ label: string; value: string }>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full">
      <TabsList className="inline-flex h-12 items-center justify-start w-full md:w-auto bg-muted/50 p-1 rounded-lg overflow-x-auto">
        {categories.map((category) => (
          <TabsTrigger
            key={category.value}
            value={category.value}
            className="px-6 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm whitespace-nowrap"
          >
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
