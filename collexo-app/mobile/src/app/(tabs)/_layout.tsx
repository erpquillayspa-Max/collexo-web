import { Tabs, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

function TabIcon({ name, focused }: { name: IconName; focused: boolean }) {
  return <Ionicons name={name} size={24} color={focused ? "#6c63ff" : "#666"} />;
}

export default function TabsLayout() {
  const { accessToken } = useAuthStore();
  if (!accessToken) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#16213e", borderTopColor: "#0f3460" },
        tabBarActiveTintColor: "#6c63ff",
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Mi Álbum",
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? "book" : "book-outline"} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="exchange"
        options={{
          title: "Intercambios",
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? "swap-horizontal" : "swap-horizontal-outline"} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: "Mercado",
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? "storefront" : "storefront-outline"} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? "chatbubbles" : "chatbubbles-outline"} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? "person" : "person-outline"} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
