import React from 'react';
import {Linking} from 'react-native';
import {Portal, Dialog, Button, Text} from 'react-native-paper';

import strings from './strings';

interface DialogProps {
	onClose: () => void;
	visible: boolean;
	url: string;
}

export default function OpenLinkDialog({
	url,
	onClose,
	visible = false,
}: DialogProps) {
	const handleConfirm = () => {
		Linking.openURL(url);
		onClose();
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{strings.visitLink}</Dialog.Title>
				<Dialog.Content>
					<Text>
						{strings.visitLink}: {url} ?
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onClose}>{strings.cancel}</Button>
					<Button onPress={handleConfirm}>{strings.confirm}</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
