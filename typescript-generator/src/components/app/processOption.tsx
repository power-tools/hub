import fileDownload from "js-file-download";
import { IComboBoxOption } from "office-ui-fabric-react/lib/components/ComboBox/ComboBox.types";
import { IAttributeMetadata } from "../../models/attributemetadata";

// tslint:disable-next-line: no-var-requires
const JsonToTS = require('json-to-ts');

export const processOption = (selectedEntity: IComboBoxOption) => {
  const url = window.parent.Xrm.Page.context.getClientUrl();
  fetch(
    `${url}/api/data/v9.0/EntityDefinitions(${
      selectedEntity.key
    })/Attributes?$select=LogicalName,AttributeType,IsRequiredForForm`
  )
    .then(response => response.json())
    .then(data => {
      const attributes: IAttributeMetadata[] = data.value;
      const selectedEntityNoSpaces = selectedEntity.text.replace(/ +/g, "");
      
      attributes.forEach((attr) => {
        if (!attr.IsRequiredForForm){
          attr.LogicalName += "?";
        }
      })
      
      const newObj = Object.assign(
        {},
        ...attributes.map(item => ({
          [item.LogicalName]: item.AttributeType
        }))
      );

      Object.keys(newObj).forEach(e => {
        switch (newObj[e]) {
          case "String":
          case "Boolean":
          case "DateTime":
            newObj[e] = "";
            break;
          case "Integer":
          case "Double":
          case "Decimal":
            newObj[e] = 0;
            break;
          case "Money":
          case "Picklist":
          case "Virtual":
            newObj[e] = {};
            break;
          default:
            break;
        }
      });

      let tsoutput = "";
      JsonToTS(newObj).forEach((typeInterface: string) => {
        tsoutput+=typeInterface;
      })
      tsoutput = tsoutput.replace('RootObject', `I${selectedEntityNoSpaces}`);
      tsoutput = tsoutput.replace(/'/g,'');
      fileDownload(tsoutput, `${selectedEntityNoSpaces}.d.ts`);
    });
};
