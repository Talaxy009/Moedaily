import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	ImageBackground,
	TouchableWithoutFeedback,
} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import LocalizedStrings from 'react-native-localization';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import type {ImageData} from '../common/types';

interface AutoImageProps {
	img: ImageData;
	onPress: () => void;
	onLongPress: () => void;
}

export default function AutoImage({img, onPress, onLongPress}: AutoImageProps) {
	const url = img.urls.regular || img.urls.original || img.urls.small;
	const miniUrl = img.urls.mini.replace('square', 'master');

	const theme = useTheme();
	const [err, setErr] = React.useState(false);

	const handlePress = () => {
		if (err) {
			onLongPress();
		} else {
			onPress();
		}
	};

	return (
		<TouchableWithoutFeedback
			onLongPress={onLongPress}
			onPress={handlePress}
		>
			<View style={styles.root}>
				{err && (
					<View style={[styles.img, styles.errBox]}>
						<Icons
							size={64}
							name="image-remove"
							color={theme.colors.outline}
						/>
						<Text style={styles.errTxt}>
							{strings.imgLoadFailed}
						</Text>
					</View>
				)}
				<ImageBackground
					style={styles.img}
					resizeMode="contain"
					source={{
						uri: miniUrl,
					}}
				/>
				<ImageBackground
					onError={() => setErr(true)}
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
	errBox: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	errTxt: {
		marginVertical: 16,
	},
	img: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
});

const strings = new LocalizedStrings({
	en: {
		imgLoadFailed: 'Failed to load this image',
	},
	zh: {
		imgLoadFailed: '无法加载此图片',
	},
});
