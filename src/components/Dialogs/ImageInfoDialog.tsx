import React from 'react';
import {Linking} from 'react-native';
import {Button, Dialog, Portal, List} from 'react-native-paper';

import {ClockIcon, AccIcon, TagIcon} from '../ListIcons';
import strings from './strings';

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
		Linking.openURL(`https://www.pixiv.net/i/${data?.pid}`);

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{data?.title || ''}</Dialog.Title>
				<Dialog.Content>
					<List.Item
						title={strings.author}
						description={data?.author}
						left={AccIcon}
					/>
					<List.Item
						title={strings.time}
						left={ClockIcon}
						description={
							data?.uploadDate &&
							new Date(data.uploadDate).toLocaleDateString()
						}
					/>
					<List.Item
						title={strings.tags}
						left={TagIcon}
						description={data?.tags.toString()}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={handlePixiv}>{strings.openPixiv}</Button>
					<Button onPress={onClose}>{strings.close}</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
