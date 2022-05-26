export interface MemberWithParentData {
  id: string;
  name?: string;
  parent: string;
  shadow?: [];
  type: "normal" | "shadow" | "subtree";
  styles: string[];
}
export interface SubTreeParentData {
  id: string;
  subTreeParent: string;
}

export interface MembersObj {
  [index: string]: MemberWithParentData | SubTreeParentData;
}

export interface MembersByParent {
  [index: string]: {
    id: string;
    parent: string;
    shadow?: [];
    type: "normal" | "shadow" | "subtree";
  }[];
}

export interface TreeNode {
  id: string;
  key: string;
  parent: string;
  type: "normal" | "shadow" | "subtree";
  children: TreeNode[];
}
