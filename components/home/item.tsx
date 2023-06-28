import { useRouter } from "expo-router";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { Fragment } from "react";



export enum GameRoute {
    Audio = '/audio'
}

export interface ItemProps {
    title: string,
    icon: keyof typeof Ionicons.glyphMap,
    page: GameRoute,
    color: string,
}

const Item = ({ icon, page, title, color }: ItemProps) => {

    const router = useRouter();
    const handleChangeRoute = () => {
        size.value = withTiming(1000, config);
        setTimeout(() => {
            router.setParams({color})
            router.push({pathname: page, params: {
                color,
            }});
            size.value = withTiming(0, config);
        }, 50)
    }

    
    const config = {
        duration: 800,
    };
    
    const size = useSharedValue<number>(0.1);
    const style = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: size.value
            }],
        };
    });

    return <Fragment>
        <View style={{ backgroundColor: color }} className='m-2 rounded-lg overflow-hidden shadow-md'>
            <TouchableNativeFeedback onPress={() => handleChangeRoute()}>
                <View className='flex-row pl-1 items-center'>
                    <View className='justify-center items-center p-2 m-1 ml-1.5 bg-white shadow-md aspect-square rounded-md'>
                        <Ionicons name={icon} size={24} color={color} />
                    </View>
                    <View className="flex-row items-center justify-between flex-1 pr-2">
                        <Text numberOfLines={1} className='p-4 pl-2 text-lg text-white font-semibold w-72 overflow-hidden'>{title}</Text>
                        <Ionicons name="chevron-forward" size={24} color="white" className="absolute " />
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
        <Animated.View className='absolute left-1/2 top-1/2 aspect-square rounded-full w-1 block' style={[{ backgroundColor: color, position: 'absolute',  zIndex: 3}, style]} />
    </Fragment>
}

export default Item;
