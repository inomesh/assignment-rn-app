import {StyleSheet, ViewStyle} from 'react-native';

interface IStyle {
    container: ViewStyle;
    spacer: ViewStyle;
}

const styles = StyleSheet.create<IStyle>({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spacer: {
        height: 10,
    }
});

export default styles;