import { View, Text, Image } from "react-native";
import React, { useState } from "react";

import { TouchableOpacity } from "react-native";
import { urlFor } from "../sanity";
import { StarIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithID,
} from "../features/BasketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithID(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <View className="w-full border rounded-md bg-white flex-row mb-1">
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`  border p-1 border-gray-200 flex w-full`}
      >
        <View className="flex-row w-full">
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{ uri: urlFor(image).url() }}
              className="h-28 w-28 bg-gray-300"
            />
          </View>
          <View className="flex-1 pr-2 p-3">
            <Text className="text-sm font-semibold mb-1">{name}</Text>
            <View className="flex-row items-center absolute bottom-0 left-2">
              <StarIcon color="red" opacity={0.3} size={22} />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500">{4.5}</Text>
              </Text>
            </View>
            <View className="flex-row absolute bottom-0 right-0">
              <Text className=" mt-2 font-medium">
                {"Rs "}
                {price}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DishRow;
