import { default as DeviceSizeProvider } from "./deviceSize";
import { default as VariablesProvider } from "./variables";
import { default as AudioProvider } from "./audio";

export default function AppProvider({ children }: IProvidersProps) {
  return (
    <DeviceSizeProvider>
      <VariablesProvider>
        <AudioProvider>{children}</AudioProvider>
      </VariablesProvider>
    </DeviceSizeProvider>
  );
}
