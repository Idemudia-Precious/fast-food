import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const { user, isLoading, fetchAuthenticatedUser, logout } = useAuthStore()

  useEffect(() => {
    fetchAuthenticatedUser()
  }, [])

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FE8C00" />
      </View>
    )
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-400">No user data found.</Text>
      </View>
    )
  }

  return (
    
    <SafeAreaView className="bg-white h-full">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-8 pb-4">
        <TouchableOpacity>
          <Image source={images.arrowBack} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
        <Text className="text-xl font-quicksand-bold">Profile</Text>
        <TouchableOpacity>
          <Image source={images.search} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      {/* Avatar Section */}
      <View className="items-center mt-2 mb-6">
        <View className="relative">
          <Image source={user.avatar ? { uri: user.avatar } : images.avatar} className="w-28 h-28 rounded-full" resizeMode="cover" />
          <TouchableOpacity className="absolute bottom-2 right-2 bg-primary border-2 border-white w-8 h-8 rounded-full items-center justify-center">
            <Image source={images.pencil} className="w-4 h-4" resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>
      {/* User Info Card */}
      <View className="bg-white mx-4 rounded-2xl p-5 shadow shadow-gray-200 mb-6">
        {/* Full Name */}
        <View className="flex-row items-center mb-4">
          <View className="size-12 rounded-full bg-primary/10 items-center justify-center mr-3">
            <Image source={images.user} className="w-6 h-6" resizeMode="contain" />
          </View>
          <View>
            <Text className="text-xs text-gray-400">Full Name</Text>
            <Text className="text-base font-quicksand-bold text-dark-100">{user.name}</Text>
          </View>
        </View>
        {/* Email */}
        <View className="flex-row items-center mb-4">
          <View className="size-12 rounded-full bg-primary/10 items-center justify-center mr-3">
            <Image source={images.envelope} className="w-6 h-6" resizeMode="contain" />
          </View>
          <View>
            <Text className="text-xs text-gray-400">Email</Text>
            <Text className="text-base font-quicksand-bold text-dark-100">{user.email}</Text>
          </View>
        </View>
        {/* Phone */}
        <View className="flex-row items-center mb-4">
          <View className="size-12 rounded-full bg-primary/10 items-center justify-center mr-3">
            <Image source={images.phone} className="w-6 h-6" resizeMode="contain" />
          </View>
          <View>
            <Text className="text-xs text-gray-400">Phone number</Text>
            <Text className="text-base font-quicksand-bold text-dark-100">{user.phone || 'N/A'}</Text>
          </View>
        </View>
        {/* Address 1 */}
        <View className="flex-row items-center mb-4">
          <View className="size-12 rounded-full bg-primary/10 items-center justify-center mr-3">
            <Image source={images.location} className="w-6 h-6" resizeMode="contain" />
          </View>
          <View>
            <Text className="text-xs text-gray-400">Address 1 - (Home)</Text>
            <Text className="text-base font-quicksand-bold text-dark-100">{user.address1 || 'N/A'}</Text>
          </View>
        </View>
        {/* Address 2 */}
        <View className="flex-row items-center">
          <View className="size-12 rounded-full bg-primary/10 items-center justify-center mr-3">
            <Image source={images.location} className="w-6 h-6" resizeMode="contain" />
          </View>
          <View>
            <Text className="text-xs text-gray-400">Address 2 - (Work)</Text>
            <Text className="text-base font-quicksand-bold text-dark-100">{user.address2 || 'N/A'}</Text>
          </View>
        </View>
      </View>
      {/* Action Buttons */}
      <View className="mx-5">
        <TouchableOpacity className="border border-primary rounded-full py-3 mb-4 items-center" onPress={() => {}}>
          <Text className="text-primary font-quicksand-bold text-base">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border border-error rounded-full py-3 flex-row items-center justify-center"
          onPress={async () => {
            await logout();
            router.replace('/sign-in');
          }}
        >
          <Image source={images.logout} className="size-6 mr-2" resizeMode="contain" />
          <Text className="text-error font-quicksand-bold text-base">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Profile