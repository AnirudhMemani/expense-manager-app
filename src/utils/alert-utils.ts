import {Alert} from 'react-native';

export const SimpleAlert = (title: string, message: string) => {
  const buttons = [
    {
      text: 'ok',
    },
  ];
  Alert.alert(title, message, buttons, {cancelable: true});
};

export const AlertWithOneActionableOption = (
  title: string,
  message: string,
  positiveName: string,
  cancelable: boolean,
  callback: (executeAction: boolean) => void,
) => {
  let buttons = [
    {
      text: positiveName,
      onPress: () => {
        callback(true);
      },
    },
  ];

  Alert.alert(title, message, buttons, {
    cancelable: cancelable,
  });
};

export const AlertWithTwoActionableOptions = (
  title: string,
  message: string,
  positiveName: string,
  negativeName: string | null,
  cancelable: boolean,
  callback: (executeAction: boolean) => void,
) => {
  let buttons = [
    {
      text: positiveName,
      onPress: () => {
        callback(true);
      },
    },
  ];

  if (negativeName) {
    buttons.push({
      text: negativeName,
      onPress: () => {
        callback(false);
      },
    });
  }

  Alert.alert(title, message, buttons, {
    cancelable: cancelable,
  });
};
