"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const ProductCarousel = ({ data }: { data: Product[] }) => {
  const autoplay = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );
  return (
    <Carousel
      className="w-full max-w-full mb-12"
      opts={{ loop: true }}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <CarouselContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className="relative mx-auto">
                <Image
                  priority={true}
                  alt={product.name}
                  src={product.banner!}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 flex items-end justify-center">
                  <h2 className=" bg-gray-900 bg-opacity-50 text-2xl font-bold px-2 text-white  ">
                    {product.name}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex md:-left-8 lg:-left-10 xl:-left-12" />
      <CarouselNext className="hidden md:flex md:-right-8 lg:-right-10 xl:-right-12" />
    </Carousel>
  );
};
export default ProductCarousel;
