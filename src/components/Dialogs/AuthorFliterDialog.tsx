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
import strings from './strings';

import {getUIDs, storageUIDs} from '../../common/storage';

interface DialogProps {
	onClose: () => void;
	onSelect: (tag: string) => void;
	visible: boolean;
	selected: Set<string>;
}

export default function AuthorFliterDialog({
	onClose,
	onSelect,
	selected,
	visible = false,
}: DialogProps) {
	const [uids, setUIDs] = React.useState<Set<string>>();
	const [delUID, setDelUID] = React.useState('');
	const [newUID, setNewUID] = React.useState('');

	const handleAddUID = () => {
		if (newUID && uids) {
			const tmp = uids;
			tmp.add(newUID);
			setUIDs(tmp);
			setNewUID('');
			storageUIDs(tmp);
		}
	};

	const handleDelUID = () => {
		if (delUID && uids) {
			const tmp = uids;
			tmp.delete(delUID);
			setUIDs(tmp);
			setDelUID('');
			storageUIDs(tmp);
			if (selected.has(delUID)) {
				onSelect(delUID);
			}
		}
	};

	const handleSelect = (value: string) => {
		onSelect(value);
	};

	const handleDelete = (value: string) => {
		if (!delUID) {
			Vibration.vibrate([0, 100, 0]);
			setDelUID(value);
		}
	};

	React.useEffect(() => {
		getUIDs().then((v) => {
			if (v) {
				setUIDs(v);
			} else {
				setUIDs(new Set());
			}
		});
	}, []);

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{strings.authorFliter}</Dialog.Title>
				<Dialog.Content>
					<View style={styles.tagsBox}>
						{uids &&
							Array.from(uids).map((v, i) => (
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
					{delUID ? (
						<Text style={styles.delText} variant="bodyLarge">
							{strings.delete}: {delUID}?
						</Text>
					) : (
						<TextInput
							dense
							value={newUID}
							label={strings.addAuthor}
							keyboardType="numeric"
							onChangeText={(text) => setNewUID(text)}
							right={
								<TextInput.Icon
									icon="plus-circle-outline"
									onPress={handleAddUID}
								/>
							}
						/>
					)}
				</Dialog.Content>
				<Dialog.Actions>
					{delUID && (
						<Button onPress={() => setDelUID('')}>
							{strings.cancel}
						</Button>
					)}
					<Button onPress={delUID ? handleDelUID : onClose}>
						{strings.confirm}
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
