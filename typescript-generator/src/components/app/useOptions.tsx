import { IComboBoxOption } from "office-ui-fabric-react/lib/components/ComboBox/ComboBox.types";
import { useEffect, useState } from "react";
import { IEntityMetadata } from "../../models/entitymetadata";
export const useOptions = () => {
  const [options, setOptions] = useState<IComboBoxOption[]>([]);
  useEffect(() => {
    const url = window.parent.Xrm.Page.context.getClientUrl();
    fetch(`${url}/api/data/v9.0/EntityDefinitions?$select=DisplayName,EntitySetName,SchemaName&$filter=IsValidForAdvancedFind eq true`)
      .then(response => response.json())
      .then(data => {
        const md: IEntityMetadata[] = data.value;
        let mappedOptions = md.map(item => {
          const option: IComboBoxOption = {
            key: item.MetadataId,
            text: item.DisplayName.UserLocalizedLabel.Label
          };
          return option;
        });
        mappedOptions = mappedOptions.sort((a, b) => {
          if (a.text < b.text) {
            return -1;
          }
          if (a.text > b.text) {
            return 1;
          }
          return 0;
        });
        setOptions(mappedOptions);
      });
  }, []);
  return options;
};
