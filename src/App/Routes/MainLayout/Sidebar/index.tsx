import { ReactComponent as BentoIcon } from "App/assets/icons/bento.svg";
import { ReactComponent as EggIcon } from "App/assets/icons/egg.svg";
import { ReactComponent as HomeIcon } from "App/assets/icons/home.svg";
import { Icon } from "App/Atomics/Icon";
import { InternalLink } from "App/Atomics/InternalLink";
import { useTranslation } from "App/Store";
import { BaseColor } from "constants/BaseColor";
import { CARD_INFORMATION, CARD_LIST, MAIN } from "constants/Routes";
import { pixelize, Size, UNIT } from "constants/Size";
import React from "react";
import styled from "styled-components";

const Layout = styled.aside`
  overflow: hidden auto;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;

  width: ${Size.SIDEBAR_WIDTH_PX};

  box-shadow: inset 0 0 ${pixelize(UNIT / 4)} 0 ${BaseColor.GRAY_3};
  background-color: ${BaseColor.GRAY_2};
`;

const SectionList = styled.div`
  display: grid;

  padding: ${pixelize(UNIT / 2)} 0;
`;

const Section = styled.div`
  display: grid;
  gap: ${pixelize(UNIT / 2)};
  justify-content: center;
`;

const Badge = styled.span`
  overflow: hidden;

  display: inline-block;

  width: ${pixelize(UNIT * 3.5)};
  height: ${pixelize(UNIT * 3.5)};

  padding: ${pixelize(UNIT / 2)};

  border-radius: ${pixelize(UNIT * 1.25)};
  background-color: currentColor;

  transition-property: box-shadow;

  &:hover {
    box-shadow: 0 0 ${pixelize(UNIT / 2)} 0 currentColor;
  }
`;

export const Sidebar = () => {
  const { message } = useTranslation();

  return (
    <Layout>
      <SectionList>
        <Section>
          <Badge style={{ color: "pink" }}>
            <InternalLink to={MAIN} description={message("route-main")} isExact>
              <Icon component={HomeIcon} />
            </InternalLink>
          </Badge>
          <Badge style={{ color: "pink" }}>
            <InternalLink to={CARD_LIST} description={message("route-card-list")} isExact>
              <Icon component={BentoIcon} />
            </InternalLink>
          </Badge>
          <Badge style={{ color: "pink" }}>
            <InternalLink to={CARD_INFORMATION} description={message("route-card-information")} isExact>
              <Icon component={EggIcon} />
            </InternalLink>
          </Badge>
        </Section>
      </SectionList>
    </Layout>
  );
};
