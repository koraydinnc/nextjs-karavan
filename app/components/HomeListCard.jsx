import React from "react";
import PropTypes from "prop-types";
import { CarouselImage } from "./CarouselImage";
import { Star } from "lucide-react"; // Shadcn/Lucide için yıldız ikonu

const HomeListCard = ({ data }) => {
  return (
    <div className="max-w-sm bg-white border rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="relative w-full h-56">
        <CarouselImage data={data.photos} />
      </div>

      <div className="p-4 mt-12">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {data.name || "Başlık Bulunamadı"}
          </h2>
          {/* Rating */}
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

HomeListCard.propTypes = {
  data: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    rating: PropTypes.number, // Derecelendirme için prop
  }).isRequired,
};

export default HomeListCard;
