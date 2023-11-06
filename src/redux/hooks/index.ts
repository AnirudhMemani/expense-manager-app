import {AppDispatch, RootState} from '../store';
import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
