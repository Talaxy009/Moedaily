import React from 'react';
import {View, TouchableNativeFeedback} from 'react-native';
import {
	Text,
	Title,
	Portal,
	Button,
	Dialog,
	RadioButton,
} from 'react-native-paper';
import {useRecoilState} from 'recoil';

import {apiSettingsState} from '../../common/atoms';
import strings from './strings';
import styles from './styles';

import type {DialogProps} from '../../common/types';

export default function ImageQualityDialog({
	visible = false,
	onClose,
}: DialogProps) {
	const [settings, setSettings] = useRecoilState(apiSettingsState);

	const handleSelectQuality = (q: number) => {
		setSettings((pre) => {
			if (!pre) {
				return null;
			}
			const quality = q as 0 | 1 | 2;
			return {...pre, quality};
		});
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{strings.imgQuality}</Dialog.Title>
				<Dialog.Content>
					<RadioButton.Group
						value={settings?.quality.toString() || '1'}
						onValueChange={(v) => handleSelectQuality(Number(v))}
					>
						{strings.qualitySelections.map((v, i) => (
							<View key={i} style={styles.itemBox}>
								<TouchableNativeFeedback
									onPress={() => handleSelectQuality(i)}
								>
									<View style={styles.bar}>
										<View style={styles.textArea}>
											<Title>{v.title}</Title>
											<Text>{v.description}</Text>
										</View>
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
