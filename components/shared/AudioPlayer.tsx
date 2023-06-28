import { View } from "react-native"

interface AudioPlayerProps {
    dataPlaybackInfo: {isBuffering: boolean, durationMillis: number|undefined, positionMillis: number},
    color: string
}

export const AudioPlayer = ({dataPlaybackInfo , color}: AudioPlayerProps) => {
   return <View className='h-1 bg-white m-2 rounded-full'>
        <View className='h-full' style={{ backgroundColor: `${color}5f`, width: `${dataPlaybackInfo?.positionMillis! / dataPlaybackInfo?.durationMillis! * 100}%` }} />
        <View className='absolute h-3 aspect-square rounded-full bg-white -top-1 -left-1' style={{ left: `${dataPlaybackInfo?.positionMillis! / dataPlaybackInfo?.durationMillis! * 100}%` }} />
    </View>
}