export type ImageData = {
	aiType: number; // 是否是 AI 作品，0 未知（旧画作或字段未更新），1 不是，2 是
	author: string; // 作者名（入库时，并过滤掉 @ 及其后内容）
	ext: string; // 图片扩展名
	width: number; // 原图宽度 px
	height: number; // 原图高度 px
	p: number; // 作品所在页
	pid: number; // 作品 pid
	r18: boolean; // 是否 R18（在库中的分类，不等同于作品本身的 R18 标识）
	tags: Array<string>; // 作品标签，包含标签的中文翻译（有的话）
	title: string; // 作品标题
	uid: number; // 作者 uid
	uploadDate: number; // 作品上传日期；时间戳，单位为毫秒
	urls: {
		original: string | undefined;
		regular: string;
		small: string | undefined;
		mini: string;
	}; // 包含了所有指定 size 的图片地址
};

export type ImageDataList = Array<ImageData>;

export type ApiSettings = {
	r18: 0 | 1 | 2; // 一次返回的结果数量，范围为 1 到 20
	quality: 0 | 1 | 2; // original regular small
	uid: Set<string>; // 返回指定 uid 作者的作品，最多 20 个
	tag: Set<string>; // 返回匹配指定标签的作品
	excludeAI: boolean; // 排除 AI 作品
	proxy: string; // 设置图片地址所使用的反代服务
};

export interface DialogProps {
	onClose: () => void;
	visible: boolean;
}
