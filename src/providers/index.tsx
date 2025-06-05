import { default as DeviceSizeProvider } from "./deviceSize";
import { default as VariablesProvider } from "./variables";

export default function AppProvider({ children }: IProvidersProps) {
  return (
    <DeviceSizeProvider>
      <VariablesProvider>{children}</VariablesProvider>
    </DeviceSizeProvider>
  );
}
