import { default as DeviceSizeProvider } from "./deviceSize";
import { default as VariablesProvider } from "./variables";
import { default as AudioProvider } from "./audio";
import { ConfettiProvider } from "./confetti";

export default function AppProvider({ children }: IProvidersProps) {
  return (
    <DeviceSizeProvider>
      <VariablesProvider>
        <AudioProvider>
          <ConfettiProvider>{children}</ConfettiProvider>
        </AudioProvider>
      </VariablesProvider>
    </DeviceSizeProvider>
  );
}
