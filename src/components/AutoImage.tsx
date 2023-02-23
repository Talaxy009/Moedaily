import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	ImageBackground,
	TouchableWithoutFeedback,
} from 'react-native';

import type {ImageData} from '../common/types';

interface AutoImageProps {
	img: ImageData;
	onError: () => void;
	onLongPress: () => void;
}

// "flex: 1" 无效，因此手动获取视图宽高
const {width, height} = Dimensions.get('window');

export default function AutoImage({img, onError, onLongPress}: AutoImageProps) {
	const url = img.urls.regular || img.urls.original || img.urls.small;
	const [loaded, setLoaded] = React.useState(false);

	return (
		<TouchableWithoutFeedback onLongPress={onLongPress}>
			<View style={{width, height}}>
				{!loaded && (
					<ImageBackground
						style={styles.img}
						resizeMode="contain"
						source={{
							uri: img.urls.mini,
						}}
					/>
				)}
				<ImageBackground
					onError={onError}
					style={styles.img}
					resizeMode="contain"
					onLoad={() => setLoaded(true)}
					source={{
						uri: url,
					}}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	img: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
});
