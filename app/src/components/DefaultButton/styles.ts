import { colors } from '../../utils/theme';

const styles = {
  mainContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: 40,
    marginTop: 5,
    width: '120px',
  },
  primary: {
    backgroundColor: colors.primaryPurple,
    borderColor: colors.primaryPurple,
    borderRadius: 8,
    borderWidth: 1,
  },
  secondary: {
    backgroundColor: colors.secondaryGray,
    borderColor: colors.secondaryGray,
    borderRadius: 8,
    borderWidth: 1,
  },
  success: {
    backgroundColor: colors.successGreen,
    borderColor: colors.successGreen,
    borderRadius: 8,
    borderWidth: 1,
  },
  warning: {
    backgroundColor: colors.warningYellow,
    borderColor: colors.warningYellow,
    borderRadius: 8,
    borderWidth: 1,
  },
  danger: {
    backgroundColor: colors.dangerRed,
    borderColor: colors.dangerRed,
    borderRadius: 8,
    borderWidth: 1,
  },
}

export default styles;