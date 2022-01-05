import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";

export default {
  title: "Displaying a list",
  decorators: [withKnobs],
};

const NAMES = [
  { firstName: "Fred", lastName: "Bartelette" },
  { firstName: "Mickey", lastName: "Mouse" },
  { firstName: "Donald", lastName: "Duck" },
];

export const DisplayingAList = () => <ArrayDisplayer list={object("list", NAMES)} />;

const getFullName = ({ firstName, lastName }) => `${firstName} ${lastName}`;
const ArrayDisplayer = ({ list }) => (
  <ul>
    {list.map(({ firstName, lastName }) => (
      <li key={firstName}>{getFullName({ firstName, lastName })}</li>
    ))}
  </ul>
);

// Equivalent implementations
// Without destructuring
const getFullNameWithoutDestructuring = (name) => `${name.firstName} ${name.lastName}`;
const ArrayDisplayerWithoutDestructuring = (props) => (
  <ul>
    {props.list.map((name) => (
      <li key={name.firstName}>{getFullNameWithoutDestructuring({ firstName: name.firstName, lastName: name.lastName })}</li>
    ))}
  </ul>
);
export const DisplayingAList2 = () => (
  <ArrayDisplayerWithoutDestructuring list={object("list", NAMES)} />
);

// With inlined method
const ArrayDisplayerWithInlinedMethod = (props) => (
  <ul>
    {props.list.map(({ firstName, lastName }) => (
      <li key={firstName}>{`${firstName} ${lastName}`}</li>
    ))}
  </ul>
);
export const DisplayingAList3 = () => (
  <ArrayDisplayerWithInlinedMethod list={object("list", NAMES)} />
);
