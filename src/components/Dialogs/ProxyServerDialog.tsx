import React from 'react';
import {Portal, Dialog, Button, TextInput} from 'react-native-paper';

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
				<Dialog.Title>反代配置</Dialog.Title>
				<Dialog.Content>
					<TextInput
						value={proxy}
						textContentType="URL"
						placeholder="i.pixiv.re"
						onChangeText={(text) => setProxy(text)}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onClose}>取消</Button>
					<Button onPress={handleConfirm}>确认</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
