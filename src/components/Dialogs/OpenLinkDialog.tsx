import React from 'react';
import {Linking} from 'react-native';
import {Portal, Dialog, Button, Text} from 'react-native-paper';

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
				<Dialog.Title>打开链接</Dialog.Title>
				<Dialog.Content>
					<Text>要打开链接：{url} 吗？</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onClose}>取消</Button>
					<Button onPress={handleConfirm}>确认</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
