import { View } from "native-base";
import React from "react";

interface ISpaceProps {
  height?: number;
  width?: number;
}

const Space: React.FC<ISpaceProps> = ({ height, width }) => {
  return <View style={{ height: height, width: width }} />;
};

export default Space;

Space.defaultProps = {
  height: 0,
  width: 0,
};
