import {useState, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {
	Platform,
	Dimensions,
	NativeModules,
	NativeScrollEvent,
	NativeSyntheticEvent,
} from 'react-native';
import {toastState} from '../common/atoms';

// 全站可用的通知钩子
export function useToast() {
	const [_toast, setToast] = useRecoilState(toastState);

	return function toast(text: string) {
		setToast({open: true, text});
	};
}

// 通过原生模组获取 VersionName(Android only)
export function useVersionName() {
	const [versionName, setVersionName] = useState('1.0.0');

	useEffect(() => {
		if (Platform.OS === 'android') {
			const {VersionModule} = NativeModules;
			VersionModule.getVersionName((e: any, v: string) => {
				if (e) {
					console.error(e);
				} else {
					setVersionName(v);
				}
			});
		}
	}, []);

	return versionName;
}

// 轮播图组件的下标钩子
export function useImageIndex(imageIndex: number) {
	const [currentImageIndex, setImageIndex] = useState(imageIndex);

	const vw = Dimensions.get('window').width;

	const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetX = event.nativeEvent.contentOffset.x;

		if (vw) {
			const nextIndex = Math.round(offsetX / vw);
			setImageIndex(nextIndex < 0 ? 0 : nextIndex);
		}
	};

	return [currentImageIndex, onScroll, setImageIndex] as const;
}

export default useImageIndex;
