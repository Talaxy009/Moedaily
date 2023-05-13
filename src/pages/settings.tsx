import React from 'react';
import {useRecoilState} from 'recoil';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import LocalizedStrings from 'react-native-localization';
import {nativeApplicationVersion} from 'expo-application';

// import ColorPoint from '../components/ColorPoint';
import * as Icon from '../components/ListIcons';
import Layout from '../components/Layout';
import {
	R18Dialog,
	TagsFilterDialog,
	ProxyServerDialog,
	ResetFilterDialog,
	AuthorFilterDialog,
	ImageQualityDialog,
	createOpenLinkDialog,
} from '../components/Dialogs';
import {AiSwitch} from '../components/Switchs/';
import {getApiSetting, storageApiSetting} from '../common/storage';
import {apiSettingsState} from '../common/atoms';
import {useTagsValue} from '../utils/tags';

import type {ApiSettings} from '../common/types';

const defaultSettings = {
	r18: 0,
	proxy: 'i.pixiv.re',
	quality: 1,
	uid: new Set(),
	tag: new Set(),
	excludeAI: false,
} as ApiSettings;

const APPLinkDialog = createOpenLinkDialog(
	'https://github.com/Talaxy009/Moedaily',
);
const AuthorLinkDialog = createOpenLinkDialog('https://www.talaxy.site/');
const APILinkDialog = createOpenLinkDialog('https://api.lolicon.app/#/setu');

const dialogs = [
	{key: 'TagsFilterDialog', component: TagsFilterDialog},
	{key: 'AuthorFilterDialog', component: AuthorFilterDialog},
	{key: 'R18Dialog', component: R18Dialog},
	{key: 'ResetFilterDialog', component: ResetFilterDialog},
	{key: 'ImageQualityDialog', component: ImageQualityDialog},
	{key: 'ProxyServerDialog', component: ProxyServerDialog},
	{key: 'APPLinkDialog', component: APPLinkDialog},
	{key: 'AuthorLinkDialog', component: AuthorLinkDialog},
	{key: 'APILinkDialog', component: APILinkDialog},
];

export default function SettingsPage() {
	const tags = useTagsValue();
	const [dialog, setDialog] = React.useState('');
	const [settings, setSettings] = useRecoilState(apiSettingsState);

	const versionName = nativeApplicationVersion || '1.0.0';

	const handleCloseDialog = () => setDialog('');

	React.useEffect(() => {
		if (!settings) {
			getApiSetting().then((v) => {
				if (v) {
					setSettings(v);
				} else {
					setSettings(defaultSettings);
				}
			});
		} else {
			storageApiSetting(settings);
		}
	}, [settings, setSettings]);

	return (
		<Layout>
			<ScrollView>
				<List.Section>
					<List.Subheader>{strings.filter.title}</List.Subheader>
					<List.Item
						title={strings.filter.tag}
						left={Icon.TagIcon}
						onPress={() => setDialog('TagsFilterDialog')}
					/>
					<List.Item
						title={strings.filter.author}
						left={Icon.AccFilterIcon}
						onPress={() => setDialog('AuthorFilterDialog')}
					/>
					{tags.has('R-18') && (
						<List.Item
							title={strings.filter.r18}
							left={Icon.RunIcon}
							onPress={() => setDialog('R18Dialog')}
						/>
					)}
					<List.Item
						title={strings.filter.ai}
						left={Icon.BrushOffIcon}
						right={AiSwitch}
					/>
					<List.Item
						title={strings.filter.reset}
						onPress={() => setDialog('ResetFilterDialog')}
						left={Icon.ReloadIcon}
					/>
				</List.Section>
				<List.Section>
					<List.Subheader>{strings.image.title}</List.Subheader>
					<List.Item
						title={strings.image.quality}
						left={Icon.ImgSizeIcon}
						onPress={() => setDialog('ImageQualityDialog')}
					/>
					<List.Item
						title={strings.image.proxy}
						left={Icon.LinkIcon}
						onPress={() => setDialog('ProxyServerDialog')}
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
						onPress={() => setDialog('APPLinkDialog')}
						title={strings.about.version}
					/>
					<List.Item
						left={Icon.AccIcon}
						description="Talaxy"
						onPress={() => setDialog('AuthorLinkDialog')}
						title={strings.about.author}
					/>
					<List.Item
						left={Icon.ServerIcon}
						description="Lolicon API"
						title={strings.about.api}
						onPress={() => setDialog('APILinkDialog')}
					/>
				</List.Section>
			</ScrollView>
			{dialogs.map((Dialog) => (
				<Dialog.component
					key={Dialog.key}
					onClose={handleCloseDialog}
					visible={dialog === Dialog.key}
				/>
			))}
		</Layout>
	);
}

const strings = new LocalizedStrings({
	en: {
		filter: {
			title: 'Filter Settings',
			tag: 'Tags Filter',
			author: 'Authors Filter',
			r18: 'R18',
			ai: 'Exclude AI works',
			reset: 'Reset All Filters',
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
