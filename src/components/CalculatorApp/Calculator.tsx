import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {globalColors} from '../../utils/globalColors';
import {CompletionPanel} from './CompletionPanel';
import {ResultPanel} from './ResultPanel';
import {ControlPanel} from './ControlPanel';
import {OperatorSidebar} from './OperatorSidebar';
import {NumbersPanel} from './NumbersPanel';
import {useAppDispatch} from '../../redux/hooks';
import {setCurrentValue} from '../../redux/reducers/transaction-slice';
import CalculatorOperationsUtils from './calculation-operation';

export interface ICalculatorProps {
  visible: boolean;
  onPress: () => void;
}

export const Calculator: React.FC<ICalculatorProps> = ({visible, onPress}) => {
  // <-- Variables -->
  const {height} = Dimensions.get('window');
  const MODAL_HEIGHT = (height * 3) / 5;

  const dispatch = useAppDispatch();

  useEffect(() => {
    //
    return () => {
      CalculatorOperationsUtils.isOperatorClickedFirstTime = true;
      CalculatorOperationsUtils.isOperatorClicked = false;
    };
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onPress}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.dismissModalArea}
        onPress={onPress}>
        <View />
      </TouchableOpacity>
      <View style={[styles.calculatorContainer, {height: MODAL_HEIGHT}]}>
        <CompletionPanel onPressNegative={onPress} onPressPositive={onPress} />
        <ResultPanel />
        <View style={styles.utilityContainerStyles}>
          <View style={styles.numberPanelStyles}>
            <ControlPanel />
            <NumbersPanel />
          </View>
          <View style={styles.operatorsPanelStyl}>
            <OperatorSidebar />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dismissModalArea: {
    flex: 1,
    backgroundColor: globalColors.transparent,
  },
  calculatorContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: globalColors.bottomTab_bg_color,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  utilityContainerStyles: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  numberPanelStyles: {
    flex: 3,
    flexDirection: 'column',
  },
  operatorsPanelStyl: {
    flex: 1,
  },
});
