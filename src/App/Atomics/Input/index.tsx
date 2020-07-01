import React, { ChangeEvent, CSSProperties, forwardRef } from "react";
import styled from "styled-components";
import { NO_OPERATION } from "utils/no-operation";

const Layout = styled.input``;

const TextLayout = styled(Layout)``;

const NumberLayout = styled(Layout)``;

const EmailLayout = styled(Layout)``;

const PasswordLayout = styled(Layout)``;

const ColorLayout = styled(Layout)``;

const ImageLayout = styled(Layout)``;

type BaseProps = {
  className?: string;
  style?: CSSProperties;
  id?: string;
  autoComplete?: string;
  isRequired?: true;
  tabIndex?: number;
  onClick?: () => void;
  onBlur?: () => void;
};

type InputKind = {
  text: "text";
  number: "number";
  email: "email";
  password: "password";
  color: "color";
  image: "image";
};

type TextProps = {
  type: InputKind["text"];
  value?: string;
  onChange?: (value: string) => void;
};

type NumberProps = {
  type: InputKind["number"];
  value?: number;
  onChange?: (value: number) => void;
};

type EmailProps = {
  type: InputKind["email"];
  value?: string;
  onChange?: (value: string) => void;
};

type PasswordProps = {
  type: InputKind["password"];
  value?: string;
  onChange?: (value: string) => void;
};

type ColorProps = {
  type: InputKind["color"];
  value?: string;
  onChange?: (value: string) => void;
};

type ImageProps = {
  type: InputKind["image"];
  value?: string;
  onChange?: (value: string) => void;
};

type InputTypeProps = TextProps | NumberProps | EmailProps | PasswordProps | ColorProps | ImageProps;

type Props = BaseProps & InputTypeProps;

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, style, id, autoComplete = "nope", isRequired, tabIndex, onClick, onBlur } = props;

  switch (props.type) {
    case "text": {
      const { value, onChange = NO_OPERATION } = props;
      const change = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value);
      };
      return (
        <TextLayout
          ref={ref}
          className={className}
          style={style}
          id={id}
          type={props.type}
          autoComplete={autoComplete}
          required={isRequired}
          tabIndex={tabIndex}
          value={value}
          onChange={change}
          onClick={onClick}
          onBlur={onBlur}
        />
      );
    }
    case "number": {
      const { value, onChange = NO_OPERATION } = props;
      const change = (event: ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        onChange(value);
      };
      return (
        <NumberLayout
          ref={ref}
          className={className}
          style={style}
          id={id}
          type={props.type}
          autoComplete={autoComplete}
          required={isRequired}
          tabIndex={tabIndex}
          value={value}
          onChange={change}
          onClick={onClick}
          onBlur={onBlur}
        />
      );
    }
    case "email": {
      const { value, onChange = NO_OPERATION } = props;
      const change = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value);
      };
      return (
        <EmailLayout
          ref={ref}
          className={className}
          style={style}
          id={id}
          type={props.type}
          autoComplete={autoComplete}
          required={isRequired}
          tabIndex={tabIndex}
          value={value}
          onChange={change}
          onClick={onClick}
          onBlur={onBlur}
        />
      );
    }
    case "password": {
      const { value, onChange = NO_OPERATION } = props;
      const change = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value);
      };
      return (
        <PasswordLayout
          ref={ref}
          className={className}
          style={style}
          id={id}
          type={props.type}
          autoComplete={autoComplete}
          required={isRequired}
          tabIndex={tabIndex}
          value={value}
          onChange={change}
          onClick={onClick}
          onBlur={onBlur}
        />
      );
    }
    case "color": {
      const { value, onChange = NO_OPERATION } = props;
      const change = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value);
      };
      return (
        <ColorLayout
          ref={ref}
          className={className}
          style={style}
          id={id}
          type={props.type}
          required={isRequired}
          tabIndex={tabIndex}
          value={value}
          onChange={change}
          onClick={onClick}
          onBlur={onBlur}
        />
      );
    }
    case "image": {
      const { value, onChange = NO_OPERATION } = props;
      const change = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value);
      };
      return (
        <ImageLayout
          ref={ref}
          className={className}
          style={style}
          id={id}
          type="file"
          required={isRequired}
          tabIndex={tabIndex}
          value={value}
          onChange={change}
          onClick={onClick}
          onBlur={onBlur}
        />
      );
    }
  }
});
