import React from 'react';
import {Linking, ScrollView, StyleSheet} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {Button, Dialog, Portal, List, Chip} from 'react-native-paper';

import {getTags, storageTags} from '../../common/storage';
import {ClockIcon, AccIcon, TagIcon} from '../ListIcons';
import {useToast} from '../../utils/hooks';
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
	const toast = useToast();
	const [tagMode, setTagMode] = React.useState(false);
	const [tags, setTags] = React.useState(new Set<string>());

	const handleClose = () => {
		onClose();
		setTagMode(false);
	};

	const handlePixiv = () =>
		Linking.openURL(`https://www.pixiv.net/i/${data?.pid}`);

	const handleCopyUID = () => {
		if (data) {
			Clipboard.setString(data.uid.toString());
			toast(strings.copied);
		}
	};

	const handleTagsMode = () => {
		setTags(new Set<string>());
		setTagMode(true);
	};

	const handleSelect = (v: string) => {
		const newTags = new Set([...tags]);
		if (newTags.has(v)) {
			newTags.delete(v);
		} else {
			newTags.add(v);
		}
		setTags(newTags);
	};

	const handleAddTags = () => {
		getTags().then((v) => {
			const n = v || new Set<string>();
			tags.forEach((t) => n.add(t));
			storageTags(n);
			toast(strings.importTagsSucc);
			handleClose();
		});
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={handleClose}>
				<Dialog.Title>
					{tagMode ? strings.importTags : data?.title}
				</Dialog.Title>
				<Dialog.Content>
					{tagMode && data ? (
						<ScrollView
							style={styles.list}
							contentContainerStyle={styles.listContent}
						>
							{data.tags.map((v, i) => (
								<Chip
									key={i}
									style={styles.chip}
									onPress={() => handleSelect(v)}
									icon={tags.has(v) ? 'check' : undefined}
									mode={tags.has(v) ? 'flat' : 'outlined'}
								>
									{v}
								</Chip>
							))}
						</ScrollView>
					) : (
						<>
							<List.Item
								left={AccIcon}
								title={strings.author}
								description={data?.author}
								onPress={handleCopyUID}
							/>
							<List.Item
								left={ClockIcon}
								title={strings.time}
								description={
									data?.uploadDate &&
									new Date(
										data.uploadDate,
									).toLocaleDateString()
								}
							/>
							<List.Item
								left={TagIcon}
								title={strings.tags}
								onPress={handleTagsMode}
								description={data?.tags.toString()}
							/>
						</>
					)}
				</Dialog.Content>
				<Dialog.Actions>
					{tagMode ? (
						<>
							<Button onPress={() => setTagMode(false)}>
								{strings.cancel}
							</Button>
							<Button onPress={handleAddTags}>
								{strings.import}
							</Button>
						</>
					) : (
						<>
							<Button onPress={handlePixiv}>
								{strings.openPixiv}
							</Button>
							<Button onPress={handleClose}>
								{strings.close}
							</Button>
						</>
					)}
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

const styles = StyleSheet.create({
	list: {
		marginBottom: 16,
		minHeight: 64,
		maxHeight: 128,
	},
	listContent: {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 4,
	},
});
