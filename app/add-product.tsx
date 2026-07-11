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
import { router } from "expo-router";
export default function AddProduct() {

   

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");
    const [stock, setStock] =
  useState("");
  const [description, setDescription] =
  useState("");

  const [image, setImage] =
    useState("");

    const [uploading, setUploading] =
  useState(false);

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
  description,
  stock: Number(stock),

  status:
    Number(stock) > 0
      ? "Active"
      : "Out of Stock",

  createdAt:
    new Date().toISOString(),
});

    Alert.alert(
  "Success",
  "Product Added Successfully 🎉"
);
router.back();

    setName("");
    setPrice("");
    setCategory("");
    setStock("");
    setImage("");
  };

const pickImage = async () => {
  try {
    setUploading(true);

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.8,
      });

    if (result.canceled) {
      setUploading(false);
      return;
    }

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

    setImage(uploadedImage.secure_url);

  } catch (error) {

    Alert.alert(
      "Upload Failed",
      "Please try again."
    );

  } finally {

    setUploading(false);

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
  placeholder="Stock"
  keyboardType="numeric"
  value={stock}
  onChangeText={setStock}
  style={styles.input}
/>

<TextInput
  placeholder="Description"
  value={description}
  onChangeText={setDescription}
  multiline
  numberOfLines={3}
  style={[
    styles.input,
    {
      height: 90,
      textAlignVertical: "top",
    },
  ]}
/>

    

      <TouchableOpacity
  style={styles.uploadButton}
  onPress={pickImage}
>

  <Text style={styles.uploadText}>
  {uploading
    ? "Uploading..."
    : "📷 Select Image"}
</Text>
</TouchableOpacity>


 {image ? (
  <Image
    source={{ uri: image }}
    style={styles.preview}
  />
) : null}

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
   
  backgroundColor: "#111827",
  padding: 18,
  borderRadius: 18,
  alignItems: "center",
  elevation: 10,
  shadowColor: "#000",
 

  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  uploadButton: {
  backgroundColor: "#c1d2d2",
  padding: 14,
  borderRadius: 12,
  marginBottom: 15,
},

uploadText: {
  color: "#000000",
  textAlign: "center",
  fontWeight: "bold",
},

preview: {
  width: "100%",
  height: 220,
  borderRadius: 12,
  marginBottom: 20,
},
});