import {getAppSetting} from '../common/storage';
import {AppSettings} from '../common/types';

const quality = ['original', 'regular', 'small'];

const getAPIParameter = (origin: AppSettings | null) => {
	if (origin) {
		return {
			size: ['mini', quality[origin.quality]],
			excludeAI: origin.excludeAI,
			tag: Array.from(origin.tag),
			uid: Array.from(origin.uid),
			num: 5,
			r18: origin.r18,
			...(origin.proxy && {
				proxy: origin.proxy,
			}),
		};
	} else {
		return {
			size: ['mini', 'regular'],
			num: 5,
		};
	}
};

export async function getImage() {
	const settings = await getAppSetting();
	const p = getAPIParameter(settings);

	const res = await fetch('https://api.lolicon.app/setu/v2/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(p),
	});
	return res.json();
}
