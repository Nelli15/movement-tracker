import {
  MembersObj,
  MemberWithParentData,
  SubTreeParentData,
} from "../models/members";
import {
  CalcCondition,
  CalcExpression,
  ComplexExpression,
  Stat,
  StatsObj,
  StylesObj,
  CalcNumber,
  CalcStyle,
  Style,
  RoleStyle,
  ModStyle,
  ComplexStyle,
  ComplexCondition,
} from "../models/styles";

const membersHelpers = require("./membersHelpers.js");

export function isStat(stat: Stat | string[]): stat is Stat {
  return !Array.isArray(stat as Stat);
}

export function isCalc(style: Style): style is CalcStyle {
  return (style as CalcStyle).type === "calc";
}

export function isComplex(style: Style): style is ComplexStyle {
  return (style as ComplexStyle).type === "complex";
}

export function isSubTreeParentData(
  subTreeParent: MemberWithParentData | SubTreeParentData
): subTreeParent is SubTreeParentData {
  return !!Array.isArray(subTreeParent as SubTreeParentData);
}

function isMember(
  member: MemberWithParentData | SubTreeParentData
): member is MemberWithParentData {
  return (member as MemberWithParentData).parent !== undefined;
}

// function buildTree(members, parentKey) {
//   // Takes a list of members and a parentKey and returns a tree of children for that parent along with all subsequent grand children
//   let children = [],
//     ii;
//   if (members[parentKey]) {
//     // Loop through each of the children for the current parent
//     for (ii in members[parentKey]) {
//       // Construct the next child to be added to the tree
//       const data = {
//         id: members[parentKey][ii].id,
//         children: buildTree(members, members[parentKey][ii].id)
//       };

//       // Check if the child if shadow member and set the alt flag
//       if (members[parentKey][ii].alt) data.alt = true;

//       // Add the new child to the tree
//       children.push(data);
//     }
//     // members[parentKey] = null
//   }
//   children = children
//     ? children.sort((a, b) => {
//         return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
//       })
//     : [];
//   return children;
// }

export function calcStats(styles: StylesObj, members: MembersObj): StatsObj {
  // calculates stats included in styles

  const stylesToUpdate: StatsObj = {};
  const memberList: MemberWithParentData[] = toArray(members);

  for (var key in styles) {
    if (key === undefined) {
      delete styles[key];
    }
    const style = styles[key];
    if (style.type !== "role" && style.type !== "mod") continue;
    stylesToUpdate[key] = calcStat(style, memberList);
  }
  return stylesToUpdate;
}

//  function calcTreeTotal(members: MembersObj) {
//   const stat = {
//     label: "Total on Tree",
//     desc: "Number of members in the main section of the Tree",
//     name: "Total on Tree",
//     total: 0,
//   };
//   members.forEach((member: MemberWithParentData) => {
//     if (member.origin === "root") stat.total++;
//   });
//   return stat;
// }

function calcStat(
  style: RoleStyle | ModStyle,
  members: MemberWithParentData[]
): Stat {
  // calculates a single stat
  // set the stat data at 0
  const stat: Stat = {
    id: style.id,
    total: 0,
    members: {},
  };
  for (const ind in members) {
    const member = members[ind];
    if (member.styles && member.styles.includes(style.id)) {
      stat.total += 1;
      stat.members[member.id] = true;
    }
  }
  return stat;
}

export function calcComplexStats(
  styles: StylesObj,
  members: MembersObj
): StatsObj {
  const membersWithOrigin = members;
  const stylesToUpdate: StatsObj = {};
  for (var statId in styles) {
    let style = styles[statId];

    if (style.type === "complex" && isComplex(style)) {
      let stat: Stat = {
        id: statId,
        total: 0,
        members: {},
      };
      // stat to calc found
      // loop through the members to check if they meet the conditions.
      for (var memberId in membersWithOrigin) {
        const member = membersWithOrigin[memberId];
        if (
          style.condition &&
          isMember(member) &&
          evalExpression(style.condition, memberId, membersWithOrigin) &&
          isStat(stylesToUpdate[statId])
        ) {
          // member passed all of the conditions add to total
          stat.total++;
          stat.members[memberId] = true;
        }
      }
      stylesToUpdate[statId] = stat;
    }
  }
  return stylesToUpdate;
}

function toArray(object: any) {
  if (!object) {
    return [];
  }
  if (Object.keys(object).length <= 0) {
    return [];
  }

  return Object.keys(object).map((i) => {
    return i !== "id" ? { ...object[i], id: i } : null;
  });
}

function evalExpression(
  expression: ComplexExpression,
  memberId: string,
  members: MembersObj
): boolean {
  // returns TRUE or FALSE
  if (expression.operator === "AND") {
    for (var condId in expression.elements) {
      let subEl = expression.elements[condId];
      if (subEl.class === "condition") {
        if (!evalCondition(subEl, memberId, members)) {
          return false;
        }
      } else if (subEl.class === "expression") {
        if (!evalExpression(subEl, memberId, members)) {
          return false;
        }
      }
    }
    return true;
  } else if (expression.operator === "OR") {
    for (var condId in expression.elements) {
      let subEl = expression.elements[condId];
      if (subEl.class === "condition") {
        if (evalCondition(subEl, memberId, members)) {
          return true;
        }
      } else if (subEl.class === "expression") {
        if (evalExpression(subEl, memberId, members)) {
          return true;
        }
      }
    }
    return false;
  }
  return false;
}

function evalCondition(
  cond: ComplexCondition,
  memberId: string,
  members: MembersObj
) {
  // Returns TRUE of FALSE
  const countOccurrences = (arr: string[]): { [index: string]: number } => {
    let occ: { [index: string]: number } = {};
    arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), occ);
    return occ;
  };

  const member = members[memberId];
  // if the member doesn't exist return false
  if (!member || isSubTreeParentData(member)) return false;
  if (cond.gen === "member") {
    // condition applies to the member
    // merge the styles to an array to easily search for them
    const styles = Array.isArray(member.styles) ? member.styles : [];
    if (cond.included && styles.includes(cond.id)) {
      // condition expects style to be included
      // condition met continue to member condition
      return true;
      // deepcode ignore DuplicateIfBody: <please specify a reason of ignoring this>
    } else if (!cond.included && !styles.includes(cond.id)) {
      // condition expects style to NOT be included
      // condition met continue to member condition
      return true;
    }
  } else if (cond.gen === "parent") {
    if (member.parent !== "root" && member.id !== "id") {
      const parent = members[member.parent];
      if (isSubTreeParentData(parent)) return false;
      const parentStyles = parent.styles;
      // [...parent.mods];

      // parentStyles.push(parent.role.id);
      if (cond.included && parentStyles.includes(cond.id)) {
        // condition expects style to be included
        // condition met continue to member condition
        return true;
        // deepcode ignore DuplicateIfBody: <please specify a reason of ignoring this>
      } else if (!cond.included && !parentStyles.includes(cond.id)) {
        // condition expects style to NOT be included
        // condition met continue to member condition
        return true;
      }
    }
  } else if (cond.gen === "children") {
    const membersByParent = membersHelpers.groupMembersByParent(
      toArray(members)
    );
    const children = membersByParent[memberId];
    const childrenStyles: string[] = [];
    for (var childId in children) {
      const child = members[children[childId].id];
      if (isSubTreeParentData(child)) continue;
      const subStyle = child.styles;
      //  = [...child.mods];
      // childrenStyles.push(child.role);
      for (var ii in subStyle) {
        childrenStyles.push(subStyle[ii]);
      }
    }

    const childStylesOccurences = countOccurrences(childrenStyles);
    if (
      cond.included &&
      childStylesOccurences[cond.id] &&
      childStylesOccurences[cond.id] >= (cond.number ? cond.number : 1)
    ) {
      // condition expects style to be included
      // condition met continue to member condition
      return true;
    } else if (
      !cond.included &&
      (toArray(children).length - childStylesOccurences[cond.id] >=
        (cond.number ? cond.number : 1) ||
        (!childStylesOccurences[cond.id] &&
          toArray(children).length >= (cond.number ? cond.number : 1)))
    ) {
      // condition expects style to NOT be included
      // condition met continue to member condition
      return true;
    }
  }
  return false;
}

export function calcCalculatedStats(
  styles: StylesObj,
  stats: StatsObj
): StatsObj {
  const stylesToUpdate: StatsObj = {};
  for (var statId in styles) {
    let style = styles[statId];
    if (style.type === "calc" && isCalc(style)) {
      let stat: Stat = { id: statId, total: 0, members: {} };
      stat.total = evalCalculated(style.condition, stats);
      stylesToUpdate[statId] = stat;
    }
  }
  return stylesToUpdate;
}

function evalCalculated(
  cond: CalcCondition | CalcExpression | CalcNumber,
  stats: StatsObj
): number {
  // if stats of condition is undefined
  if (!(cond && stats)) return 0;
  const values = [];

  // if this element describes an expression calculate the value
  if (cond.class === "expression") {
    //calculate all the child elements and return an array of values
    for (var el in cond.elements) {
      values.push(evalCalculated(cond.elements[el], stats));
    }
    if (values <= []) {
      // no child values return 0
      return 0;
    } else if (cond.operator === "plus") {
      return values.reduce((a, b) => a + b, 0);
    } else if (cond.operator === "minus") {
      return values.reduce((a, b) => a - b, 0);
    } else if (cond.operator === "multiply") {
      return values.reduce((a, b) => a * b);
    } else if (cond.operator === "divide") {
      return values.reduce((a, b) => a / b);
    }
  } else if (cond.class === "condition") {
    let stat = stats[cond.id];
    return parseInt(stat && isStat(stat) ? `${stat.total}` : "0");
  } else if (cond.class === "number") {
    return parseFloat(`${cond.value}`);
  }

  return 0;
}
