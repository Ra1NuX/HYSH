import { Dispatch, SetStateAction, createContext } from "react";
import { Asset } from "expo-media-library";

type AssetsContextProps = [ Asset[], Dispatch<SetStateAction<Asset[]>> ]

export const AssetsContext = createContext< AssetsContextProps | null >(null);