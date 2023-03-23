import React from 'react';
import {List} from 'react-native-paper';

type Icon = (p: any) => React.ReactNode;

export const TagIcon: Icon = (p) => <List.Icon {...p} icon="tag-multiple" />;
export const EditIcon: Icon = (p) => <List.Icon {...p} icon="border-color" />;
export const AccFilterIcon: Icon = (p) => (
	<List.Icon {...p} icon="account-filter" />
);
export const BrushOffIcon: Icon = (p) => <List.Icon {...p} icon="brush-off" />;
export const WrenchIcon: Icon = (p) => <List.Icon {...p} icon="wrench" />;
export const LinkIcon: Icon = (p) => <List.Icon {...p} icon="link" />;
export const RunIcon: Icon = (p) => <List.Icon {...p} icon="run" />;
export const ReloadIcon: Icon = (p) => <List.Icon {...p} icon="reload" />;
export const FmtColorIcon: Icon = (p) => (
	<List.Icon {...p} icon="format-color-fill" />
);
export const InfoIcon: Icon = (p) => <List.Icon {...p} icon="information" />;
export const AccIcon: Icon = (p) => <List.Icon {...p} icon="account-circle" />;
export const ServerIcon: Icon = (p) => (
	<List.Icon {...p} icon="server-network" />
);
export const ClockIcon: Icon = (p) => <List.Icon {...p} icon="clock" />;
export const ImgSizeIcon: Icon = (p) => (
	<List.Icon {...p} icon="image-size-select-large" />
);
