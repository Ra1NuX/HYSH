import * as MediaLibrary from 'expo-media-library';

export const WhatsappAudios = new Set<MediaLibrary.Asset>();

export const getWhatsAppFolderPath = async () => {
    MediaLibrary.requestPermissionsAsync(false)
        .then(permissionRes => {
            if (permissionRes.granted) {
                MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true })
                    .then(res => {
                        // Find the WhatsApp Audio album by its title
                        const whatsappAudioAlbum = res.find(album => album.title === "WhatsApp Audio");

                        if (whatsappAudioAlbum) {

                            // Get audio files from the WhatsApp Audio album
                            MediaLibrary.getAssetsAsync({ album: whatsappAudioAlbum, mediaType: 'audio' })
                                .then(assets => {
                                    for (let asset of assets.assets) {
                                        WhatsappAudios.add(asset)
                                    }
                                })
                                .catch(err => {
                                    console.log('Error getting audio files: ', err.message);
                                });
                        } else {
                            console.log('WhatsApp Audio album not found');
                        }
                    })
                    .catch(err => {
                        console.log('Error: ', err.message);
                    });
            } else {
                console.log('Something went wrong.');
            }
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
}