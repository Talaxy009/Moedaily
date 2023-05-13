import React from 'react';
import {useRecoilState} from 'recoil';
import {View, TouchableNativeFeedback} from 'react-native';
import {Title, Portal, Button, Dialog, RadioButton} from 'react-native-paper';

import {apiSettingsState} from '../../common/atoms';
import strings from './strings';
import styles from './styles';

import type {DialogProps} from '../../common/types';

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
							<View key={i} style={styles.itemBox}>
								<TouchableNativeFeedback
									onPress={() => handleSelectR18(i)}
								>
									<View style={styles.bar}>
										<Title style={styles.textArea}>
											{v}
										</Title>
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
