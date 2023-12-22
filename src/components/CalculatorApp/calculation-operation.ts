import {
  setCurrentValue,
  setOperationRecords,
  setPreviousOperator,
  setTransactionAmount,
} from '../../redux/reducers/transaction-slice';
import {AppThunk} from '../../redux/store';
import {printLogs} from '../../utils/log-utils';
import {CALCULATOR_OPERATORS} from './constants';

class CalculatorOperationsUtils {
  static isOperatorClicked = false;
  static isOperatorClickedFirstTime = true;
  static isLastCharNumber = false;

  static isLastCharacterNumber = (str: string) => {
    printLogs(
      'isLastCharacterNumber() ===>',
      !isNaN(parseInt(str.charAt(str.length - 1))),
    );
    return !isNaN(parseInt(str.charAt(str.length - 1)));
  };

  static replaceOperator = (str: string): string => {
    printLogs('replaceOperator() ===>', str.substring(0, str.length - 2));
    return str.slice(0, str.length - 2);
  };

  static hasDecimalPoint = (str: string): boolean => {
    printLogs('hasDecimalPoint() ===>', str.includes('.'));
    return str.includes('.');
  };

  static trimLeadingZero = (str: string): string => {
    printLogs('trimLeadingZero() || INPUT_STRING ===>', str);
    if (str[0] === '0' && str[1] !== '.' && str !== '0') {
      const str1 = str.slice(1);
      printLogs('AFTER_TRIMING || OUTPUT_STRING ===>', str1);
      return str1;
    }
    return str;
  };

  static performOperation =
    (operator: string): AppThunk =>
    (dispatch, getState) => {
      const {transaction} = getState();
      const {
        operationRecords,
        transactionAmount,
        currentValue,
        previousOperator,
      } = transaction;

      this.isOperatorClicked = true;
      if (this.isOperatorClickedFirstTime) {
        this.isOperatorClickedFirstTime = false;
        dispatch(
          setOperationRecords(
            `${operationRecords}${currentValue} ${operator} `,
          ),
        );
        dispatch(setCurrentValue(''));
        dispatch(setPreviousOperator(operator));
      } else {
        if (this.isLastCharNumber) {
          this.isLastCharNumber = false;
          dispatch(
            setOperationRecords(
              `${operationRecords}${currentValue} ${operator} `,
            ),
          );
          switch (previousOperator) {
            case CALCULATOR_OPERATORS.ADDITION:
              printLogs('case CALCULATOR_OPERATORS.ADDITION ===> EXECUTED');
              const ADDITION_OUTPUT =
                parseFloat(transactionAmount) + parseFloat(currentValue);
              dispatch(setTransactionAmount(String(ADDITION_OUTPUT)));
              dispatch(setCurrentValue(''));
              break;
            case CALCULATOR_OPERATORS.SUBTRACTION:
              printLogs('case CALCULATOR_OPERATORS.SUBTRACTION ===> EXECUTED');
              const SUBTRACTION_OUTPUT =
                parseFloat(transactionAmount) - parseFloat(currentValue);
              dispatch(setTransactionAmount(String(SUBTRACTION_OUTPUT)));
              dispatch(setCurrentValue(''));
              break;
            case CALCULATOR_OPERATORS.MULTIPLICATION:
              printLogs(
                'case CALCULATOR_OPERATORS.MULTIPLICATION ===> EXECUTED',
              );
              const MULTIPLICATION_OUTPUT =
                parseFloat(transactionAmount) * parseFloat(currentValue);
              dispatch(setTransactionAmount(String(MULTIPLICATION_OUTPUT)));
              dispatch(setCurrentValue(''));
              break;
            case CALCULATOR_OPERATORS.DIVISION:
              printLogs('case CALCULATOR_OPERATORS.DIVISION ===> EXECUTED');
              const DIVISION_OUTPUT =
                parseFloat(transactionAmount) / parseFloat(currentValue);
              dispatch(setTransactionAmount(String(DIVISION_OUTPUT)));
              dispatch(setCurrentValue(''));
              break;
            case CALCULATOR_OPERATORS.PERCENTAGE:
              printLogs('case CALCULATOR_OPERATORS.PERCENTAGE ===> EXECUTED');
              const PERCENTAGE_OUTPUT =
                (parseFloat(transactionAmount) * parseFloat(currentValue)) /
                100;
              dispatch(setTransactionAmount(String(PERCENTAGE_OUTPUT)));
              dispatch(setCurrentValue(''));
              break;
            case CALCULATOR_OPERATORS.EQUALS:
              printLogs('case CALCULATOR_OPERATORS.EQUALS ===> EXECUTED');
              break;
            case CALCULATOR_OPERATORS.BACKSPACE:
              printLogs('case CALCULATOR_OPERATORS.BACKSPACE ===> EXECUTED');
              if (!currentValue) {
                const updatedValue = currentValue.slice(
                  0,
                  currentValue.length - 1,
                );
                dispatch(setCurrentValue(updatedValue));
              }
              break;
            case CALCULATOR_OPERATORS.CLEAR_ALL:
              printLogs('case CALCULATOR_OPERATORS.CLEAR_ALL ===> EXECUTED');
              dispatch(setCurrentValue('0'));
              dispatch(setOperationRecords(''));
              dispatch(setTransactionAmount('0'));
              break;
            case CALCULATOR_OPERATORS.CLEAR:
              printLogs('case CALCULATOR_OPERATORS.CLEAR ===> EXECUTED');
              dispatch(setCurrentValue(''));
              break;
            default:
              printLogs('SWITCH_CASE: default ===> EXECUTED');
              break;
          }
        } else {
          const updatedValue = this.replaceOperator(operationRecords);
          dispatch(setOperationRecords(`${updatedValue}${operator} `));
        }
      }
      printLogs('this.isOperatorClicked =', this.isOperatorClicked);
      printLogs('OPERATOR_PRESSED ===>', operator);
    };

  static updateNumber =
    (str: string): AppThunk =>
    (dispatch, getState) => {
      const {transaction} = getState();
      const {operationRecords, transactionAmount, currentValue} = transaction;
      this.isLastCharNumber = true;
      const formatedValue = this.trimLeadingZero(currentValue + str);
      if (!this.isOperatorClicked) {
        printLogs(
          'if(!this.isOperatorClicked) ===> formatedValue:',
          formatedValue,
        );
        dispatch(setCurrentValue(formatedValue));
        dispatch(setTransactionAmount(formatedValue));
      } else {
        printLogs(
          'else (this.isOperatorClicked) ===> formatedValue:',
          formatedValue,
        );
        dispatch(setCurrentValue(formatedValue));
      }
      printLogs('NUMBER_PRESSED ===>', str);
    };
}

export default CalculatorOperationsUtils;
