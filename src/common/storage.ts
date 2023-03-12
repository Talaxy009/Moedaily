import AsyncStorage from '@react-native-async-storage/async-storage';

import type {AppSettings} from './types';

export async function getAppSetting(): Promise<AppSettings | null> {
	const value = await AsyncStorage.getItem('@APP_SETTINGS');
	if (value) {
		const tmp = JSON.parse(value);
		return {
			...tmp,
			tag: new Set(tmp.tag),
			uid: new Set(tmp.uid),
		};
	}
	return null;
}

export function storageAppSetting(settings: AppSettings) {
	const tmp = {
		...settings,
		tag: Array.from(settings.tag),
		uid: Array.from(settings.uid),
	};
	const jsonValue = JSON.stringify(tmp);
	return AsyncStorage.setItem('@APP_SETTINGS', jsonValue);
}

export async function getTags(): Promise<Set<string> | null> {
	const value = await AsyncStorage.getItem('@TAGS');
	return value ? new Set(JSON.parse(value)) : null;
}

export function storageTags(tags: Set<string>) {
	const jsonValue = JSON.stringify(Array.from(tags));
	return AsyncStorage.setItem('@TAGS', jsonValue);
}

export async function getUIDs(): Promise<Set<string> | null> {
	const value = await AsyncStorage.getItem('@UIDS');
	return value ? new Set(JSON.parse(value)) : null;
}

export function storageUIDs(uids: Set<string>) {
	const jsonValue = JSON.stringify(Array.from(uids));
	return AsyncStorage.setItem('@UIDS', jsonValue);
}

export async function getInitState(): Promise<string | null> {
	return AsyncStorage.getItem('@INIT_STATE');
}

export function storageInitState() {
	return AsyncStorage.setItem('@INIT_STATE', 'true');
}
