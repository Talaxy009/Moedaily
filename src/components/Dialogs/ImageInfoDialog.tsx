import React from 'react';
import {Linking} from 'react-native';
import {Button, Dialog, Portal, List} from 'react-native-paper';
import {ClockIcon, AccIcon, TagIcon} from '../ListIcons';

import type {ImageData} from '../../common/types';

interface DialogProps {
	onClose: () => void;
	visible: boolean;
	data?: ImageData;
}

export default function ImageInfoDialog({
	visible = false,
	onClose,
	data,
}: DialogProps) {
	const handlePixiv = () =>
		Linking.openURL(`https://pixiv.net/i/${data?.pid}`);

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{data?.title || ''}</Dialog.Title>
				<Dialog.Content>
					<List.Item
						title="作者"
						description={data?.author}
						left={AccIcon}
					/>
					<List.Item
						title="时间"
						left={ClockIcon}
						description={
							data?.uploadDate &&
							new Date(data.uploadDate).toLocaleDateString()
						}
					/>
					<List.Item
						title="标签"
						left={TagIcon}
						description={data?.tags.toString()}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={handlePixiv}>在 Pixiv 中打开</Button>
					<Button onPress={onClose}>关闭</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
