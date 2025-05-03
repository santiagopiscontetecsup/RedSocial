/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';
import Colors  from '../constants/Colors';

export { useColorScheme } from 'react-native';
// filepath: hooks/useThemeColor.ts
export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
  ) {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];
  
    return colorFromProps ?? Colors[theme]?.[colorName] ?? '#000'; // Fallback to black
  }