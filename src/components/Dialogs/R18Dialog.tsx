import React from 'react';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import {Title, Portal, Button, Dialog, RadioButton} from 'react-native-paper';

import strings from './strings';

interface DialogProps {
	onClose: () => void;
	onSelect: (r18: number) => void;
	visible: boolean;
	r18: 0 | 1 | 2;
}

export default function R18Dialog({
	visible = false,
	onSelect,
	onClose,
	r18,
}: DialogProps) {
	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{strings.r18}</Dialog.Title>
				<Dialog.Content>
					<RadioButton.Group
						value={r18.toString()}
						onValueChange={(v) => onSelect(Number(v))}
					>
						{strings.r18Selections.map((v, i) => (
							<View key={i} style={styles.box}>
								<TouchableNativeFeedback
									onPress={() => onSelect(i)}
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
