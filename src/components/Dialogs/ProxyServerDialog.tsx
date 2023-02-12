import React from 'react';
import {Portal, Dialog, Button, TextInput} from 'react-native-paper';
import strings from './strings';

interface DialogProps {
	onClose: () => void;
	onChange: (tag: string) => void;
	visible: boolean;
	value: string;
}

export default function ProxyServerDialog({
	value,
	onClose,
	onChange,
	visible = false,
}: DialogProps) {
	const [proxy, setProxy] = React.useState(value);

	const handleConfirm = () => {
		onChange(proxy);
		onClose();
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{strings.proxySetting}</Dialog.Title>
				<Dialog.Content>
					<TextInput
						value={proxy}
						textContentType="URL"
						placeholder="i.pixiv.re"
						onChangeText={(text) => setProxy(text)}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onClose}>{strings.cancel}</Button>
					<Button onPress={handleConfirm}>{strings.confirm}</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
