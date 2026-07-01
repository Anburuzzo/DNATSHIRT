import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";

const { width } =
  Dimensions.get("window");

const banners = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",


];

export default function BannerSlider() {

  const scrollRef =
    useRef<ScrollView>(null);

  const [currentIndex,
    setCurrentIndex] =
    useState(0);

  useEffect(() => {

    const interval =
      setInterval(() => {

        const nextIndex =
          currentIndex ===
          banners.length - 1
            ? 0
            : currentIndex + 1;

        scrollRef.current?.scrollTo({
          x: nextIndex * (width - 30),
          animated: true,
        });

        setCurrentIndex(
          nextIndex
        );

      }, 3000);

    return () =>
      clearInterval(interval);

  }, [currentIndex]);

  return (

    <View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >

        {banners.map(
          (banner, index) => (

            <Image
              key={index}
              source={{
                uri: banner,
              }}
              style={{
                width: width - 30,
                height: 180,
                borderRadius: 16,
                marginBottom: 15,
              }}
            />

          )
        )}

      </ScrollView>

    </View>

  );
}