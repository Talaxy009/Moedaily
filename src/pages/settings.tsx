import React from 'react';
import {ScrollView} from 'react-native';
import {List, Switch} from 'react-native-paper';
import LocalizedStrings from 'react-native-localization';

// import ColorPoint from '../components/ColorPoint';
import * as Icon from '../components/ListIcons';
import Layout from '../components/Layout';
import {
	OpenLinkDialog,
	TagsFliterDialog,
	ProxyServerDialog,
	AuthorFliterDialog,
	ImageQualityDialog,
} from '../components/Dialogs';
import {getAppSetting, storageAppSetting} from '../common/storage';

import type {AppSettings} from '../common/types';

const defaultSettings = {
	r18: 0,
	proxy: '',
	quality: 1,
	uid: new Set(),
	tag: new Set(),
	excludeAI: false,
} as AppSettings;

export default function SettingsPage() {
	const [dialog, setDialog] = React.useState(0);
	const [settings, setSettings] = React.useState<AppSettings>();

	const handleSelectTag = (v: string) => {
		setSettings((pre) => {
			if (!pre) {
				return;
			}
			const tag = pre.tag;
			if (tag.has(v)) {
				tag.delete(v);
			} else {
				tag.add(v);
			}
			return {...pre, tag};
		});
	};

	const handleSelectUID = (v: string) => {
		setSettings((pre) => {
			if (!pre) {
				return;
			}
			const uid = pre.uid;
			if (uid.has(v)) {
				uid.delete(v);
			} else {
				uid.add(v);
			}
			return {...pre, uid};
		});
	};

	const handleSelectQuality = (q: number) => {
		setSettings((pre) => {
			if (!pre) {
				return;
			}
			const quality = q as 0 | 1 | 2;
			return {...pre, quality};
		});
	};

	const handleSwitchAI = () =>
		setSettings((pre) => {
			if (pre) {
				return {...pre, excludeAI: !pre.excludeAI};
			}
			return;
		});

	const handelChangeProxy = (p: string) =>
		setSettings((pre) => {
			if (pre) {
				return {...pre, proxy: p};
			}
			return;
		});

	const handleReset = () => {
		const newSetting = {
			...defaultSettings,
			quality: settings?.quality,
		} as AppSettings;
		setSettings(newSetting);
		storageAppSetting(newSetting);
	};

	const handleCloseDialog = () => setDialog(0);

	React.useEffect(() => {
		if (!settings) {
			getAppSetting().then((v) => {
				if (v) {
					setSettings(v);
				} else {
					setSettings(defaultSettings);
				}
			});
		} else {
			storageAppSetting(settings);
		}
	}, [settings]);

	return (
		<Layout>
			<ScrollView>
				<List.Section>
					<List.Subheader>{strings.filter.title}</List.Subheader>
					<List.Item
						title={strings.filter.tag}
						left={Icon.TagIcon}
						onPress={() => setDialog(1)}
					/>
					<List.Item
						title={strings.filter.author}
						left={Icon.AccFilterIcon}
						onPress={() => setDialog(2)}
					/>
					<List.Item
						title={strings.filter.ai}
						left={Icon.BrushOffIcon}
						right={(p) => (
							<Switch
								{...p}
								onChange={handleSwitchAI}
								value={settings?.excludeAI || false}
							/>
						)}
					/>
					<List.Item
						title={strings.filter.reset}
						onPress={handleReset}
						left={Icon.ReloadIcon}
					/>
				</List.Section>
				<List.Section>
					<List.Subheader>{strings.image.title}</List.Subheader>
					<List.Item
						title={strings.image.quality}
						left={Icon.ImgSizeIcon}
						onPress={() => setDialog(3)}
					/>
					<List.Item
						title={strings.image.proxy}
						left={Icon.LinkIcon}
						onPress={() => setDialog(4)}
					/>
				</List.Section>
				{/* <List.Section>
					<List.Subheader>APP 设置</List.Subheader>
					<List.Item
						title="主题色"
						left={Icon.FmtColorIcon}
						right={ColorPoint}
					/>
				</List.Section> */}
				<List.Section>
					<List.Subheader>{strings.about.title}</List.Subheader>
					<List.Item
						left={Icon.InfoIcon}
						description="1.0.0"
						onPress={() => setDialog(5)}
						title={strings.about.version}
					/>
					<List.Item
						left={Icon.AccIcon}
						description="Talaxy"
						onPress={() => setDialog(6)}
						title={strings.about.author}
					/>
					<List.Item
						left={Icon.ServerIcon}
						description="Lolicon API"
						title={strings.about.api}
						onPress={() => setDialog(7)}
					/>
				</List.Section>
			</ScrollView>
			<TagsFliterDialog
				visible={dialog === 1}
				onClose={handleCloseDialog}
				onSelect={handleSelectTag}
				selected={settings?.tag || new Set()}
			/>
			<AuthorFliterDialog
				visible={dialog === 2}
				onClose={handleCloseDialog}
				onSelect={handleSelectUID}
				selected={settings?.uid || new Set()}
			/>
			<ImageQualityDialog
				visible={dialog === 3}
				onClose={handleCloseDialog}
				onSelect={handleSelectQuality}
				quality={settings ? settings.quality : 1}
			/>
			<ProxyServerDialog
				visible={dialog === 4}
				onClose={handleCloseDialog}
				onChange={handelChangeProxy}
				value={settings?.proxy || ''}
			/>
			<OpenLinkDialog
				visible={dialog === 5}
				onClose={handleCloseDialog}
				url="https://github.com/Talaxy009/Moedaily"
			/>
			<OpenLinkDialog
				visible={dialog === 6}
				onClose={handleCloseDialog}
				url="https://www.talaxy.site/"
			/>
			<OpenLinkDialog
				visible={dialog === 7}
				onClose={handleCloseDialog}
				url="https://api.lolicon.app/#/setu"
			/>
		</Layout>
	);
}

const strings = new LocalizedStrings({
	en: {
		filter: {
			title: 'Filter Settings',
			tag: 'Tags Filter',
			author: 'Authors Fliter',
			ai: 'Exclude AI works',
			reset: 'Reset Fliter',
		},
		image: {
			title: 'Image Setting',
			quality: 'Image Quality',
			proxy: 'Image Proxy Server',
		},
		about: {
			title: 'About',
			version: 'APP Version',
			author: 'APP Author',
			api: 'API Provider',
		},
	},
	zh: {
		filter: {
			title: '筛选设置',
			tag: '标签筛选',
			author: '画师筛选',
			ai: '排除 AI 作品',
			reset: '重置筛选配置',
		},
		image: {
			title: '图像配置',
			quality: '图像质量',
			proxy: '反代服务地址',
		},
		about: {
			title: '关于',
			version: '当前版本',
			author: 'APP 作者',
			api: 'API 提供',
		},
	},
});
