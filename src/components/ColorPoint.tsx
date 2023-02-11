import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function ColorPoint() {
	const theme = useTheme();
	return (
		<View style={[styles.point, {backgroundColor: theme.colors.primary}]} />
	);
}

const styles = StyleSheet.create({
	point: {
		width: 16,
		height: 16,
		borderRadius: 8,
	},
});
