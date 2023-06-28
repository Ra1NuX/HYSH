import { Button, Pressable, Text, TouchableHighlight, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import * as MediaLibrary from 'expo-media-library'
import { AVPlaybackStatus, Audio } from 'expo-av'
import { useContext, useEffect, useState } from 'react';
import { getAssetsFromAlbum } from '../utils/getAssetsFromAlbum';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { AssetsContext } from '../contexts/AssetsContext';
import { AudioPlayer } from '../components/shared/AudioPlayer';


export default function AudioPage() {

	const context = useContext(AssetsContext);

	if(!context) return; 

	const [assets, setAssets] = context; 

	const {color} = useLocalSearchParams();
	const [play, setPlay] = useState(false);
	const [audio, setAudio] = useState<Audio.Sound | null>(null);
	const [audioAsset, setAudioAsset] =  useState<MediaLibrary.Asset>();
	const [dataPlaybackInfo, setDataPlaybackInfo] = useState<{isBuffering: boolean, durationMillis: number|undefined, positionMillis: number}>()

	useEffect(() => {
		getAssetsFromAlbum('WhatsApp Audio', 'audio')
		.then((assets) => {
			setAssets(Array.from(assets))
		})
	}, [])

	// useEffect(() => {
	// 	if(!play) {
	// 		audio?.playAsync();
	// 		setPlay(true)
	// 	} else {
	// 		audio?.pauseAsync();
	// 		setPlay(false)
	// 	}
	// }, [play, setPlay]);

	useEffect(() => {
		if(dataPlaybackInfo?.durationMillis) {
			setTimeout(() => {
				audio?.pauseAsync();
			}, dataPlaybackInfo.durationMillis * 0.1)
		}
	}, [dataPlaybackInfo?.durationMillis])


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
			const randomIndex = Math.floor(Math.random() * assets.length);
			const randomAudioAsset = assets[randomIndex];
			
			const newAudio = new Audio.Sound();
			setAudio(newAudio);
			
			await newAudio.loadAsync({ uri: randomAudioAsset.uri });
			newAudio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
			await newAudio.playAsync();
			
			setAudioAsset(randomAudioAsset);

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

				{dataPlaybackInfo && <AudioPlayer color={color as string} dataPlaybackInfo={dataPlaybackInfo} />}
			</View>
		</SafeAreaView>
	)
}