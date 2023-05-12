import {atom} from 'recoil';

import type {ApiSettings} from './types';

export const toastState = atom({
	key: 'toastState',
	default: {
		open: false,
		text: '',
	},
});

export const apiSettingsState = atom<ApiSettings | null>({
	key: 'apiSettingsState',
	default: null,
});
