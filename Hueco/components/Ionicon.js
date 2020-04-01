import React from "react";
import { Icon } from 'react-native-elements';
export default function Ionicon(props) {
  return (
    <Icon
      name={props.name}
      size={props.size}
      color={props.color}
    />
  );
}
