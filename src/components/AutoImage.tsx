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
	onPress: () => void;
	onLongPress: () => void;
}

export default function AutoImage({
	img,
	onError,
	onPress,
	onLongPress,
}: AutoImageProps) {
	const url = img.urls.regular || img.urls.original || img.urls.small;
	const miniUrl = img.urls.mini.replace('square', 'master');

	return (
		<TouchableWithoutFeedback onLongPress={onLongPress} onPress={onPress}>
			<View style={styles.root}>
				<ImageBackground
					style={styles.img}
					resizeMode="contain"
					source={{
						uri: miniUrl,
					}}
				/>
				<ImageBackground
					onError={onError}
					style={styles.img}
					resizeMode="contain"
					source={{
						uri: url,
					}}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
}

// 获取视图宽度以撑开列表
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
	root: {
		width,
		height: '100%',
	},
	img: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
});
