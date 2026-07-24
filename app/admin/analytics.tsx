import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import {
  getProducts,
} from "../../src/services/productService";

import {
  getOrders,
} from "../../src/services/orderService";

import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
export default function Analytics() {
//Part 2 - State

const [loading, setLoading] =
  useState(true);

const [products, setProducts] =
  useState<any[]>([]);

const [orders, setOrders] =
  useState<any[]>([]);

const [totalRevenue, setTotalRevenue] =
  useState(0);

const [lowStock, setLowStock] =
  useState(0);


const [todaySales, setTodaySales] = useState(0);
const [monthlySales, setMonthlySales] = useState(0);
const [averageOrder, setAverageOrder] = useState(0);

const screenWidth = Dimensions.get("window").width;
const [topProducts, setTopProducts] = useState<any[]>([]);

const chartData = {
  labels: ["W1", "W2", "W3", "W4"],
  datasets: [
    {
      data: [12500, 18000, 15800, 13407],
    },
  ],
};

//Part 3 - Load Firebase Data


  useEffect(() => {
  loadAnalytics();
}, []);

const loadAnalytics = async () => {




  try {

    setLoading(true);

    const productData =
      await getProducts();

    const orderData =
      await getOrders();


const salesMap: Record<string, any> = {};

orderData.forEach((order: any) => {
  (order.items || []).forEach((item: any) => {

    if (!salesMap[item.id]) {
      salesMap[item.id] = {
        id: item.id,
        name: item.name,
        quantity: 0,
        revenue: 0,
      };
    }

    salesMap[item.id].quantity += Number(item.quantity || 0);
    salesMap[item.id].revenue +=
      Number(item.price || 0) * Number(item.quantity || 0);

  });
});

const topSelling = Object.values(salesMap)
  .sort((a: any, b: any) => b.quantity - a.quantity)
  .slice(0, 5);

setTopProducts(topSelling);


      
//   const sortedProducts = [...productData].sort(
//   (a: any, b: any) =>
//     Number(b.sales || 0) - Number(a.sales || 0)
// );

// setTopProducts(sortedProducts.slice(0, 5));



    setProducts(productData);

    setOrders(orderData);

    let revenue = 0;

    orderData.forEach((order: any) => {

      revenue += order.total || 0;

    });

    setTotalRevenue(revenue);

    const low =
      productData.filter(
        (item: any) =>
          Number(item.stock) <= 10
      );

    setLowStock(low.length);




    const today = new Date();

let todayRevenue = 0;
let monthRevenue = 0;

orderData.forEach((order: any) => {
  const amount = Number(order.total || 0);

  if (!order.createdAt) return;

  const orderDate =
    order.createdAt.toDate
      ? order.createdAt.toDate()
      : new Date(order.createdAt);

  if (
    orderDate.getDate() === today.getDate() &&
    orderDate.getMonth() === today.getMonth() &&
    orderDate.getFullYear() === today.getFullYear()
  ) {
    todayRevenue += amount;
  }

  if (
    orderDate.getMonth() === today.getMonth() &&
    orderDate.getFullYear() === today.getFullYear()
  ) {
    monthRevenue += amount;
  }
});

setTodaySales(todayRevenue);
setMonthlySales(monthRevenue);

setAverageOrder(
  orderData.length
    ? revenue / orderData.length
    : 0
);



  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};







//Part 4 - Loading Screen

if (loading) {

  return (

    <View
      style={styles.loader}
    >

      <ActivityIndicator
        size="large"
        color="#111827"
      />

    </View>

  );

}


//Part 5 - Dashboard UI


return (

<ScrollView
style={styles.container}
showsVerticalScrollIndicator={false}
>

<Text style={styles.title}>
📈 Analytics
</Text>

<View style={styles.row}>

<View style={styles.card}>
<Text style={styles.icon}>
💰
</Text>

<Text style={styles.value}>
₹{totalRevenue}
</Text>

<Text style={styles.label}>
Revenue
</Text>

</View>

<View style={styles.card}>
<Text style={styles.icon}>
🛒
</Text>

<Text style={styles.value}>
{orders.length}
</Text>

<Text style={styles.label}>
Orders
</Text>

</View>

</View>

<View style={styles.row}>

<View style={styles.card}>
<Text style={styles.icon}>
📦
</Text>

<Text style={styles.value}>
{products.length}
</Text>

<Text style={styles.label}>
Products
</Text>

</View>

<View style={styles.card}>
<Text style={styles.icon}>
⚠️
</Text>

<Text style={styles.value}>
{lowStock}
</Text>

<Text style={styles.label}>
Low Stock
</Text>




</View>

</View>

<View style={styles.cardLarge}>
  <Text style={styles.label}>📅 Today's Sales</Text>
  <Text style={styles.value}>₹{todaySales.toFixed(2)}</Text>
</View>

<View style={styles.cardLarge}>
  <Text style={styles.label}>📆 Monthly Sales</Text>
  <Text style={styles.value}>₹{monthlySales.toFixed(2)}</Text>
</View>

<View style={styles.cardLarge}>
  <Text style={styles.label}>📈 Average Order</Text>
  <Text style={styles.value}>₹{averageOrder.toFixed(2)}</Text>
</View>


<View style={styles.chartCard}>
  <View style={styles.chartHeader}>
    <Text style={styles.sectionTitle}>📈 Revenue Trend</Text>

    <Text style={styles.chartPeriod}>
      This Month
    </Text>
  </View>

  <View style={styles.chartPlaceholder}>
    <Text style={styles.chartValue}>
      ₹{monthlySales.toFixed(2)}
    </Text>

    <Text style={styles.chartSubText}>
      Total Revenue This Month
    </Text>

    <BarChart
  data={chartData}
  width={screenWidth - 70}
  height={220}
  yAxisLabel="₹"
  yAxisSuffix=""
  fromZero
  chartConfig={{
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59,130,246,${opacity})`,
    labelColor: (opacity = 1) => `rgba(17,24,39,${opacity})`,
    propsForBackgroundLines: {
      stroke: "#E5E7EB",
    },
  }}
  style={{
    borderRadius: 16,
  }}
/>



  </View>
</View>



<View style={styles.chartCard}>
  <Text style={styles.sectionTitle}>📦 Recent Orders</Text>

  {orders.length === 0 ? (
    <Text style={styles.emptyText}>
      No recent orders found.
    </Text>
  ) : (
    orders.slice(0, 5).map((order: any) => (
      <View
        key={order.id}
        style={styles.listItem}
      >
        <View>
          <Text style={styles.listTitle}>
            Order #{order.id?.substring(0, 6)}
          </Text>

          <Text style={styles.listSubtitle}>
            {order.customerName || "Customer"}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.amount}>
            ₹{order.total || 0}
          </Text>

          <Text style={styles.status}>
            {order.status}
          </Text>
        </View>
      </View>
    ))
  )}
</View>




<View style={styles.chartCard}>
  <Text style={styles.sectionTitle}>
    🏆 Top Selling Products
  </Text>

  {topProducts.length === 0 ? (
    <Text style={styles.emptyText}>
      No sales yet.
    </Text>
  ) : (
    topProducts.map((product: any, index: number) => (
      <View
        key={product.id}
        style={styles.listItem}
      >
        <View>
          <Text style={styles.listTitle}>
            {index + 1}. {product.name}
          </Text>

          <Text style={styles.listSubtitle}>
            Sold: {product.quantity}
          </Text>
        </View>

        <Text style={styles.amount}>
          ₹{product.revenue}
        </Text>
      </View>
    ))
  )}
</View>





<View style={styles.chartCard}>
  <Text style={styles.sectionTitle}>
    ⚠️ Low Stock Products
  </Text>

  {products
    .filter((item: any) => Number(item.stock) <= 10)
    .map((item: any) => (
      <View
        key={item.id}
        style={styles.listItem}
      >
        <Text style={styles.listTitle}>
          {item.name}
        </Text>

        <Text style={styles.listSubtitle}>
          Stock : {item.stock}
        </Text>
      </View>
    ))}
</View>




</ScrollView>

);
}
const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F9FAFB",
padding:18,
},

loader:{
flex:1,
justifyContent:"center",
alignItems:"center",
},

title:{
fontSize:30,
fontWeight:"bold",
marginBottom:25,
color:"#111827",
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:15,
},

card:{
width:"48%",
backgroundColor:"#FFFFFF",
padding:20,
borderRadius:18,
alignItems:"center",
elevation:4,
},

icon:{
fontSize:34,
},

value:{
fontSize:28,
fontWeight:"bold",
marginTop:10,
color:"#111827",
},

label:{
marginTop:5,
fontSize:15,
color:"#6B7280",
},

cardLarge: {
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  padding: 20,
  marginBottom: 15,
  elevation: 4,
},


chartText: {
  color: "#6B7280",
  fontSize: 16,
},

chartCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  padding: 20,
  marginBottom: 20,
  elevation: 4,
},

chartHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
},

sectionTitle: {
  fontSize: 20,
  fontWeight: "700",
  color: "#111827",
},

chartPeriod: {
  color: "#6B7280",
  fontWeight: "600",
},

chartPlaceholder: {
  alignItems: "center",
},

chartValue: {
  fontSize: 32,
  fontWeight: "bold",
  color: "#111827",
},

chartSubText: {
  marginTop: 6,
  color: "#6B7280",
  marginBottom: 25,
},

fakeChart: {
  width: "100%",
  height: 170,
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-around",
},

bar: {
  width: 22,
  backgroundColor: "#3B82F6",
  borderRadius: 8,
},


emptyText: {
  color: "#6B7280",
  textAlign: "center",
  paddingVertical: 20,
},

listItem: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 14,
  borderBottomWidth: 1,
  borderBottomColor: "#E5E7EB",
},

listTitle: {
  fontSize: 16,
  fontWeight: "600",
  color: "#111827",
},

listSubtitle: {
  color: "#6B7280",
  marginTop: 4,
},

amount: {
  fontWeight: "700",
  fontSize: 16,
  color: "#111827",
},

status: {
  marginTop: 4,
  color: "#3B82F6",
  fontSize: 13,
},
});