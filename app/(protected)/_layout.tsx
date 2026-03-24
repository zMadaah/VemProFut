import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#0F0F0F" },
      }}
    />
  );
}