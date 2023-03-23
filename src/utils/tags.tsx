import React, {useState, useEffect, useContext} from 'react';
import {getTags, storageTags} from '../common/storage';

const TagsContext = React.createContext(new Set<string>());
const TagsActionContext = React.createContext({
	addTags: (_t: Set<string> | string) => {},
	delTags: (_t: Set<string> | string) => {},
});

type TagsAction = (t: Set<string> | string) => void;

type ProviderProps = {
	children: React.ReactNode;
};

export function TagsProvider({children}: ProviderProps) {
	const [tags, setTags] = useState(new Set<string>());

	const addTags: TagsAction = (t) => {
		setTags((oldTags) => {
			const newTags = new Set(oldTags);
			if (typeof t === 'string') {
				newTags.add(t);
			} else {
				t.forEach((v) => newTags.add(v));
			}
			storageTags(newTags);
			return newTags;
		});
	};

	const delTags: TagsAction = (t) => {
		setTags((oldTags) => {
			const newTags = new Set(oldTags);
			if (typeof t === 'string') {
				newTags.delete(t);
			} else {
				t.forEach((v) => newTags.delete(v));
			}
			storageTags(newTags);
			return newTags;
		});
	};

	useEffect(() => {
		getTags().then((v) => {
			if (v) {
				setTags(v);
			}
		});
	}, []);

	return (
		<TagsContext.Provider value={tags}>
			<TagsActionContext.Provider value={{addTags, delTags}}>
				{children}
			</TagsActionContext.Provider>
		</TagsContext.Provider>
	);
}

export const useTagsValue = () => {
	return useContext(TagsContext);
};

export const useTagsAction = () => {
	return useContext(TagsActionContext);
};

export const useTags = () => {
	return [useContext(TagsContext), useContext(TagsActionContext)] as const;
};
