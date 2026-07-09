import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  useLocalSearchParams,
} from "expo-router";

import * as ImagePicker from "expo-image-picker";

import {
  getProductById,
  updateProduct,
} from "../../src/services/productService";

export default function EditProduct() {

  const { id } =
    useLocalSearchParams();

    const [loading, setLoading] =
  useState(true);

const [name, setName] =
  useState("");

const [price, setPrice] =
  useState("");

const [category, setCategory] =
  useState("");

const [image, setImage] =
  useState("");


  useEffect(() => {
  loadProduct();
}, []);

const loadProduct = async () => {

  const product =
    await getProductById(
      id as string
    );

  if (!product) {

    Alert.alert(
      "Error",
      "Product not found"
    );

    return;
  }

  setName(product.name || "");

  setPrice(
    String(product.price || "")
  );

  setCategory(
    product.category || ""
  );

  setImage(
    product.image || ""
  );

  setLoading(false);
};

if (loading) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size="large"
      />
    </View>
  );
}


const pickImage = async () => {

  const result =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

  if (result.canceled) return;

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

  const uploaded =
    await response.json();

  setImage(
    uploaded.secure_url
  );
};


const handleUpdate = async () => {

  if (
    !name ||
    !price ||
    !category ||
    !image
  ) {

    Alert.alert(
      "Error",
      "Please fill all fields."
    );

    return;
  }

  try {

    await updateProduct(
      id as string,
      {
        name,
        price: Number(price),
        category,
        image,
      }
    );

    Alert.alert(
      "Success",
      "Product Updated Successfully 🎉"
    );

  } catch (error) {

    console.log(error);

    Alert.alert(
      "Error",
      "Failed to update product."
    );

  }
};

  return (
  <View style={styles.container}>

    <Text style={styles.title}>
      Edit Product 👕
    </Text>

    <Image
      source={{ uri: image }}
      style={styles.image}
    />

    <TextInput
      value={name}
      onChangeText={setName}
      placeholder="Product Name"
      style={styles.input}
    />

    <TextInput
      value={price}
      onChangeText={setPrice}
      placeholder="Price"
      keyboardType="numeric"
      style={styles.input}
    />

    <TextInput
      value={category}
      onChangeText={setCategory}
      placeholder="Category"
      style={styles.input}
    />

    <TouchableOpacity
  style={styles.uploadButton}
  onPress={pickImage}
>
  <Text style={styles.uploadText}>
    📷 Change Image
  </Text>
</TouchableOpacity>



<TouchableOpacity
  style={styles.updateButton}
  onPress={handleUpdate}
>
  <Text style={styles.updateText}>
    💾 Update Product
  </Text>
</TouchableOpacity>

  </View>
);
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 16,
  },

  uploadButton: {
  backgroundColor: "#2563EB",
  padding: 15,
  borderRadius: 12,
  marginBottom: 15,
},

uploadText: {
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 16,
},

updateButton: {
  backgroundColor: "#16A34A",
  padding: 16,
  borderRadius: 12,
},

updateText: {
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 17,
},

});

