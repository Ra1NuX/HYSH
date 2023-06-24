import { useRouter } from "expo-router";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { Icon, IconProps } from "@expo/vector-icons/build/createIconSet";


export enum GameRoute {
    Audio = '/audio'
}

export interface ItemProps {
    title: string,
    icon: keyof typeof Ionicons.glyphMap,
    page: GameRoute,
    color: string,
}

const Item = ({icon, page, title, color}: ItemProps) => {

    const router = useRouter();
    const handleChangeRoute = (route: GameRoute) => {
        router.push(route)
    }

    return <View style={{backgroundColor: color}} className='m-2 rounded-lg overflow-hidden shadow-md'>
        <TouchableNativeFeedback onPress={() => handleChangeRoute(page)}>
            <View className='flex-row pl-1 items-center'>
                <View className='justify-center items-center p-2 m-1 bg-white shadow-md aspect-square rounded-md'>
                    <Ionicons name={icon} size={24} color={color} />
                </View>
                <View className="flex-row items-center justify-between flex-1 pr-2">
                    <Text numberOfLines={1} className='p-4 pl-2 text-lg text-white font-semibold w-72 overflow-hidden'>{title}</Text>
                    <Ionicons name="chevron-forward" size={24} color="white" className="absolute " />
                </View>
            </View>
        </TouchableNativeFeedback>
    </View>
}

export default Item;
