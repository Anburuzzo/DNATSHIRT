import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image ,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { addProduct } from "../src/services/productService";

export default function AddProduct() {

   

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [image, setImage] =
    useState("");

  const handleSave = async () => {

    if (
      !name ||
      !price ||
      !category ||
      !image
    ) {
      Alert.alert(
        "Error",
        "Fill all fields"
      );
      return;
    }

    await addProduct({
      name,
      price: Number(price),
      category,
      image,
    });

    Alert.alert(
      "Success",
      "Product Added"
    );

    setName("");
    setPrice("");
    setCategory("");
    setImage("");
  };

const pickImage = async () => {

const result =
  await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    quality: 0.8,
  });

  if (!result.canceled) {

    const imageUri =
      result.assets[0].uri;

    const data =
      new FormData();

    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "product.jpg",
    } as any);

    data.append(
      "upload_preset",
      "dnatshirt_upload"
    );

    const response =
      await fetch(
        "https://api.cloudinary.com/v1_1/ues5tn61/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

    const uploadedImage =
      await response.json();

    setImage(
      uploadedImage.secure_url
    );
  }
};



  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Add Product 👕
      </Text>

      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />


      <TouchableOpacity
  style={styles.uploadButton}
  onPress={pickImage}
>
  <Text style={styles.uploadText}>
    📷 Select Image
  </Text>
</TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Save Product
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#16A34A",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  uploadButton: {
  backgroundColor: "#2563EB",
  padding: 14,
  borderRadius: 12,
  marginBottom: 15,
},

uploadText: {
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
},
});