import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import banner from '../../../assets/Banner/food-delivery-banner-design-flat-design-online-order-vector.jpg';

const districts = [
  { name: 'Dhaka', hasBranch: true },
  { name: 'Chittagong', hasBranch: true },
  { name: 'Sylhet', hasBranch: false },
  { name: 'Rajshahi', hasBranch: true },
  { name: 'Barisal', hasBranch: false },
  { name: 'Khulna', hasBranch: true },
  { name: 'Rangpur', hasBranch: false },
  { name: 'Mymensingh', hasBranch: true },
];

function Banner() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    const result = districts.find((district) =>
      district.name.toLowerCase() === searchQuery.toLowerCase()
    );
    setSearchResult(result ? (result.hasBranch ? 'Yes' : 'Not Available') : 'Not Available');
  };

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div>
            <h1 className="text-4xl font-bold text-center my-6">
              Efficient Parcel Management with FoodyMoody
            </h1>
            <div className="relative w-full max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Enter district name..."
                className="w-full p-3 pr-10 rounded-lg border-2 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 shadow-sm transition duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                onClick={handleSearch}
              />
            </div>
            {searchResult !== null && (
              <div className="mt-4">
                <p
                  className={`text-2xl font-bold ${
                    searchResult === 'Yes' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {searchResult}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
