import React from 'react';
import {useRecoilState} from 'recoil';
import {Switch} from 'react-native-paper';

import {apiSettingsState} from '../../common/atoms';

export default function AiSwitch() {
	const [settings, setSettings] = useRecoilState(apiSettingsState);

	const handleSwitchAI = () =>
		setSettings((pre) => {
			if (pre) {
				return {...pre, excludeAI: !pre.excludeAI};
			}
			return null;
		});

	return (
		<Switch
			onChange={handleSwitchAI}
			value={settings?.excludeAI || false}
		/>
	);
}
