import React from "react";
import { CarouselImage } from "./CarouselImage";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

const HomeListCard = ({ data }) => {
  const router = useRouter();
  console.log(data)
  const photos = data.photos?.length > 0 ? data.photos : ["default-image-url.jpg"];
  const handleCardClick = (id) => {
    console.log(id,'id')
    router.push(`/Oda/${id}`);
  };

  return (
    <div
      className="max-w-sm bg-white border rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div  onClick={() => handleCardClick(data.id)} className="relative w-full">
        <CarouselImage data={photos} />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {data.name || "Başlık Bulunamadı"}
          </h2>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-800 mr-1">
              {data.rating || "0.0"}
            </span>
            <Star className="w-4 h-4 text-yellow-500" />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {data.description || "Açıklama Bulunamadı"}
        </p>

        <div className="text-gray-800 text-lg font-bold">
          {data.price ? `${data.price} ₺` : "Fiyat Bilgisi Bulunamadı"}
        </div>
      </div>
    </div>
  );
};



export default HomeListCard;
