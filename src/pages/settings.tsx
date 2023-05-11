import React from 'react';
import {ScrollView} from 'react-native';
import {List, Switch} from 'react-native-paper';
import LocalizedStrings from 'react-native-localization';
import {nativeApplicationVersion} from 'expo-application';

// import ColorPoint from '../components/ColorPoint';
import * as Icon from '../components/ListIcons';
import Layout from '../components/Layout';
import {
	R18Dialog,
	OpenLinkDialog,
	TagsFliterDialog,
	ProxyServerDialog,
	AuthorFliterDialog,
	ImageQualityDialog,
} from '../components/Dialogs';
import {getAppSetting, storageAppSetting} from '../common/storage';
import {useTagsValue} from '../utils/tags';

import type {AppSettings} from '../common/types';

const defaultSettings = {
	r18: 0,
	proxy: 'i.pixiv.re',
	quality: 1,
	uid: new Set(),
	tag: new Set(),
	excludeAI: false,
} as AppSettings;

export default function SettingsPage() {
	const tags = useTagsValue();
	const [dialog, setDialog] = React.useState(0);
	const [settings, setSettings] = React.useState<AppSettings>();

	const versionName = nativeApplicationVersion || '1.0.0';

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

	const handleSelectR18 = (r: number) => {
		setSettings((pre) => {
			if (!pre) {
				return;
			}
			const r18 = r as 0 | 1 | 2;
			return {...pre, r18};
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
			quality: settings?.quality || 1,
			proxy: settings?.proxy || '',
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
					{tags.has('R-18') && (
						<List.Item
							title={strings.filter.r18}
							left={Icon.RunIcon}
							onPress={() => setDialog(3)}
						/>
					)}
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
						onPress={() => setDialog(4)}
					/>
					<List.Item
						title={strings.image.proxy}
						left={Icon.LinkIcon}
						onPress={() => setDialog(5)}
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
						description={versionName}
						onPress={() => setDialog(6)}
						title={strings.about.version}
					/>
					<List.Item
						left={Icon.AccIcon}
						description="Talaxy"
						onPress={() => setDialog(7)}
						title={strings.about.author}
					/>
					<List.Item
						left={Icon.ServerIcon}
						description="Lolicon API"
						title={strings.about.api}
						onPress={() => setDialog(8)}
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
			<R18Dialog
				visible={dialog === 3}
				r18={settings?.r18 || 0}
				onSelect={handleSelectR18}
				onClose={handleCloseDialog}
			/>
			<ImageQualityDialog
				visible={dialog === 4}
				onClose={handleCloseDialog}
				onSelect={handleSelectQuality}
				quality={settings?.quality || 1}
			/>
			<ProxyServerDialog
				visible={dialog === 5}
				onClose={handleCloseDialog}
				onChange={handelChangeProxy}
				value={settings?.proxy || ''}
			/>
			<OpenLinkDialog
				visible={dialog === 6}
				onClose={handleCloseDialog}
				url="https://github.com/Talaxy009/Moedaily"
			/>
			<OpenLinkDialog
				visible={dialog === 7}
				onClose={handleCloseDialog}
				url="https://www.talaxy.site/"
			/>
			<OpenLinkDialog
				visible={dialog === 8}
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
			r18: 'R18',
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
			r18: 'R18',
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
