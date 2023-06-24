import { Text, View } from 'react-native'
import { SafeAreaView  } from 'react-native-safe-area-context';
import Item, { GameRoute } from '../components/home/item';

export default function IndexPage() {

  return (
    <SafeAreaView>
        <View>
            <View className='p-5 pb-2 justify-center items-center'>
                <Text>Selecciona el nivel de confianza...</Text>
            </View>
            <Item icon='headset' page={GameRoute.Audio} title='Los reenviados son un meme' color='#0197f6'/>
            <Item icon='headset' page={GameRoute.Audio} title='Escucha lo que quieras' color='#40cc40'/>
            <Item icon='image' page={GameRoute.Audio} title='Echale un vistazo a mis capturas' color='#f39f18' />
            <Item icon='camera' page={GameRoute.Audio} title='Mira mi galeria tsss... ' color='#d32213' />
            <Item icon='send' page={GameRoute.Audio} title='Mira mis fotos enviadas 😈' color="#781f19" />
        </View>
    </SafeAreaView>
  )
}