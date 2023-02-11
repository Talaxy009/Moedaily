import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {FAB, IconButton} from 'react-native-paper';

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
	const [imageIndex, onScroll] = useImageIndex(0);
	const toast = useToast();

	const handleError = () => {
		toast('无法加载图片');
		setLoading(false);
	};

	const handleRefresh = () => {
		if (loading) {
			setLoading(false);
		} else {
			setLoading(true);
			imageList.current?.scrollToIndex({
				index: 0,
			});
		}
	};

	React.useEffect(() => {
		if (loading) {
			getImage()
				.then(({data}) => {
					setImg(data);
					setLoading(false);
				})
				.catch((e) => {
					console.log(e);
					toast('请求出错');
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
					<AutoImage img={item} onError={handleError} />
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
			<IconButton
				style={styles.fib}
				icon="information"
				onPress={() => setDialog(true)}
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
	fib: {
		top: 16,
		right: 16,
		position: 'absolute',
	},
});
