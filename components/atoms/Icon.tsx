import iconSet from "@/icomoon/selection.json";
import IcomoonReact, { iconList } from "icomoon-react";

interface PropTypes {
  name: string;
  size: number;
  color?: string;
}

const Icon: React.FC<PropTypes> = ({ name, size, color }) => {
  return (
    <IcomoonReact iconSet={iconSet} color={color} size={size} icon={name} />
  );
};

export default Icon;
