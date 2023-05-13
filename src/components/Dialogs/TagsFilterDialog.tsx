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
import {useRecoilState} from 'recoil';
import {ScrollView, Vibration} from 'react-native';

import {apiSettingsState} from '../../common/atoms';
import {useToast} from '../../utils/hooks';
import {useTags} from '../../utils/tags';
import strings from './strings';
import styles from './styles';

import type {DialogProps} from '../../common/types';

export default function TagsFilterDialog({
	onClose,
	visible = false,
}: DialogProps) {
	const inputRef = React.useRef<any>(null);
	const [tags, {addTags, delTags}] = useTags();
	const [delTag, setDelTag] = React.useState('');
	const [newTag, setNewTag] = React.useState('');
	const [settings, setSettings] = useRecoilState(apiSettingsState);
	const toast = useToast();

	const selected = settings?.tag || new Set();

	const handleSelectTag = (v: string) => {
		setSettings((pre) => {
			if (!pre) {
				return null;
			}
			const tag = pre.tag;
			if (tag.has(v)) {
				tag.delete(v);
			} else {
				tag.add(v);
			}
			return {...pre, tag};
		});
	};

	const handleAddTag = () => {
		if (newTag) {
			addTags(newTag);
			setNewTag('');
			toast(strings.addTagSucc);
			inputRef.current?.clear();
		}
	};

	const handleDelTag = () => {
		if (delTag) {
			delTags(delTag);
			if (selected.has(delTag)) {
				handleSelectTag(delTag);
			}
			setDelTag('');
		}
	};

	const handleSelect = (value: string) => {
		if (selected.size < 20) {
			handleSelectTag(value);
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

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>
					{strings.tagsFilter} ({selected.size}/20)
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
							ref={inputRef}
							defaultValue={newTag}
							label={strings.addTag}
							onChangeText={setNewTag}
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
