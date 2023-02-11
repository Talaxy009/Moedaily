import React from 'react';
import {useRecoilState} from 'recoil';
import {Portal, Snackbar, useTheme} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {toastState} from '../common/atoms';

export default function Layout({children}: {children: React.ReactNode}) {
	const [toast, setToast] = useRecoilState(toastState);
	const theme = useTheme();

	const handleClose = () => setToast((p) => ({...p, open: false}));

	return (
		<Portal.Host>
			<View
				style={[
					styles.root,
					{backgroundColor: theme.colors.background},
				]}
			>
				{children}
			</View>
			<Snackbar
				visible={toast.open}
				onDismiss={handleClose}
				action={{
					label: '关闭',
					onPress: handleClose,
				}}
			>
				{toast.text}
			</Snackbar>
		</Portal.Host>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
});
