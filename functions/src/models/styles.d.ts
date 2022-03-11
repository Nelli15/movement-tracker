export interface RoleStyle {
  id: string;
  type: "role";
  desc: string;
  style: {
    background: string;
    backgroundOverride?: boolean;
    color: string;
    colorOverride?: boolean;
    outline: string;
    outlineOverride?: boolean;
    prepend: boolean;
    round: boolean;
    underline: boolean;
  };
  target: number;
}

export interface ModStyle {
  id: string;
  type: "mod";
  label: string;
  desc: string;
  icon?: string;
  style: {
    background: string;
    backgroundOverride?: boolean;
    color: string;
    colorOverride?: boolean;
    outline: string;
    outlineOverride?: boolean;
    prepend: boolean;
    round: boolean;
    underline: boolean;
  };
  target: number;
}
export interface CalcStyle {
  id: string;
  type: "calc";
  label: string;
  desc: string;
  target: number;
  unit: string;
  condition: CalcExpression;
}
export interface ComplexStyle {
  id: string;
  type: "complex";
  label: string;
  desc: string;
  target: number;
  condition?: ComplexExpression;
}

export type Style = RoleStyle | ModStyle | CalcStyle | ComplexStyle;

export interface StylesObj {
  [index: string]: Style;
}
export interface Stat {
  id: string;
  total: number;
  members: {
    [index: string]: boolean;
  };
}

export interface StatsObj {
  [index: string]: Stat | string[];
}

export interface CalcExpression {
  class: "expression";
  elements: CalcExpression[];
  operator: "plus" | "minus" | "multiply" | "divide";
}

export interface CalcCondition {
  id: string;
  class: "condition";
}

export interface CalcNumber {
  value: number | string;
  class: "number";
}

export interface ComplexExpression {
  operator: "AND" | "OR";
  class: "expression";
  elements: (ComplexExpression | ComplexCondition)[];
}

export interface ComplexCondition {
  class: "condition";
  gen: "member" | "parent" | "children";
  id: string;
  included: boolean;
  number?: number;
}
