import React from 'react';
import {useRecoilState} from 'recoil';
import {View, StyleSheet} from 'react-native';
import {Portal, Snackbar} from 'react-native-paper';
import LocalizedStrings from 'react-native-localization';

import {toastState} from '../common/atoms';

export default function Layout({children}: {children: React.ReactNode}) {
	const [toast, setToast] = useRecoilState(toastState);

	const handleClose = () => setToast((p) => ({...p, open: false}));

	return (
		<>
			<Portal.Host>
				<View style={styles.root}>{children}</View>
			</Portal.Host>
			<Snackbar
				duration={5000}
				visible={toast.open}
				onDismiss={handleClose}
				action={{
					label: strings.label,
					onPress: handleClose,
				}}
			>
				{toast.text}
			</Snackbar>
		</>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
});

const strings = new LocalizedStrings({
	en: {
		label: 'Close',
	},
	zh: {
		label: '关闭',
	},
});
