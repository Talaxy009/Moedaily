import React from 'react';
import {
	View,
	Modal,
	StyleSheet,
	Dimensions,
	ImageBackground,
} from 'react-native';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {FAB, useTheme} from 'react-native-paper';
import {ImageData} from '../../common/types';

interface ModalProps {
	img?: ImageData;
	visible: boolean;
	onClose: () => void;
}

// 获取视图宽度
const {width: vw, height: vh} = Dimensions.get('window');

export default function ImageViewerModal({img, visible, onClose}: ModalProps) {
	const theme = useTheme();

	if (!img) {
		return null;
	}
	const url = img.urls.regular || img.urls.original || img.urls.small;
	const height = Math.min((img.height / img.width) * vw, vh);

	return (
		<Modal visible={visible} onRequestClose={onClose} animationType="fade">
			<View
				style={[
					styles.root,
					{backgroundColor: theme.colors.background},
				]}
			>
				<ReactNativeZoomableView
					maxZoom={3}
					minZoom={1}
					bindToBorders
					contentWidth={vw}
					contentHeight={height}
					visualTouchFeedbackEnabled={false}
				>
					<ImageBackground
						style={{width: vw, height}}
						resizeMode="contain"
						source={{
							uri: url,
						}}
					/>
				</ReactNativeZoomableView>
				<FAB
					icon="close"
					onPress={onClose}
					style={styles.fab}
					variant="secondary"
				/>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	fab: {
		right: 16,
		bottom: 16,
		position: 'absolute',
	},
});
