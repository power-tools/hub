import { initializeIcons } from '@uifabric/icons';
import { DefaultButton } from "office-ui-fabric-react/lib/components/Button/DefaultButton/DefaultButton";
import { VirtualizedComboBox } from "office-ui-fabric-react/lib/components/ComboBox/VirtualizedComboBox";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import * as React from "react";
import Header from "../header/header";
import { processOption } from './processOption';
import { useOptions } from "./useOptions";

// Register icons and pull the fonts from the default SharePoint CDN:
initializeIcons();

const App = () => {
  const options = useOptions(); 

  const onClickGenerate = () => {
    // * filter out the selected options
    const selectedOptions = options.filter(o => {
      return o.selected;
    });

    selectedOptions.forEach(o => {
      processOption(o);
    });
  };

  return (
    <div className="App">
      <Stack gap={10} padding={10}>
        <Header />
        <br />
        <Stack.Item align="auto">
          <DefaultButton
            text="Generate"
            primary={true}
            href="#/components/button"
            onClick={onClickGenerate}
          />
        </Stack.Item>
        <Stack.Item align="start">
          <VirtualizedComboBox
            options={options}
            autoComplete="on"
            multiSelect={true}
            placeholder="Select Entities"
            label="Dynamics Entities"
          />
        </Stack.Item>
      </Stack>
    </div>
  );
};

export default App;
