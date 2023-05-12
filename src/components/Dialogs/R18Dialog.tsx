import React from 'react';
import {useRecoilState} from 'recoil';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import {Title, Portal, Button, Dialog, RadioButton} from 'react-native-paper';

import {apiSettingsState} from '../../common/atoms';
import strings from './strings';

interface DialogProps {
	onClose: () => void;
	visible: boolean;
}

export default function R18Dialog({visible = false, onClose}: DialogProps) {
	const [settings, setSettings] = useRecoilState(apiSettingsState);

	const handleSelectR18 = (r: number) => {
		setSettings((pre) => {
			if (!pre) {
				return null;
			}
			const r18 = r as 0 | 1 | 2;
			return {...pre, r18};
		});
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{strings.r18}</Dialog.Title>
				<Dialog.Content>
					<RadioButton.Group
						value={settings?.r18.toString() || '0'}
						onValueChange={(v) => handleSelectR18(Number(v))}
					>
						{strings.r18Selections.map((v, i) => (
							<View key={i} style={styles.box}>
								<TouchableNativeFeedback
									onPress={() => handleSelectR18(i)}
								>
									<View style={styles.bar}>
										<Title style={styles.text}>{v}</Title>
										<RadioButton value={i.toString()} />
									</View>
								</TouchableNativeFeedback>
							</View>
						))}
					</RadioButton.Group>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onClose}>{strings.confirm}</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

const styles = StyleSheet.create({
	box: {
		borderRadius: 16,
		marginVertical: 4,
		overflow: 'hidden',
	},
	bar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	text: {
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
});
