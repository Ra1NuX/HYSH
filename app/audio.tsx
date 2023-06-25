import { Button, Pressable, Text, TouchableHighlight, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import * as MediaLibrary from 'expo-media-library'
import { AVPlaybackStatus, Audio } from 'expo-av'
import { useEffect, useState } from 'react';
import { WhatsappAudios, getWhatsAppFolderPath } from '../utils/getWhatsAppAudioPath';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';


export default function AudioPage() {

	const {color} = useLocalSearchParams();

	const [play, setPlay] = useState(false);
	const [audio, setAudio] = useState<Audio.Sound | null>(null);
	const [audioAsset, setAudioAsset] =  useState<MediaLibrary.Asset>();
	const [dataPlaybackInfo, setDataPlaybackInfo] = useState<{isBuffering: boolean, durationMillis: number|undefined, positionMillis: number}>()

	useEffect(() => {
		getWhatsAppFolderPath().catch(console.log)
	}, [])

	useEffect(() => {
		if(!play) {
			audio?.playAsync();
		} else {
			audio?.pauseAsync();
		}
	}, [play]);

	const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
		if (!status.isLoaded) {
			if (status.error) {
			  console.log(`Encountered a fatal error during playback: ${status.error}`);
			}
		  }
		else {
			setDataPlaybackInfo({
			  isBuffering: status.isBuffering,
			  durationMillis: status.durationMillis,
			  positionMillis: status.positionMillis,
			})
		}
	  }
	

	async function playRandomAudio() {
		try {
			const randomIndex = Math.floor(Math.random() * WhatsappAudios.size);
			const randomAudioAsset = Array.from(WhatsappAudios)[randomIndex];
			
			console.log({randomAudioAsset})

			const newAudio = new Audio.Sound();
			setAudio(newAudio);
			
			await newAudio.loadAsync({ uri: randomAudioAsset.uri });
			newAudio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
			await newAudio.playAsync();
		
			setTimeout(() => {
				newAudio.pauseAsync();
				setAudioAsset(randomAudioAsset);
			}, dataPlaybackInfo?.durationMillis! * 0.1)
			
		} catch (error) {
			console.log('Error playing random audio:', error);
		}
	}

	const handleAudioPlayback = async () => {
		if(!audio) return; 
		setPlay(e => !e);
		if(!play) {
			await audio?.playAsync();
		} else {
			await audio?.pauseAsync();

		}
	}

	console.log({dataPlaybackInfo})


	return (
		<SafeAreaView style={{backgroundColor: color as string}} className='flex-1'>
			<View>
				<Text className='text-center p-5 text-xl'>Audio</Text>
				{audioAsset?.filename && <Text>{audioAsset?.filename}</Text>}

				{!audioAsset && <Pressable className=' rounded bg-white text-black p-2 m-2' onPress={() => playRandomAudio()} >
					<Text className='text-center'>
						Estoy preparado!
					</Text>
				</Pressable> }

				{audioAsset && <TouchableHighlight >
					<View className='bg-white shadow-xl m-2 rounded-xl flex justify-center items-center pl-[3px] aspect-square self-center'>
						<Ionicons name={play ? "play" : "pause"} size={60} color={color as string} onPress={handleAudioPlayback} /> 
					</View>
				</TouchableHighlight>}
				{ dataPlaybackInfo && <View className='h-1 bg-white m-2 rounded-full'>
					<View className='h-full' style={{backgroundColor: `${color}5f`, width: `${dataPlaybackInfo?.positionMillis!/dataPlaybackInfo?.durationMillis!*100}%`}}/>
					<View className='absolute h-3 aspect-square rounded-full bg-white -top-1 -left-1' style={{left: `${dataPlaybackInfo?.positionMillis!/dataPlaybackInfo?.durationMillis!*100}%` }}/> 
				</View> }
			</View>
		</SafeAreaView>
	)
}