import React, {useEffect, useState} from 'react';
import {Banner, Subheading} from 'react-native-paper';
import LocalizedStrings from 'react-native-localization';
import {storageInitState, getInitState} from '../common/storage';

export default function HelpBanner() {
	const [visible, setVisible] = useState(false);

	const handlePress = () => {
		storageInitState();
		setVisible(false);
	};

	useEffect(() => {
		getInitState().then((v) => {
			if (!v) {
				setVisible(true);
			}
		});
	}, []);

	return (
		<Banner
			visible={visible}
			actions={[
				{
					onPress: handlePress,
					label: strings.button,
				},
			]}
			icon="information-outline"
		>
			<Subheading>{strings.info}</Subheading>
		</Banner>
	);
}

const strings = new LocalizedStrings({
	en: {
		button: 'Got it',
		info: 'Swipe left and right to turn pages, tap to view images, long press to view artwork information.',
	},
	zh: {
		button: '知道了',
		info: '左右滑动翻页，点按查看图像，长按查看作品信息。',
	},
});
