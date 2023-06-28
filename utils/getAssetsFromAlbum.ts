import * as MediaLibrary from 'expo-media-library';


type AlbumTitle =  
| 'WhatsApp Audio'
| 'ScreenShots'


export const getAssetsFromAlbum = async (title: AlbumTitle, mediaType: MediaLibrary.MediaTypeValue ) => {
    const totalAssets = new Set<MediaLibrary.Asset>();
    try {

        const permission = await MediaLibrary.requestPermissionsAsync(false);
        
        if (!permission.granted) throw Error('No permission granted');
        
        const albums = await MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true });
        const album = albums.find(album => album.title === title);
        
        if(!album) throw Error('No album title founded');
        
        const assets = await MediaLibrary.getAssetsAsync({ album, mediaType });
        
        for (let asset of assets.assets) {
            totalAssets.add(asset)
        
        }

    } catch (error) {
        console.log('Error: ', error);
    }
    return totalAssets;
}