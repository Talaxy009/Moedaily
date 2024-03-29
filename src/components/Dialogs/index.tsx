import React from 'react';
import OpenLinkDialog from './OpenLinkDialog';

import type {DialogProps} from '../../common/types';

export {default as R18Dialog} from './R18Dialog';
export {default as ImageInfoDialog} from './ImageInfoDialog';
export {default as TagsFilterDialog} from './TagsFilterDialog';
export {default as ProxyServerDialog} from './ProxyServerDialog';
export {default as ResetFilterDialog} from './ResetFilterDialog';
export {default as ImageQualityDialog} from './ImageQualityDialog';
export {default as AuthorFilterDialog} from './AuthorFilterDialog';

export const createOpenLinkDialog =
	(url = '') =>
	(props: DialogProps) =>
		<OpenLinkDialog {...props} url={url} />;
