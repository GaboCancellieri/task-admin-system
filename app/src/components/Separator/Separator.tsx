interface Props {
    isHorizontal?: boolean;
    size?: number;
}

const Separator = ({ isHorizontal, size }: Props) => {

return (
      <div style={ (isHorizontal) ? {width: size} : {height: size} }></div>
  );
};

Separator.defaultProps = {
  isHorizontal: false,
  size: 10,
}

export default Separator;
