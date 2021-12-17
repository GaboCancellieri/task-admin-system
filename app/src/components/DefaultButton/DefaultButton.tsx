import { StyleHTMLAttributes } from "react";
import { colors } from "../../utils/theme";
import Typography from "../Typography";

import styles from './styles';

interface Props {
  additionalStyle?: Partial<StyleHTMLAttributes<Props>>;
  color?: string;
  onPress: () => void;
  text: string;
  textSize?: number;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const buttonTextColors = {
  primary: colors.white,
  secondary: colors.white,
  success: colors.white,
  danger: colors.white,
  warning: colors.white,
}

const DefaultButton = ({
  additionalStyle,
  onPress,
  text,
  textSize = 18,
  variant = 'primary',
}: Props) => {


  return (
      <div style={Object.assign(styles.mainContainer, styles[variant], additionalStyle)} onClick={onPress}>
        <Typography
        color={buttonTextColors[variant]}
        size={textSize}
        variant='medium'
        >{text}</Typography>
      </div>
  );
};

DefaultButton.defaultProps = {
  additionalStyle: {},
  textSize: 18,
  variant: 'primary',
}

export default DefaultButton;