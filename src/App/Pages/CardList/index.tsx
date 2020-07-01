import { ThumbnailCard } from "App/Molecules/ThumbnailCard";
import { cardInformationPath } from "constants/Routes";
import React from "react";
import styled from "styled-components";
import { loadable } from "utils/loadable";
import { loadCardList } from "./services/loadCardList";
import { CardListPageStore, CardListStoreProvider, useCardListSelector } from "./Store";

const Layout = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, 8rem);

  padding: 1rem;
`;

const Loaded = () => {
  const itemList = useCardListSelector(({ Card }) => Card.itemList);

  return (
    <Layout>
      {itemList.map(({ id, thumbnail, displayName }) => (
        <ThumbnailCard key={id} to={cardInformationPath.transform({ id })} source={thumbnail} title={displayName} />
      ))}
    </Layout>
  );
};

export const CardList = loadable({
  async load() {
    const cardList = await loadCardList();
    if (cardList.isErr) {
      throw cardList.error;
    }

    const args: CardListPageStore = { Card: { itemList: cardList.item } };

    return () => (
      <CardListStoreProvider args={args}>
        <Loaded />
      </CardListStoreProvider>
    );
  }
});
