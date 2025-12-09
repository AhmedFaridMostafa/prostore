import Pagination from "@/components/shared/pagination";
import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import { buildFilterUrl, cn } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Link from "next/link";

export async function generateMetadata({ searchParams }: SearchParamProps) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await searchParams;
  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";
  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? q : ""}
      ${isCategorySet ? `: Category ${category}` : ""}
      ${isPriceSet ? `: Price ${price}` : ""}
      ${isRatingSet ? `: Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $100",
    value: "51-100",
  },
  {
    name: "$101 to $200",
    value: "101-200",
  },
  {
    name: "$201 to $500",
    value: "201-500",
  },
  {
    name: "$501 to $1000",
    value: "501-1000",
  },
];
const sortOrders = ["newest", "lowest", "highest", "toprated"];

const ratings = [4, 3, 2, 1];
const SearchPage = async ({ searchParams }: SearchParamProps) => {
  const params = await searchParams;

  const filters = {
    q: params.q || "all",
    category: params.category || "all",
    price: params.price || "all",
    rating: params.rating || "all",
    sort: params.sort || "newest",
    page: params.page || "1",
  };

  const [products, categories] = await Promise.all([
    getAllProducts({
      category: filters.category,
      query: filters.q,
      price: filters.price,
      rating: filters.rating,
      page: Number(filters.page),
      sort: filters.sort,
    }),
    getAllCategories(),
  ]);

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        {/* Category Links */}
        <div className="text-xl mt-3 mb-2">Department</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={cn({ "font-bold": filters.category === "all" })}
                href={buildFilterUrl("/search", {
                  ...filters,
                  category: "all",
                })}
              >
                Any
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <Link
                  className={cn({
                    "font-bold": x.category === filters.category,
                  })}
                  href={buildFilterUrl("/search", {
                    ...filters,
                    category: x.category,
                  })}
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Price Links */}
        <div>
          <div className="text-xl mt-8 mb-2">Price</div>
          <ul className="space-y-1">
            <li>
              <Link
                className={cn({
                  "font-bold": filters.price === "all",
                })}
                href={buildFilterUrl("/search", { ...filters, price: "all" })}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={buildFilterUrl("/search", {
                    ...filters,
                    price: p.value,
                  })}
                  className={cn({
                    "font-bold": p.value === filters.price,
                  })}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Rating Links */}
        <div>
          <div className="text-xl mt-8 mb-2">Customer Review</div>
          <ul className="space-y-1">
            <li>
              <Link
                href={buildFilterUrl("/search", { ...filters, rating: "all" })}
                className={cn({
                  "font-bold": filters.rating === "all",
                })}
              >
                Any
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={buildFilterUrl("/search", {
                    ...filters,
                    rating: `${r}`,
                  })}
                  className={cn({
                    "font-bold": filters.rating === r.toString(),
                  })}
                >
                  {`${r} stars & up`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4 space-y-4">
        <div className="flex-between flex-col md:flex-row my-4">
          <div className="flex items-center">
            {filters.q !== "all" && filters.q !== "" && "Query : " + filters.q}
            {filters.category !== "all" &&
              filters.category !== "" &&
              "   Category : " + filters.category}
            {filters.price !== "all" && "    Price: " + filters.price}
            {filters.rating !== "all" &&
              "    Rating: " + filters.rating + " & up"}
            &nbsp;
            {(filters.q !== "all" && filters.q !== "") ||
            (filters.category !== "all" && filters.category !== "") ||
            filters.rating !== "all" ||
            filters.price !== "all" ? (
              <Button variant={"link"} asChild>
                <Link href="/search">Clear</Link>
              </Button>
            ) : null}
          </div>
          <div>
            Sort by{" "}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={cn("mx-2 capitalize", {
                  "font-bold": filters.sort === s,
                })}
                href={buildFilterUrl("/search", { ...filters, sort: s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products!.data.length === 0 && <div>No product found</div>}
          {products!.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products!.totalPages! > 1 && (
          <Pagination
            page={Number(filters.page)}
            totalPages={products!.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
