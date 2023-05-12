import React from 'react';
import {
	Chip,
	Text,
	Portal,
	Dialog,
	Button,
	TextInput,
	Caption,
} from 'react-native-paper';
import {useRecoilState} from 'recoil';
import {StyleSheet, Vibration, ScrollView} from 'react-native';

import {getUIDs, storageUIDs} from '../../common/storage';
import {apiSettingsState} from '../../common/atoms';
import {useToast} from '../../utils/hooks';
import strings from './strings';

interface DialogProps {
	onClose: () => void;
	visible: boolean;
}

export default function AuthorFliterDialog({
	onClose,
	visible = false,
}: DialogProps) {
	const [settings, setSettings] = useRecoilState(apiSettingsState);
	const [uids, setUIDs] = React.useState<Set<string>>();
	const [delUID, setDelUID] = React.useState('');
	const [newUID, setNewUID] = React.useState('');
	const inputRef = React.useRef<any>(null);
	const toast = useToast();

	const selected = settings?.uid || new Set();

	const handleSelectUID = (v: string) => {
		setSettings((pre) => {
			if (!pre) {
				return null;
			}
			const uid = pre.uid;
			if (uid.has(v)) {
				uid.delete(v);
			} else {
				uid.add(v);
			}
			return {...pre, uid};
		});
	};

	const handleAddUID = () => {
		if (newUID && uids) {
			const tmp = uids;
			tmp.add(newUID);
			setUIDs(tmp);
			setNewUID('');
			inputRef.current?.clear();
			storageUIDs(tmp);
			toast(strings.addUIDsucc);
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
				handleSelectUID(delUID);
			}
		}
	};

	const handleSelect = (value: string) => {
		if (selected.size < 20) {
			handleSelectUID(value);
		} else {
			toast(strings.moreThanTwenty);
		}
	};

	const handleDelete = (value: string) => {
		if (!delUID) {
			Vibration.vibrate([0, 10, 0]);
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
				<Dialog.Title>
					{strings.authorFliter} ({selected.size}/20)
				</Dialog.Title>
				<Dialog.Content>
					<ScrollView
						style={styles.box}
						contentContainerStyle={styles.boxContent}
					>
						{uids && uids.size > 0 ? (
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
							))
						) : (
							<Caption style={styles.caption}>
								{strings.noUID}
							</Caption>
						)}
					</ScrollView>
					{delUID ? (
						<Text style={styles.delText} variant="bodyLarge">
							{strings.delete}: {delUID}?
						</Text>
					) : (
						<TextInput
							dense
							ref={inputRef}
							defaultValue={newUID}
							keyboardType="numeric"
							textContentType="none"
							onChangeText={setNewUID}
							label={strings.addAuthor}
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
	box: {
		marginBottom: 16,
		minHeight: 64,
		maxHeight: 164,
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
