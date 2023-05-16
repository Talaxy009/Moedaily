import React from 'react';
import {
	adaptNavigationTheme,
	Provider as PaperProvider,
	MD3DarkTheme,
	MD3LightTheme,
} from 'react-native-paper';
import {RecoilRoot} from 'recoil';
import {StatusBar, useColorScheme} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import LocalizedStrings from 'react-native-localization';
import {useMaterial3Theme} from '@pchmn/expo-material3-theme';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import IndexPage from './src/pages/index';
import {TagsProvider} from './src/utils/tags';
import SettingsPage from './src/pages/settings';

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
	const {theme: m3Theme} = useMaterial3Theme({
		fallbackSourceColor: '#009ba1',
	});

	const darkTheme = {
		...NavDarkTheme,
		...MD3DarkTheme,
		colors: {...NavDarkTheme.colors, ...m3Theme.dark},
	};
	const lightTheme = {
		...NavLightTheme,
		...MD3LightTheme,
		colors: {...NavLightTheme.colors, ...m3Theme.light},
	};

	const theme = isDarkMode ? darkTheme : lightTheme;

	const barStyle = isDarkMode ? 'light-content' : 'dark-content';

	return (
		<RecoilRoot>
			<TagsProvider>
				<PaperProvider theme={theme}>
					<NavigationContainer theme={theme}>
						<StatusBar
							barStyle={barStyle}
							backgroundColor={theme.colors.surface}
						/>
						<Tab.Navigator
							shifting
							sceneAnimationEnabled
							initialRouteName="Index"
						>
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
					</NavigationContainer>
				</PaperProvider>
			</TagsProvider>
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
