import { FieldInputType } from "constants/FieldInputType";
import React from "react";
import styled from "styled-components";
import { Field } from "./Field";

const Layout = styled.div``;

export const FieldGroupList = () => (
  <Layout>
    <Field type={FieldInputType.SinglineText} value="value" isReadonly onChange={console.log} />
  </Layout>
);
