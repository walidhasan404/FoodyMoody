import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedText from "../../../Shared/AnimatedText/AnimatedText";

const FoodsSection = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("https://food-delivery-server-beryl.vercel.app/foods");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setFoods(
          data.map((food) => ({
            ...food,
            weights: [250, 500, 750, 1000],
            selectedWeight: 250,
            pricePerGram: food.price / 250,
          }))
        );
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };
    fetchFoods();
  }, []);

  const handleWeightChange = (id, newWeight) => {
    setFoods((prevFoods) =>
      prevFoods.map((food) =>
        food.id === id
          ? { ...food, selectedWeight: newWeight, price: food.pricePerGram * newWeight }
          : food
      )
    );
  };

  const handleOrderNow = (food) => {
    navigate("/dashboard/parcelBooking", {
      state: {
        parcelType: "foods",
        parcelWeight: food.selectedWeight / 1000,
        price: food.price.toFixed(2),
      },
    });
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedText text="Our Delicious Foods" />
        <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <div
              key={food.id}
              className="bg-white shadow-3xl rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {food.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {food.description || "No description available."}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <span className="text-xl font-bold text-green-600">
                    {food.price.toFixed(2)}tk
                  </span>
                  <div>
                    <label
                      htmlFor={`weight-${food.id}`}
                      className="block text-gray-700 text-sm font-medium"
                    >
                      Select Weight (g):
                    </label>
                    <select
                      id={`weight-${food.id}`}
                      value={food.selectedWeight}
                      onChange={(e) =>
                        handleWeightChange(food.id, parseInt(e.target.value, 10))
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    >
                      {food.weights.map((weight) => (
                        <option key={weight} value={weight}>
                          {weight} g
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => handleOrderNow(food)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodsSection;
