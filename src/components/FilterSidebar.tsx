'use client';

import { Category } from '@/types/categoryModel';
import CategorySidebar from './CategorySidebar';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';
import Spinner from './Spinner';
import { formatCurrency } from '@/utils/helpers';

interface FilterSidebarProps {
  priceRange: number[];
  setPriceRange: (arg: number[]) => void;
  inStockOnly: boolean;
  setInStockOnly: (arg: boolean) => void;
  categories: Category[];
  loadingCategories: boolean;
  activeCategoryId?: number | string;
  errorCategoriesMessage?: string | null;
}

export default function FilterSidebar({
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
  categories,
  loadingCategories,
  errorCategoriesMessage,
  activeCategoryId,
}: FilterSidebarProps) {
  return (
    <>
      {loadingCategories && <Spinner />}
      {errorCategoriesMessage && <p>{errorCategoriesMessage}</p>}
      <div className="space-y-6">
        <CategorySidebar
          categories={categories}
          activeCategoryId={activeCategoryId}
        />
        <Separator />
        <div>
          <h3 className="mb-4 text-lg font-medium">Price Range</h3>
          <div className="px-2">
            <Slider
              defaultValue={[0, 10000]}
              max={10000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-6"
            />
            <div className="flex items-center justify-between">
              <span>{formatCurrency(priceRange[0])}</span>
              <span>{formatCurrency(priceRange[1])}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="mb-4 text-lg font-medium">Availability</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
            />
            <Label htmlFor="in-stock">In Stock Only</Label>
          </div>
        </div>
      </div>
    </>
  );
}
