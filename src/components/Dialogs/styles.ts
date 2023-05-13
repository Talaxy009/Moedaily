import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	box: {
		marginBottom: 16,
		minHeight: 64,
		maxHeight: 164,
	},
	boxContent: {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	caption: {
		alignSelf: 'center',
	},
	chip: {
		margin: 4,
	},
	delText: {
		color: 'red',
		alignSelf: 'center',
	},
	list: {
		marginBottom: 16,
		minHeight: 64,
		maxHeight: 164,
	},
	listContent: {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	itemBox: {
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
		paddingBottom: 4,
	},
	inputBox: {
		width: '70%',
	},
});
