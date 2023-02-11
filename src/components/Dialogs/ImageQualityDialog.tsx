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

interface DialogProps {
	onClose: () => void;
	onSelect: (quality: number) => void;
	visible: boolean;
	quality: 0 | 1 | 2;
}

const selections = [
	{title: '原始', description: '原始尺寸，要的就是一个体验'},
	{title: '正常', description: '正常尺寸，不多不少刚刚好'},
	{title: '压缩', description: '压缩尺寸，节流主义'},
];

export default function ImageInfoDialog({
	visible = false,
	onSelect,
	onClose,
	quality,
}: DialogProps) {
	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>标签筛选</Dialog.Title>
				<Dialog.Content>
					<RadioButton.Group
						value={quality.toString()}
						onValueChange={(v) => onSelect(Number(v))}
					>
						{selections.map((v, i) => (
							<TouchableNativeFeedback
								key={i}
								onPress={() => onSelect(i)}
							>
								<View style={styles.bar}>
									<View>
										<Title>{v.title}</Title>
										<Text>{v.description}</Text>
									</View>
									<RadioButton value={i.toString()} />
								</View>
							</TouchableNativeFeedback>
						))}
					</RadioButton.Group>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onClose}>确定</Button>
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
});
