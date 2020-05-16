interface Props {
  children: string;
  onClick: () => void;
}

const Button = ({ children, onClick }: Props) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
