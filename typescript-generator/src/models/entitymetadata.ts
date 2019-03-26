export interface IEntityMetadata {
  DisplayName: {
    LocalizedLabels: [any];
    UserLocalizedLabel: {
      Label: string;
    };
  };
  EntitySetName: string;
  MetadataId: string;
  SchemaName: string;
}
