import { mainButton } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';

type Props = {
  text: string;
  onClick: () => void;
  isEnabled?: boolean;
  isVisible?: boolean;
};

export const useMainButton = ({ text, onClick, isEnabled = true }: Props) => {

  useEffect(() => {
    mainButton.onClick(onClick);
    mainButton.setParams({
      isEnabled,
      isVisible: true,
      text: text.toUpperCase(),
      backgroundColor: '#0098EA',
      textColor: '#ffffff',
    });

    return () => {
      mainButton.offClick(onClick);
    };
  }, [isEnabled, text, onClick]);

  return mainButton;
};
