import React from 'react';
import {
	Chip,
	Text,
	Portal,
	Dialog,
	Button,
	TextInput,
} from 'react-native-paper';
import {View, StyleSheet, Vibration} from 'react-native';
import {getTags, storageTags} from '../../common/storage';

interface DialogProps {
	onClose: () => void;
	onSelect: (tag: string) => void;
	visible: boolean;
	selected: Set<string>;
}

export default function TagsManageDialog({
	onClose,
	onSelect,
	selected,
	visible = false,
}: DialogProps) {
	const [tags, setTags] = React.useState<Set<string>>();
	const [delTag, setDelTag] = React.useState('');
	const [newTag, setNewTag] = React.useState('');

	const handleAddTag = () => {
		if (newTag && tags) {
			const tmp = tags;
			tmp.add(newTag);
			setTags(tmp);
			setNewTag('');
			storageTags(tmp);
		}
	};

	const handleDelTag = () => {
		if (delTag && tags) {
			const tmp = tags;
			tmp.delete(delTag);
			setTags(tmp);
			setDelTag('');
			storageTags(tmp);
			if (selected.has(delTag)) {
				onSelect(delTag);
			}
		}
	};

	const handleSelect = (value: string) => {
		onSelect(value);
	};

	const handleDelete = (value: string) => {
		if (!delTag) {
			Vibration.vibrate([0, 100, 0]);
			setDelTag(value);
		}
	};

	React.useEffect(() => {
		getTags().then((v) => {
			if (v) {
				setTags(v);
			} else {
				setTags(new Set());
			}
		});
	}, []);

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>标签筛选</Dialog.Title>
				<Dialog.Content>
					<View style={styles.tagsBox}>
						{tags &&
							Array.from(tags).map((v, i) => (
								<Chip
									key={i}
									style={styles.chip}
									onPress={() => handleSelect(v)}
									onLongPress={() => handleDelete(v)}
									icon={selected.has(v) ? 'check' : undefined}
									mode={selected.has(v) ? 'flat' : 'outlined'}
								>
									{v}
								</Chip>
							))}
					</View>
					{delTag ? (
						<Text style={styles.delText} variant="bodyLarge">
							要删除：{delTag}?
						</Text>
					) : (
						<TextInput
							dense
							label="新建标签"
							value={newTag}
							onChangeText={(text) => setNewTag(text)}
							right={
								<TextInput.Icon
									icon="plus-circle-outline"
									onPress={handleAddTag}
								/>
							}
						/>
					)}
				</Dialog.Content>
				<Dialog.Actions>
					{delTag && (
						<Button onPress={() => setDelTag('')}>取消</Button>
					)}
					<Button onPress={delTag ? handleDelTag : onClose}>
						确认
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

const styles = StyleSheet.create({
	tagsBox: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 16,
	},
	chip: {
		margin: 4,
	},
	delText: {
		color: 'red',
		alignSelf: 'center',
	},
});
