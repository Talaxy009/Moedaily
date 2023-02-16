import React from 'react';
import {FlatList, Vibration, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import LocalizedStrings from 'react-native-localization';

import {ImageInfoDialog} from '../components/Dialogs';
import AutoImage from '../components/AutoImage';
import Layout from '../components/Layout';
import useImageIndex, {useToast} from '../utils/hooks';
import {getImage} from '../utils';

import type {ImageDataList, ImageData} from '../common/types';

export default function IndexPage() {
	const imageList = React.useRef<FlatList<ImageData>>(null);

	const [img, setImg] = React.useState<ImageDataList>([]);
	const [loading, setLoading] = React.useState(true);
	const [dialog, setDialog] = React.useState(false);
	const [imageIndex, onScroll, setImageIndex] = useImageIndex(0);
	const toast = useToast();

	const handleError = () => {
		toast(strings.imgLoadFailed);
		setLoading(false);
	};

	const handleRefresh = () => {
		if (!loading && imageIndex > 0) {
			setImageIndex(0);
			imageList.current?.scrollToIndex({
				index: 0,
			});
		}
		setLoading((pre) => !pre);
	};

	const handleOpenDialog = () => {
		Vibration.vibrate([0, 100, 0]);
		setDialog(true);
	};

	React.useEffect(() => {
		if (loading) {
			getImage()
				.then(({data}) => {
					setImg(data);
					setLoading(false);
					if (data.length === 0) {
						toast(strings.noData);
					}
				})
				.catch((e) => {
					console.log(e);
					toast(strings.requestFailed);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return (
		<Layout>
			<FlatList
				data={img}
				horizontal
				pagingEnabled
				ref={imageList}
				windowSize={10}
				onMomentumScrollEnd={onScroll}
				keyExtractor={(i) => i.pid.toString()}
				contentContainerStyle={styles.listContent}
				renderItem={({item}) => (
					<AutoImage
						img={item}
						onError={handleError}
						onLongPress={handleOpenDialog}
					/>
				)}
			/>
			<ImageInfoDialog
				visible={dialog}
				data={img[imageIndex]}
				onClose={() => setDialog(false)}
			/>
			<FAB
				icon="reload"
				loading={loading}
				variant="secondary"
				style={styles.fab}
				onPress={handleRefresh}
			/>
		</Layout>
	);
}

const styles = StyleSheet.create({
	listContent: {
		alignItems: 'center',
	},
	fab: {
		right: 16,
		bottom: 16,
		position: 'absolute',
	},
});

const strings = new LocalizedStrings({
	en: {
		imgLoadFailed: 'Failed to load this image',
		requestFailed: 'Request Failed',
		noData: 'No Artwork, please adjust filter',
	},
	zh: {
		imgLoadFailed: '无法加载此图片',
		requestFailed: '请求出错',
		noData: '没有作品，请调整您的筛选条件',
	},
});
