import React from 'react';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import {
	Text,
	Title,
	Portal,
	Button,
	Dialog,
	RadioButton,
} from 'react-native-paper';

import strings from './strings';

interface DialogProps {
	onClose: () => void;
	onSelect: (quality: number) => void;
	visible: boolean;
	quality: 0 | 1 | 2;
}

export default function ImageQualityDialog({
	visible = false,
	onSelect,
	onClose,
	quality,
}: DialogProps) {
	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{strings.imgQuality}</Dialog.Title>
				<Dialog.Content>
					<RadioButton.Group
						value={quality.toString()}
						onValueChange={(v) => onSelect(Number(v))}
					>
						{strings.qualitySelections.map((v, i) => (
							<View key={i} style={styles.box}>
								<TouchableNativeFeedback
									onPress={() => onSelect(i)}
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
	textArea: {
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
});
