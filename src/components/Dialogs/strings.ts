import LocalizedStrings from 'react-native-localization';

export default new LocalizedStrings({
	en: {
		// AuthorFliterDialog
		authorFliter: 'Author Fliter',
		delete: 'Delete',
		addAuthor: "Add Author's UID",
		addUIDsucc: 'UID added successfully',
		noUID: 'No UID, please add below',
		moreThanTwenty: "Can't select more",
		// ImageInfoDialog
		author: 'Author',
		time: 'Time',
		tags: 'Tags',
		import: 'Import',
		importTags: 'Import tags',
		noTagSelected: 'No tag selected',
		importTagsSucc: 'Tags imported successfully',
		copied: 'Copied UID to clipboard',
		openPixiv: 'Open in Pixiv',
		// ImageQualityDialog
		imgQuality: 'Image Quality',
		qualitySelections: [
			{title: 'Origin', description: 'Original size, more detail'},
			{title: 'Normal', description: 'Normal size, just enough'},
			{title: 'Small', description: 'Small size, fast loading'},
		],
		// OpenLinkDialog
		visitLink: 'Visit Link',
		// R18Dialog
		r18: 'R18',
		r18Selections: ['No R18', 'Only R18', 'Allow R18'],
		// ProxyServerDialog
		proxySetting: 'Proxy Setting',
		proxy: [
			{
				value: 'i.pixiv.cat',
				description:
					"Loading fast, can't directly access in mainland China",
			},
			{
				value: 'i.pixiv.re',
				description:
					'Loading slow, can directly access in mainland China',
			},
			{value: 'i.pixiv.nl', description: 'Ditto, as a backup'},
		],
		manual: 'Manual configuration',
		// ResetDialog
		resetFilter: 'Reset Filter',
		resetConfirm:
			'Reset all filters? (your saved tags and authors will be safe)',
		// TagsFliterDialog
		tagsFliter: 'Tags Fliter',
		addTag: 'Add Tag',
		addTagSucc: 'Tag added successfully',
		noTag: 'No tag, please add below',
		// Actions
		cancel: 'Cancel',
		confirm: 'Confirm',
		close: 'Close',
	},
	zh: {
		// AuthorFliterDialog
		authorFliter: '画师筛选',
		delete: '删除',
		addAuthor: '添加画师 UID',
		addUIDsucc: '成功添加 UID',
		noUID: '无画师 UID，请在下方添加',
		moreThanTwenty: '无法选择更多',
		// ImageInfoDialog
		author: '作者',
		time: '时间',
		tags: '标签',
		import: '导入',
		importTags: '导入标签',
		noTagSelected: '未选择标签',
		importTagsSucc: '成功导入标签',
		copied: '已复制 UID 至剪贴板',
		openPixiv: '在 Pixiv 中打开',
		// ImageQualityDialog
		imgQuality: '画像质量',
		qualitySelections: [
			{title: '原始', description: '原始尺寸，要的就是一个体验'},
			{title: '正常', description: '正常尺寸，不多不少刚刚好'},
			{title: '压缩', description: '压缩尺寸，节流主义'},
		],
		// R18Dialog
		r18: 'R18',
		r18Selections: ['禁止 R18', '只要 R18', '允许 R18'],
		// OpenLinkDialog
		visitLink: '访问链接',
		// ProxyServerDialog
		proxySetting: '反代配置',
		proxy: [
			{value: 'i.pixiv.cat', description: '速度快，中国大陆无法直接访问'},
			{
				value: 'i.pixiv.re',
				description: '速度较慢，中国大陆可以直接访问',
			},
			{value: 'i.pixiv.nl', description: '同上，作为备用'},
		],
		manual: '手动配置',
		// ResetDialog
		resetFilter: '重置筛选配置',
		resetConfirm: '重置所有筛选配置？（已保存的标签和画师不会被删除）',
		// TagsFliterDialog
		tagsFliter: '标签筛选',
		addTag: '添加标签',
		addTagSucc: '成功添加标签',
		noTag: '无标签，请在下方添加',
		// Actions
		cancel: '取消',
		confirm: '确认',
		close: '关闭',
	},
});
