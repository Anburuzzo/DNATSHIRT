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
  ScrollView,
} from "react-native";

import {
  useLocalSearchParams,
} from "expo-router";

import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import {
  getProductById,
  updateProduct,
} from "../../src/services/productService";

export default function EditProduct() {

  const { id } =
    useLocalSearchParams();

    const [loading, setLoading] =
  useState(true);
  const [updating, setUpdating] =
  useState(false);

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

  const [success, setSuccess] =
  useState(false);


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

  setStock(
  String(product.stock || "")
);
setDescription(
  product.description || ""
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


const increaseStock = () => {
  setStock(
    String(Number(stock || 0) + 1)
  );
};

const decreaseStock = () => {
  if (Number(stock) <= 0) return;

  setStock(
    String(Number(stock) - 1)
  );
};


const add10Stock = () => {
  setStock(
    String(Number(stock || 0) + 10)
  );
};

const add25Stock = () => {
  setStock(
    String(Number(stock || 0) + 25)
  );
};

const add50Stock = () => {
  setStock(
    String(Number(stock || 0) + 50)
  );
};

const resetStock = () => {

  Alert.alert(

    "Reset Stock",

    "Are you sure you want to reset stock to 0?",

    [
      {
        text: "Cancel",
        style: "cancel",
      },

      {
        text: "Reset",
        style: "destructive",

        onPress: () => {
          setStock("0");
        },
      },
    ]

  );

};


const handleUpdate = async () => {



  if (
    !name ||
  !price ||
  !category ||
  !description ||
  !image ||
  stock === ""
  ) {

    Alert.alert(
      "Error",
      "Please fill all fields."
    );

    return;
  }

   setUpdating(true);

  try {

   await updateProduct(
  id as string,
  {
  name,
  price: Number(price),
  category,

  description,

  stock: Number(stock),

  status:
    Number(stock) > 0
      ? "Active"
      : "Out of Stock",

  image,
}
);

setSuccess(true);
setTimeout(() => {
  router.replace("/admin/manage-products");
}, 3000);



  } catch (error) {

    console.log(error);

    Alert.alert(
      "Error",
      "Failed to update product."
    );

  }

  setUpdating(false);
};



if (success) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text
        style={{
          fontSize: 70,
        }}
      >
        ✅
      </Text>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginTop: 20,
        }}
      >
        Product Updated!
      </Text>
    </View>
  );
}

  return (
  <View style={styles.container}>

      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >

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

    <TextInput
  placeholder="Product Description"
  value={description}
  onChangeText={setDescription}
  multiline
  numberOfLines={4}
  style={[
    styles.input,
    {
      height: 100,
      textAlignVertical: "top",
    },
  ]}
/>

    <View style={styles.stockContainer}>

  <Text style={styles.stockTitle}>
    📦 Stock
  </Text>

  <View style={styles.stockRow}>

    <TouchableOpacity
  style={[
    styles.stockButton,
    Number(stock) === 0 && {
      backgroundColor: "#9CA3AF",
    },
  ]}
  onPress={decreaseStock}
  disabled={Number(stock) === 0}
>
      <Text style={styles.stockButtonText}>
        −
      </Text>
    </TouchableOpacity>

    <Text style={styles.stockValue}>
      {stock}
    </Text>

    <TouchableOpacity
      style={styles.stockButton}
      onPress={increaseStock}
    >
      <Text style={styles.stockButtonText}>
        +
      </Text>
    </TouchableOpacity>
  
  </View>

<View style={styles.quickRow}>

  <TouchableOpacity
    style={styles.quickButton}
    onPress={add10Stock}
  >
    <Text style={styles.quickText}>
      +10
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.quickButton}
    onPress={add25Stock}
  >
    <Text style={styles.quickText}>
      +25
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.quickButton}
    onPress={add50Stock}
  >
    <Text style={styles.quickText}>
      +50
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.resetButton}
    onPress={resetStock}
  >
    <Text style={styles.resetText}>
      Reset
    </Text>
  </TouchableOpacity>

</View>



</View>



    

    <TouchableOpacity
  style={styles.uploadButton}
  onPress={pickImage}
>
  <Text style={styles.uploadText}>
    📷 Change Image
  </Text>
</TouchableOpacity>

</ScrollView>

<TouchableOpacity
  style={styles.updateButton}
  disabled={updating}
  onPress={handleUpdate}
>
  <Text style={styles.updateText}>
  {updating
    ? "⏳ Updating..."
    : "💾 Update Product"}
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
  backgroundColor: "#c1d2d2",
  padding: 15,
  borderRadius: 12,
  marginBottom: 15,
},

uploadText: {
  color: "#000000",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 16,
},

updateButton: {
  position: "absolute",
  left: 20,
  right: 20,
  bottom: 20,
  backgroundColor: "#111827",
  padding: 18,
  borderRadius: 18,
  alignItems: "center",
  elevation: 10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.2,
  shadowRadius: 10,
},

updateText: {
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 17,
},

stockContainer: {
  marginBottom: 20,
},

stockTitle: {
  fontSize: 16,
  fontWeight: "700",
  marginBottom: 12,
  color: "#111827",
},

stockRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  backgroundColor: "#F3F4F6",

  borderRadius: 15,

  padding: 10,
},

stockButton: {
  width: 45,
  height: 45,

  borderRadius: 12,

  backgroundColor: "#111827",

  justifyContent: "center",
  alignItems: "center",
},

stockButtonText: {
  color: "#FFFFFF",
  fontSize: 24,
  fontWeight: "700",
},

stockValue: {
  fontSize: 22,
  fontWeight: "700",
  color: "#111827",
},

quickRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 15,
},

quickButton: {
  flex: 1,
  backgroundColor: "#111827",
  paddingVertical: 10,
  borderRadius: 10,
  marginHorizontal: 4,
  alignItems: "center",
},

quickText: {
  color: "#FFFFFF",
  fontWeight: "700",
},

resetButton: {
  flex: 1,
  backgroundColor: "#DC2626",
  paddingVertical: 10,
  borderRadius: 10,
  marginHorizontal: 4,
  alignItems: "center",
},

resetText: {
  color: "#FFFFFF",
  fontWeight: "700",
},

});

