"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { CalculatorEngineConfig } from "@/lib/calculator/engineTypes";
import { DEFAULT_CALCULATOR_ENGINE } from "@/lib/fallback/calculatorEngine";
import { DEFAULT_SITE_CONTENT } from "@/lib/fallback/siteContentDefaults";
import type { SiteContentData } from "@/lib/siteContent.types";

type Value = {
  siteContent: SiteContentData;
  calculatorEngine: CalculatorEngineConfig;
};

const AppContentContext = createContext<Value | null>(null);

type Props = {
  children: ReactNode;
  siteContent: SiteContentData;
  calculatorEngine: CalculatorEngineConfig;
};

export function AppContentProvider({ children, siteContent, calculatorEngine }: Props) {
  const value = useMemo(
    () => ({ siteContent, calculatorEngine }),
    [siteContent, calculatorEngine],
  );
  return <AppContentContext.Provider value={value}>{children}</AppContentContext.Provider>;
}

export function useAppContent(): Value {
  const v = useContext(AppContentContext);
  if (!v) {
    return {
      siteContent: DEFAULT_SITE_CONTENT,
      calculatorEngine: DEFAULT_CALCULATOR_ENGINE,
    };
  }
  return v;
}
