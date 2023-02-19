import React from 'react';
import {View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {
	Text,
	Title,
	Portal,
	Dialog,
	Button,
	TextInput,
	RadioButton,
} from 'react-native-paper';
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
	const [proxy, setProxy] = React.useState('');

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{strings.proxySetting}</Dialog.Title>
				<Dialog.Content>
					<RadioButton.Group value={value} onValueChange={onChange}>
						{strings.proxy.map((v, i) => (
							<TouchableNativeFeedback
								key={i}
								onPress={() => onChange(v.value)}
							>
								<View style={styles.bar}>
									<View>
										<Title>{v.value}</Title>
										<Text>{v.description}</Text>
									</View>
									<RadioButton value={v.value} />
								</View>
							</TouchableNativeFeedback>
						))}
						<View style={styles.bar}>
							<TextInput
								dense
								value={proxy}
								style={styles.input}
								textContentType="URL"
								label={strings.manual}
								onChangeText={setProxy}
							/>
							<RadioButton value={proxy} />
						</View>
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
	bar: {
		marginVertical: 4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	input: {
		width: '70%',
	},
});
