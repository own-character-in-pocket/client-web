import { Card } from "App/Atomics/Card";
import { Image } from "App/Atomics/Image";
import { Input } from "App/Atomics/Input";
import { pixelize, UNIT } from "constants/Size";
import React, { useMemo } from "react";
import styled from "styled-components";
import { hash } from "utils/hash";

const Layout = styled.div``;

const ProfileCardContainer = styled.div``;

const ProfileCard = styled.div`
  max-width: ${pixelize(UNIT * 12)};
`;

const EditorContainer = styled.div``;

const Label = styled.label`
  display: block;
`;

const createName = () => ({
  cardType: hash(),
  cardName: hash(),
  backgroundColor: hash(),
  image: hash()
});

type Props = {
  id: string;
  thumbnail: string;
  displayName: string;
};

export const Information = ({ id, thumbnail, displayName }: Props) => {
  const name = useMemo(createName, []);

  return (
    <Layout>
      <ProfileCardContainer>
        <ProfileCard>
          <Card top={<Image source={thumbnail} />} bottom={displayName} />
        </ProfileCard>
        <EditorContainer>
          <Label htmlFor={name.cardType}>카드 타입</Label>
          <Input id={name.cardType} type="text" />
          <Label htmlFor={name.cardName}>카드 이름</Label>
          <Input id={name.cardName} type="text" />
          <Label htmlFor={name.backgroundColor}>배경색</Label>
          <Input id={name.backgroundColor} type="color" />
          <Label htmlFor={name.image}>이미지</Label>
          <Input id={name.image} type="image" />
        </EditorContainer>
      </ProfileCardContainer>
    </Layout>
  );
};
