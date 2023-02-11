import React from 'react';
import {ScrollView} from 'react-native';
import {List, Switch} from 'react-native-paper';
// import ColorPoint from '../components/ColorPoint';
import * as Icon from '../components/ListIcons';
import Layout from '../components/Layout';
import {
	OpenLinkDialog,
	TagsManageDialog,
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
	const [expanded, setExpanded] = React.useState(false);
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
		setSettings(defaultSettings);
		storageAppSetting(defaultSettings);
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
					<List.Subheader>画像设置</List.Subheader>
					<List.Item
						title="标签筛选"
						left={Icon.TagIcon}
						onPress={() => setDialog(1)}
					/>
					<List.Item
						title="画师筛选"
						left={Icon.AccFilterIcon}
						onPress={() => setDialog(2)}
					/>
					<List.Item
						title="排除 AI 作品"
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
						title="图像质量"
						left={Icon.ImgSizeIcon}
						onPress={() => setDialog(3)}
					/>
					<List.Accordion
						title="进阶配置"
						expanded={expanded}
						onPress={() => setExpanded((p) => !p)}
						left={Icon.WrenchIcon}>
						<List.Item
							title="反代服务地址"
							left={Icon.LinkIcon}
							onPress={() => setDialog(4)}
						/>
						<List.Item
							title="重置画像设置"
							onPress={handleReset}
							left={Icon.ReloadIcon}
						/>
					</List.Accordion>
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
					<List.Subheader>关于</List.Subheader>
					<List.Item
						title="当前版本"
						description="0.1.0-beta"
						left={Icon.InfoIcon}
					/>
					<List.Item
						title="APP 作者"
						left={Icon.AccIcon}
						description="Talaxy"
						onPress={() => setDialog(5)}
					/>
					<List.Item
						title="API 提供"
						left={Icon.ServerIcon}
						description="Lolicon API"
						onPress={() => setDialog(6)}
					/>
				</List.Section>
			</ScrollView>
			<TagsManageDialog
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
				url="https://www.talaxy.site/"
			/>
			<OpenLinkDialog
				visible={dialog === 6}
				onClose={handleCloseDialog}
				url="https://api.lolicon.app/#/setu"
			/>
		</Layout>
	);
}
