import { initializeIcons } from "@uifabric/icons";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import * as React from "react";
import { processOption } from "./processOption";
import { PowerToolsHeader, EntityList } from "pt-components";
import { IComboBoxOption, IComboBox } from "office-ui-fabric-react/lib/components/ComboBox/ComboBox.types";

// Register icons and pull the fonts from the default SharePoint CDN:
initializeIcons();

const App = () => {  
  const [selectedOptions, setSelectedOptions] = React.useState<IComboBoxOption[]>([]);
  
  const onClickGenerate = () => {
    selectedOptions.forEach(o => {
      processOption(o);
    });
  };

  // OnChange of the EntityList handle the change by adding or removing from selectedOptions
  const handleChange = (event:React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
    let tempOptions = selectedOptions;
    if (option != null && option.selected){
      tempOptions.push(option)
      setSelectedOptions(tempOptions);
    }
    else if (option != null) {
      var i = tempOptions.findIndex(function(o){
        return o.key === option.key;
      });
      tempOptions.splice(i,1);
      setSelectedOptions(tempOptions);
    }
  };

  return (
    <div className="App">
      <Stack gap={10} padding={10}>
        <PowerToolsHeader
          title="TypeScript Generator"
          repoUrl="https://github.com/power-tools/hub"
          description="Choose your entities and click Generate to get TypeScript helper classes
          for the selected entities"
        />
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
          <EntityList
            onChange={handleChange}
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
