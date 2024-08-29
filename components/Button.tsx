import * as React from 'react';
import { Button as Btn } from 'react-native-paper';

const Button = ({children, ...props}) => (
    <Btn {...props}>
        { children }
    </Btn>
);

export default Button;