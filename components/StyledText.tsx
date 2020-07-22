import * as React from "react";

import { Text, TextProps } from "./Themed";
import { REGULAR_FONT } from "../constants/Font";

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: REGULAR_FONT }]} />
  );
}
