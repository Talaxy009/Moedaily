import React from 'react';
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback,
} from 'react-native';

import type {ImageData} from '../common/types';

interface AutoImageProps {
	img: ImageData;
	onError: () => void;
	onLongPress: () => void;
}

const vw = Dimensions.get('window').width;

export default function AutoImage({img, onError, onLongPress}: AutoImageProps) {
	const url = img.urls.regular || img.urls.original || img.urls.small;

	return (
		<TouchableWithoutFeedback onLongPress={onLongPress}>
			<View style={{height: (img.height / img.width) * vw, width: vw}}>
				<Image
					style={styles.img}
					onError={onError}
					source={{
						uri: img.urls.mini,
					}}
				/>
				<Image
					style={styles.img}
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
