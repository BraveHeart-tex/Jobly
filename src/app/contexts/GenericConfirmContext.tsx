"use client";

import { createContext, useContext, useState } from "react";

type ConfirmParams = {
  title: string;
  message: string;
  primaryAction: Function;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  customElement?: JSX.Element | null;
  secondaryAction?: Function;
};

interface IGenericConfirmContext {
  visible: boolean;
  title: string;
  message: string;
  primaryAction: Function | null;
  secondaryAction: Function | null;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  customElement: JSX.Element | null;
  cleanUp: () => void;
  showGenericConfirm: (
    {
      title,
      message,
      primaryActionLabel,
      secondaryActionLabel,
      customElement,
      primaryAction,
      secondaryAction,
    }: ConfirmParams,
    resolveCallback?: Function
  ) => void;
  callPrimaryAction: () => void;
}

const GenericConfirmContext = createContext<IGenericConfirmContext>({
  visible: false,
  title: "",
  message: "",
  primaryAction: () => {},
  secondaryAction: () => {},
  primaryActionLabel: "",
  secondaryActionLabel: "",
  customElement: null,
  cleanUp: () => {},
  showGenericConfirm: ({
    title,
    message,
    primaryActionLabel,
    secondaryActionLabel,
    customElement,
    primaryAction,
    secondaryAction,
  }: ConfirmParams) => {},
  callPrimaryAction: () => {},
});

export const useGenericConfirm = () => {
  return useContext(GenericConfirmContext);
};

export const GenericConfirmContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [primaryActionLabel, setPrimaryActionLabel] = useState("");
  const [secondaryActionLabel, setSecondaryActionLabel] = useState("");
  const [customElement, setCustomElement] = useState<JSX.Element | null>(null);
  const [primaryAction, setPrimaryAction] = useState<(() => Promise<any>) | null>(null);
  const [secondaryAction, setSecondaryAction] = useState<Function | null>(null);
  const [resolvePrimaryAction, setResolvePrimaryAction] = useState<Function | null>(null);
  const [primaryActionResult, setPrimaryActionResult] = useState(null);

  const cleanUp = () => {
    setVisible(false);
    setTitle("");
    setMessage("");
    setPrimaryActionLabel("");
    setSecondaryActionLabel("");
    setCustomElement(null);
    setPrimaryAction(null);
    setSecondaryAction(null);
  };

  const showGenericConfirm = (
    {
      title,
      message,
      primaryActionLabel,
      secondaryActionLabel,
      customElement,
      primaryAction,
      secondaryAction,
    }: ConfirmParams,
    resolveCallback?: Function
  ) => {
    setVisible(true);
    setTitle(title);
    setMessage(message);
    setPrimaryActionLabel(primaryActionLabel);
    setPrimaryAction(() => async () => {
      const result = await primaryAction();
      setPrimaryActionResult(result);
      cleanUp();
      if (resolveCallback) {
        resolveCallback(result);
      }
    });
    if (secondaryActionLabel) {
      setSecondaryActionLabel(secondaryActionLabel);
    }
    if (customElement) {
      setCustomElement(customElement);
    }
    if (secondaryAction) {
      setSecondaryAction(secondaryAction);
    }

    return new Promise((resolve) => {
      setResolvePrimaryAction(resolve);
    });
  };

  const callPrimaryAction = async () => {
    if (primaryAction) {
      await primaryAction();
    }
  };

  const value: IGenericConfirmContext = {
    visible,
    title,
    message,
    primaryActionLabel,
    secondaryActionLabel,
    customElement,
    cleanUp,
    showGenericConfirm,
    primaryAction,
    secondaryAction,
    callPrimaryAction,
  };

  return <GenericConfirmContext.Provider value={value}>{children}</GenericConfirmContext.Provider>;
};
