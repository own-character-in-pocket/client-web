import { Loading } from "App/Atomics/Loading";
import { cardInformationPath } from "constants/Routes";
import { Size } from "constants/Size";
import React from "react";
import styled from "styled-components";
import { lazyComponent } from "utils/lazy-component";
import { FieldGroupList } from "./FieldGroupList";
import { Information } from "./Information";
import { Relationships } from "./Relationships";
import { loadCard } from "./services/loadCard";
import { CardInformationPageStore, CardInformationStoreProvider, useCardInformationSelector } from "./Store";

const Layout = styled.div`
  padding: ${Size.PADDING_PX};
`;

const Loaded = () => {
  const { id, thumbnail, displayName } = useCardInformationSelector(({ Card }) => Card.item);

  return (
    <Layout>
      <Information id={id} thumbnail={thumbnail} displayName={displayName} />
      <FieldGroupList />
      <Relationships />
    </Layout>
  );
};

export const CardInformation = lazyComponent({
  async load() {
    const match = cardInformationPath.parse(window.location.pathname);
    const card = await loadCard(match.params.id);
    if (card.isErr) {
      return () => <Loading.Error error={card.error} />;
    }

    const { item } = card;
    if (!item) {
      return () => <>카드 정보가 존재하지 않습니다.</>;
    }

    const args: CardInformationPageStore = { Card: { item } };

    return () => (
      <CardInformationStoreProvider args={args}>
        <Loaded />
      </CardInformationStoreProvider>
    );
  }
});
