import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {
	Dimensions,
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
