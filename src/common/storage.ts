import AsyncStorage from '@react-native-async-storage/async-storage';

import type {ApiSettings} from './types';

// API settings

export async function getApiSetting(): Promise<ApiSettings | null> {
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

export function storageApiSetting(settings: ApiSettings) {
	const tmp = {
		...settings,
		tag: Array.from(settings.tag),
		uid: Array.from(settings.uid),
	};
	const jsonValue = JSON.stringify(tmp);
	return AsyncStorage.setItem('@APP_SETTINGS', jsonValue);
}

// Added tag list

export async function getTags(): Promise<Set<string> | null> {
	const value = await AsyncStorage.getItem('@TAGS');
	return value ? new Set(JSON.parse(value)) : null;
}

export function storageTags(tags: Set<string>) {
	const jsonValue = JSON.stringify(Array.from(tags));
	return AsyncStorage.setItem('@TAGS', jsonValue);
}

// Added UID list

export async function getUIDs(): Promise<Set<string> | null> {
	const value = await AsyncStorage.getItem('@UIDS');
	return value ? new Set(JSON.parse(value)) : null;
}

export function storageUIDs(uids: Set<string>) {
	const jsonValue = JSON.stringify(Array.from(uids));
	return AsyncStorage.setItem('@UIDS', jsonValue);
}

// APP initialization state (for usage guide)

export async function getInitState(): Promise<string | null> {
	return AsyncStorage.getItem('@INIT_STATE');
}

export function storageInitState() {
	return AsyncStorage.setItem('@INIT_STATE', 'true');
}

// Custom proxy storage

export async function getCustomProxy(): Promise<string | null> {
	return AsyncStorage.getItem('@SELF_PROXY');
}

export function storageCustomProxy(proxy: string) {
	return AsyncStorage.setItem('@SELF_PROXY', proxy);
}
