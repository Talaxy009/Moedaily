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
		importTagsSucc: 'Tags imported successfully',
		copied: 'Copied UID to clipboard',
		openPixiv: 'Open in Pixiv',
		// ImageQualityDialog
		imgQuality: 'Image Quality',
		selections: [
			{title: 'Origin', description: 'Original size, more detail'},
			{title: 'Normal', description: 'Normal size, just enough'},
			{title: 'Small', description: 'Small size, fast loading'},
		],
		// OpenLinkDialog
		visitLink: 'Visit Link',
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
		importTagsSucc: '成功导入标签',
		copied: '已复制 UID 至剪贴板',
		openPixiv: '在 Pixiv 中打开',
		// ImageQualityDialog
		imgQuality: '画像质量',
		selections: [
			{title: '原始', description: '原始尺寸，要的就是一个体验'},
			{title: '正常', description: '正常尺寸，不多不少刚刚好'},
			{title: '压缩', description: '压缩尺寸，节流主义'},
		],
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
