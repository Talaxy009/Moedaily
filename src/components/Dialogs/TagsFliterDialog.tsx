import React from 'react';
import {
	Chip,
	Text,
	Portal,
	Dialog,
	Button,
	Caption,
	TextInput,
} from 'react-native-paper';
import {ScrollView, StyleSheet, Vibration} from 'react-native';
import {getTags, storageTags} from '../../common/storage';
import strings from './strings';
import {useToast} from '../../utils/hooks';

interface DialogProps {
	onClose: () => void;
	onSelect: (tag: string) => void;
	visible: boolean;
	selected: Set<string>;
}

export default function TagsFliterDialog({
	onClose,
	onSelect,
	selected,
	visible = false,
}: DialogProps) {
	const [tags, setTags] = React.useState<Set<string>>();
	const [delTag, setDelTag] = React.useState('');
	const [newTag, setNewTag] = React.useState('');
	const toast = useToast();

	const handleAddTag = () => {
		if (newTag && tags) {
			const tmp = tags;
			tmp.add(newTag);
			setTags(tmp);
			setNewTag('');
			storageTags(tmp);
			toast(strings.addTagSucc);
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
		if (selected.size < 20) {
			onSelect(value);
		} else {
			toast(strings.moreThanTwenty);
		}
	};

	const handleDelete = (value: string) => {
		if (!delTag) {
			Vibration.vibrate([0, 10, 0]);
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
	}, [visible]);

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>
					{strings.tagsFliter} ({selected.size}/20)
				</Dialog.Title>
				<Dialog.Content>
					<ScrollView
						style={styles.box}
						contentContainerStyle={styles.boxContent}
					>
						{tags && tags.size > 0 ? (
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
							))
						) : (
							<Caption style={styles.caption}>
								{strings.noTag}
							</Caption>
						)}
					</ScrollView>
					{delTag ? (
						<Text style={styles.delText} variant="bodyLarge">
							{strings.delete}: {delTag} ?
						</Text>
					) : (
						<TextInput
							dense
							label={strings.addTag}
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
						<Button onPress={() => setDelTag('')}>
							{strings.cancel}
						</Button>
					)}
					<Button onPress={delTag ? handleDelTag : onClose}>
						{strings.confirm}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

const styles = StyleSheet.create({
	box: {
		marginBottom: 16,
		minHeight: 64,
		maxHeight: 128,
	},
	boxContent: {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	caption: {
		alignSelf: 'center',
	},
	chip: {
		margin: 4,
	},
	delText: {
		color: 'red',
		alignSelf: 'center',
	},
});
