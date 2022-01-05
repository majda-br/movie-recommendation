import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import PokemonDisplayer from "../components/PokemonDisplayer";

export default {
  title: "Fetching data",
  decorators: [withKnobs],
};

export const FetchDataStory = () => <PokemonDisplayer />;
