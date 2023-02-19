import React from 'react';
import {
	adaptNavigationTheme,
	Provider as PaperProvider,
	MD3DarkTheme,
	MD3LightTheme,
	MD3Theme,
} from 'react-native-paper';
import {RecoilRoot} from 'recoil';
import {useColorScheme} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import LocalizedStrings from 'react-native-localization';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import IndexPage from './src/pages/index';
import SettingsPage from './src/pages/settings';
import {darkColor, lightColor} from './src/common/color';

const Tab = createMaterialBottomTabNavigator();
const {LightTheme: NavLightTheme, DarkTheme: NavDarkTheme} =
	adaptNavigationTheme({
		reactNavigationLight: DefaultTheme,
		reactNavigationDark: DarkTheme,
	});

const ImageIcon = (p: any) => {
	return p.focused ? (
		<Icons name="image" color={p.color} size={26} />
	) : (
		<Icons name="image-outline" color={p.color} size={26} />
	);
};

const SettingsIcon = (p: any) => {
	return p.focused ? (
		<Icons name="settings" color={p.color} size={26} />
	) : (
		<Icons name="settings-outline" color={p.color} size={26} />
	);
};

export default function App(): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';

	const theme: MD3Theme = isDarkMode
		? {...MD3DarkTheme, colors: darkColor}
		: {...MD3LightTheme, colors: lightColor};
	const navTheme = isDarkMode ? NavDarkTheme : NavLightTheme;

	return (
		<RecoilRoot>
			<NavigationContainer theme={navTheme}>
				<PaperProvider theme={theme}>
					<Tab.Navigator initialRouteName="Index">
						<Tab.Screen
							name="Index"
							component={IndexPage}
							options={{
								tabBarLabel: strings.index,
								tabBarIcon: ImageIcon,
							}}
						/>
						<Tab.Screen
							name="Settings"
							component={SettingsPage}
							options={{
								tabBarLabel: strings.settings,
								tabBarIcon: SettingsIcon,
							}}
						/>
					</Tab.Navigator>
				</PaperProvider>
			</NavigationContainer>
		</RecoilRoot>
	);
}

const strings = new LocalizedStrings({
	en: {
		index: 'Artwork',
		settings: 'Setting',
	},
	zh: {
		index: '作品',
		settings: '设置',
	},
});
