import { FieldInputType } from "constants/FieldInputType";
import React from "react";
import styled from "styled-components";
import { MultilineTextInput } from "./MultilineTextInput";
import { NumberInput } from "./NumberInput";
import { SinglelineTextInput } from "./SinglelineTextInput";
import { UnknownInputInput } from "./UnknownInput";

const Layout = styled.div``;

const InputTable = {
  [FieldInputType.MultilineText]: MultilineTextInput,
  [FieldInputType.Number]: NumberInput,
  [FieldInputType.SinglineText]: SinglelineTextInput
};

type Props = {
  type: keyof typeof InputTable;
  value: any;
  isReadonly: boolean;
  onChange: (value: any) => void;
};

export const Field = ({ type, value, isReadonly, onChange }: Props) => {
  const Input = InputTable[type] ?? UnknownInputInput;
  return (
    Input && (
      <Layout data-readonly={isReadonly}>
        <Input value={value} isReadonly={isReadonly} onChange={onChange} />
      </Layout>
    )
  );
};
