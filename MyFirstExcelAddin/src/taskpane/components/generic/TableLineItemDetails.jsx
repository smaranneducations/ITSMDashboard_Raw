import * as React from 'react';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';

const labelStyles = {
  root: { marginTop: 10, marginLeft: 10 ,marginBottom : 25},
  "backgroundColor": "red",
};

 const TableLineItemDetails = ({documentContent,conversationContent,addinContent}) => {
  return (
    <Pivot aria-label="Basic Pivot Example">
      <PivotItem
        headerText="Document"
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'My Files Title',
        }}
      >
        <Label styles={labelStyles}>{documentContent}</Label>
      </PivotItem>
      <PivotItem headerText="Conversation">
        <Label styles={labelStyles}>{conversationContent}</Label>
      </PivotItem>
      <PivotItem headerText="Addin">
        <Label styles={labelStyles}>{addinContent}</Label>
      </PivotItem>
    </Pivot>
  );
};

export default  TableLineItemDetails
