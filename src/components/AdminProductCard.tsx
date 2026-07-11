import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  item: any;
  onEdit: () => void;
  onDelete: () => void;
};

export default function AdminProductCard({
  item,
  onEdit,
  onDelete,
}: Props) {

  return (

    <View style={styles.card}>

      <View style={styles.imageContainer}>
         
         
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
        />

        <View style={styles.priceTag}>
          <Text style={styles.priceText}>
            ₹{item.price}
          </Text>
        </View>

      </View>

      <Text style={styles.name}>
        {item.name}
      </Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {item.category}
        </Text>
      </View>


      <Text
  numberOfLines={2}
  style={styles.description}
>
  {item.description || "No description available"}
</Text>


   <View style={styles.infoRow}>

  <View style={styles.stockBadge}>
    <Text
  style={[
    styles.statusText,
    {
      color:
        item.stock === 0
          ? "#DC2626"
          : item.stock <= 10
          ? "#CA8A04"
          : "#16A34A",
    },
  ]}
>
  {item.stock === 0
    ? "🔴 Out of Stock"
    : item.stock <= 10
    ? "🟡 Low Stock"
    : "🟢 In Stock"}
</Text>
  </View>

  

</View>


      <View style={styles.actionRow}>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onEdit}
        >
          <Text style={styles.icon}>
            ✏️
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onDelete}
        >
          <Text style={styles.icon}>
            🗑️
          </Text>
        </TouchableOpacity>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    borderRadius: 22,
    padding: 10,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 5,
  },

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 150,
    borderRadius: 18,
  },

  priceTag: {
    position: "absolute",
    bottom: 10,
    right: 10,

    backgroundColor: "#111827",

    borderRadius: 20,

    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  priceText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  name: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 12,
  },

  badge: {
    alignSelf: "flex-start",

    backgroundColor: "#EEF2FF",

    borderRadius: 12,

    marginTop: 8,

    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  badgeText: {
    color: "#4338CA",
    fontWeight: "700",
    fontSize: 12,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },

  iconButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#F3F4F6",

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 10,
  },

  icon: {
    fontSize: 18,
  },
infoRow: {
  marginTop: 12,
  gap: 8,
},

stockBadge: {
  backgroundColor: "#F3F4F6",
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 10,
},

stockText: {
  color: "#374151",
  fontWeight: "600",
  fontSize: 13,
},

statusBadge: {
  alignSelf: "flex-start",
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 10,
},

statusText: {
  fontWeight: "700",
  fontSize: 12,
},

description: {
  marginTop: 10,

  color: "#6B7280",

  fontSize: 13,

  lineHeight: 18,
},
});