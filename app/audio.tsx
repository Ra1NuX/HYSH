import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';

export default function AudioPage() {

	const GetWhatsappFolder = () =>{
		console.log(`${FileSystem.documentDirectory}`);
	}

	return (
		<SafeAreaView>
			<View>
				<Text>Audio</Text>

				<Button onPress={() => GetWhatsappFolder() } title='get' />
			</View>
		</SafeAreaView>
	)
}