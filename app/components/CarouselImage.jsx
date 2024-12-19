import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselImage({ data }) {
  return (
    <Carousel className="min-w-full">
      <CarouselContent>
        {data.map((photo, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="p-0">
                <div className="relative w-full h-64">
                  <Image
                    src={photo}
                    alt={`carousel image ${index}`}
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded" 
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100">
        &#8249; {/* Left Arrow Icon */}
      </CarouselPrevious>
      
      {/* Next Button */}
      <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100">
        &#8250; {/* Right Arrow Icon */}
      </CarouselNext>
    </Carousel>
  );
}
