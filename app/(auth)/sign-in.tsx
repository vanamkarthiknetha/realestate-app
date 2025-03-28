import { useState } from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import { login } from "@/lib/appwrite";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";


const SignIn = () => {
    const { refetch, loading, isLogged } = useGlobalContext();
    if (!loading && isLogged) return <Redirect href="/(root)/(tabs)" />;
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return
    }

    setSubmitting(true);

    try {
      await login(form.email, form.password);
      refetch()
      // Alert.alert("Success", "User signed in successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.icon}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-rubik-semibold text-black mt-10 font-psemibold">
            Log in to RealEstate
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"

          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 "
            textStyles={"text-white"}
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black font-rubik">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
            >
              <Text className="text-lg font-rubik-semibold text-[#0061FF]">
              Signup
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;