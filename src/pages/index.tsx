import React from 'react';
import {FlatList, Vibration, StyleSheet} from 'react-native';
import LocalizedStrings from 'react-native-localization';
import {FAB} from 'react-native-paper';

import {ImageViewerModal} from '../components/Modals';
import {ImageInfoDialog} from '../components/Dialogs';
import HelpBanner from '../components/HelpBanner';
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
	const [modal, setModal] = React.useState(false);
	const [imageIndex, onScroll, setImageIndex] = useImageIndex(0);
	const toast = useToast();

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
		Vibration.vibrate([0, 10, 0]);
		setDialog(true);
	};

	React.useEffect(() => {
		if (loading) {
			getImage()
				.then(({data}) => {
					setImg(data);
					if (data.length === 0) {
						toast(strings.noData);
					}
				})
				.catch((e) => {
					console.log(e);
					toast(strings.requestFailed);
				})
				.finally(() => {
					setLoading(false);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return (
		<Layout>
			<HelpBanner />
			<FlatList
				data={img}
				horizontal
				pagingEnabled
				ref={imageList}
				windowSize={10}
				style={styles.list}
				onMomentumScrollEnd={onScroll}
				keyExtractor={(i) => i.pid.toString()}
				contentContainerStyle={styles.listContent}
				renderItem={({item}) => (
					<AutoImage
						img={item}
						onPress={() => setModal(true)}
						onLongPress={handleOpenDialog}
					/>
				)}
			/>
			<ImageInfoDialog
				visible={dialog}
				data={img[imageIndex]}
				onClose={() => setDialog(false)}
			/>
			<ImageViewerModal
				visible={modal}
				img={img[imageIndex]}
				onClose={() => setModal(false)}
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
	list: {
		flex: 1,
	},
	listContent: {
		height: '100%',
	},
	fab: {
		right: 16,
		bottom: 16,
		position: 'absolute',
	},
});

const strings = new LocalizedStrings({
	en: {
		requestFailed: 'Request Failed',
		noData: 'No Artwork, please adjust filter',
	},
	zh: {
		requestFailed: '请求出错',
		noData: '没有作品，请调整您的筛选条件',
	},
});
