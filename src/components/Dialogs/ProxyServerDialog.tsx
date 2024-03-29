import React from 'react';
import {View, TouchableNativeFeedback} from 'react-native';
import {
	Text,
	Title,
	Portal,
	Dialog,
	Button,
	TextInput,
	RadioButton,
} from 'react-native-paper';
import {useRecoilState} from 'recoil';

import {getCustomProxy, storageCustomProxy} from '../../common/storage';
import {apiSettingsState} from '../../common/atoms';
import strings from './strings';
import styles from './styles';

import type {DialogProps} from '../../common/types';

export default function ProxyServerDialog({
	onClose,
	visible = false,
}: DialogProps) {
	// Equal to custom proxy save in storage
	const [proxy, setProxy] = React.useState('');
	// Dialog selected value
	const [selected, setSelected] = React.useState('1');
	// Api settings
	const [settings, setSettings] = useRecoilState(apiSettingsState);
	// The value of three default proxies and one custom proxy
	const values = strings.proxy.map(({value}) => value).concat([proxy]);

	const handleConfim = () => {
		storageCustomProxy(proxy);
		handelChangeProxy(values[Number(selected)]);
		onClose();
	};

	const handelChangeProxy = (p: string) =>
		setSettings((pre) => {
			if (pre) {
				return {...pre, proxy: p};
			}
			return null;
		});

	React.useEffect(() => {
		getCustomProxy().then((v) => {
			if (v) {
				setProxy(v);
			}
		});
	}, []);

	React.useEffect(() => {
		const index = values.findIndex((v) => v === settings?.proxy);
		if (index >= 0) {
			setSelected(index.toString());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onClose}>
				<Dialog.Title>{strings.proxySetting}</Dialog.Title>
				<Dialog.Content>
					<RadioButton.Group
						value={selected}
						onValueChange={setSelected}
					>
						{strings.proxy.map((v, i) => (
							<View key={i} style={styles.itemBox}>
								<TouchableNativeFeedback
									onPress={() => setSelected(i.toString())}
								>
									<View style={styles.bar}>
										<View style={styles.textArea}>
											<Title>{v.value}</Title>
											<Text>{v.description}</Text>
										</View>
										<RadioButton value={i.toString()} />
									</View>
								</TouchableNativeFeedback>
							</View>
						))}
						<View style={styles.bar}>
							<TextInput
								dense
								defaultValue={proxy}
								style={styles.inputBox}
								textContentType="URL"
								label={strings.manual}
								onChangeText={setProxy}
							/>
							<RadioButton value={'3'} />
						</View>
					</RadioButton.Group>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onClose}>{strings.cancel}</Button>
					<Button onPress={handleConfim}>{strings.confirm}</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
