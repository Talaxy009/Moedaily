import React from 'react';
import {useRecoilState} from 'recoil';
import {Portal, Dialog, Button, Text} from 'react-native-paper';

import {apiSettingsState} from '../../common/atoms';
import strings from './strings';

import type {ApiSettings, DialogProps} from '../../common/types';

export default function ResetFilterDialog({
	onClose,
	visible = false,
}: DialogProps) {
	const [settings, setSettings] = useRecoilState(apiSettingsState);

	const handleReset = () => {
		const newSetting = {
			r18: 0,
			quality: settings ? settings.quality : 1,
			proxy: settings?.proxy || 'i.pixiv.re',
			uid: new Set(),
			tag: new Set(),
			excludeAI: false,
		} as ApiSettings;
		setSettings(newSetting);
	};

	const handleConfirm = () => {
		handleReset();
		onClose();
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{strings.resetFilter}</Dialog.Title>
				<Dialog.Content>
					<Text>{strings.resetConfirm}</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onClose}>{strings.cancel}</Button>
					<Button onPress={handleConfirm}>{strings.confirm}</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
