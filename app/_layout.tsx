import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AssetsContext } from '../contexts/AssetsContext';
import { Asset } from 'expo-media-library';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '/',
};

export default function RootLayout() {
    //   const [loaded, error] = useFonts({
    //     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    //     ...FontAwesome.font,
    //   });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    //   useEffect(() => {
    //     if (error) throw error;
    //   }, [error]);

    //   return (
    //     <>
    //       {!loaded && <SplashScreen />}
    //       {loaded && <RootLayoutNav />}
    //     </>
    //   );
    // }

    const [assets, setAssets] = useState<Asset[]>([])

    return (
        <AssetsContext.Provider value={[assets, setAssets]} >
            <Stack >
                <Stack.Screen name="index" options={{ headerShown: false, animation: "slide_from_right" }} />
                <Stack.Screen name="audio" options={{ headerShown: false, animation: "fade_from_bottom" }} />
            </Stack>
        </AssetsContext.Provider>
    )
}
