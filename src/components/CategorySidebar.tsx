import React, { useState } from 'react';
import { Category } from '@/types/categoryModel';
import { Button } from './ui/button';

interface CategorySidebarProps {
  categories: Category[];
  activeCategoryId?: number | string;
  basePath?: string; // e.g. '/categories'
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  activeCategoryId,
  basePath = '/categories',
}) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const filteredCategories = categories.filter(Boolean);
  const hasMore = filteredCategories.length > visibleCount;
  const showLess =
    visibleCount > 8 && visibleCount >= filteredCategories.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, filteredCategories.length));
  };

  const handleShowLess = () => {
    setVisibleCount(8);
  };

  return (
    <div className="flex flex-col max-h-[500px]">
      <div className="flex-1 pr-2 space-y-2 overflow-y-auto">
        {filteredCategories.slice(0, visibleCount).map((cat) => (
          <a
            key={cat.id}
            href={`${basePath}/${cat.id}`}
            className={`flex items-center justify-between w-full px-2 py-2 rounded-md hover:bg-muted transition-colors ${
              String(cat.id) === String(activeCategoryId)
                ? 'bg-primary/10 text-primary font-semibold'
                : ''
            }`}
          >
            <span className="text-sm font-medium">{cat.name}</span>
            <span className="text-xs text-muted-foreground">
              ({cat.products?.length || 0})
            </span>
          </a>
        ))}
      </div>

      <div className="mt-2 space-y-1">
        {hasMore && (
          <Button
            variant="ghost"
            className="w-full text-sm text-muted-foreground hover:text-primary"
            onClick={handleShowMore}
          >
            Show More
          </Button>
        )}

        {showLess && (
          <Button
            variant="ghost"
            className="w-full text-sm text-muted-foreground hover:text-primary"
            onClick={handleShowLess}
          >
            Show Less
          </Button>
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;
