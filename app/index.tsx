import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native'
import { SafeAreaView  } from 'react-native-safe-area-context';

export default function IndexPage() {
    const router = useRouter();
  return (
    <SafeAreaView>
        <View>
            <Text>Hola</Text>
            <Button onPress={() => router.push('/audio') } title='Audio'/>
        </View>
    </SafeAreaView>
  )
}