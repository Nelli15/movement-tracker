const membersHelpers = require("./membersHelpers.js");

function buildTree(members, parentKey) {
  // Takes a list of members and a parentKey and returns a tree of children for that parent along with all subsequent grand children
  let children = [],
    ii;
  if (members[parentKey]) {
    // Loop through each of the children for the current parent
    for (ii in members[parentKey]) {
      // Construct the next child to be added to the tree
      const data = {
        id: members[parentKey][ii].id,
        children: buildTree(members, members[parentKey][ii].id)
      };

      // Check if the child if shadow member and set the alt flag
      if (members[parentKey][ii].alt) data.alt = true;

      // Add the new child to the tree
      children.push(data);
    }
    // members[parentKey] = null
  }
  children = children
    ? children.sort((a, b) => {
        return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      })
    : [];
  return children;
}

exports.calcStats = function(styles, members) {
  // calculates stats included in styles

  const statsToUpdate = {};
  const memberList = toArray(members);

  for (var key in styles) {
    if(key === undefined) {delete styles[key]}
    const style = styles[key];
    statsToUpdate[key] = calcStat(style, memberList);
  }
  return statsToUpdate;
};

function calcTreeTotal(members) {
  const stat = {
    label: "Total on Tree",
    desc: "Number of members in the main section of the Tree",
    name: "Total on Tree",
    total: 0
  };
  members.forEach(member => {
    if (member.origin === "root") stat.total++;
  });
  return stat;
}

function calcStat(style, members) {
  // calculates a single stat
  if (style.type !== "role" && style.type !== "mod") return style;
  // set the stat data at 0
  const stat = {
    id: style.id,
    total: 0,
    members: {}
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

exports.calcComplexStats = function(stats, members) {
  const membersWithOrigin = members;
  const statsToUpdate = {};
  for (var statId in stats) {
    if (stats[statId].type === "complex") {
      // console.log(stats[statId])
      statsToUpdate[statId] = stats[statId];
      // console.log('found a calc stat', stat)
      statsToUpdate[statId].members = {};
      statsToUpdate[statId].total = 0;
      // stat to calc found
      // loop through the members to check if they meet the conditions.
      for (var memberId in membersWithOrigin) {
        const member = membersWithOrigin[memberId];
        // console.log(
        //   member.id,
        //   evalExpression(stats[statId].condition, member.id, membersWithOrigin),
        //   stats[statId].condition &&
        //     evalExpression(
        //       stats[statId].condition,
        //       member.id,
        //       membersWithOrigin
        //     )
        // );
        if (
          stats[statId].condition &&
          evalExpression(stats[statId].condition, member.id, membersWithOrigin)
        ) {
          // member passed all of the conditions add to total
          statsToUpdate[statId].total++;
          statsToUpdate[statId].members[member.id] = true;
        }
      }
    }
  }
  return statsToUpdate;
};

function toArray(object) {
  if (!object) {
    return [];
  }
  if (Object.keys(object).length <= 0) {
    return [];
  }

  return Object.keys(object).map(i => {return i !== 'id' ? {...object[i], id: i} : null});

}

function evalExpression(expression, memberId, members) {
  // returns TRUE or FALSE
  if (expression.operator === "AND") {
    for (var condId in expression.elements) {
      if (expression.elements[condId].class === "condition") {
        if (!evalCondition(expression.elements[condId], memberId, members)) {
          return false;
        }
      } else if (expression.elements[condId].class === "expression") {
        if (!evalExpression(expression.elements[condId], memberId, members)) {
          return false;
        }
      }
    }
    return true;
  } else if (expression.operator === "OR") {
    for (var condId in expression.elements) {
      if (expression.elements[condId].class === "condition") {
        if (evalCondition(expression.elements[condId], memberId, members)) {
          return true;
        }
      } else if (expression.elements[condId].class === "expression") {
        if (evalExpression(expression.elements[condId], memberId, members)) {
          return true;
        }
      }
    }
    return false;
  }
}

function evalCondition(cond, memberId, members) {
  // Returns TRUE of FALSE
  const countOccurrences = arr => {
    const occ = arr.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      {}
    );
    return occ;
  };

  const member = members[memberId];
  // if the member doesn't exist return false
  if (!member) return false;
  if (cond.gen === "member") {
    // condition applies to the member
    // merge the styles to an array to easily search for them
    const styles = member.styles ? member.styles : [];
    //   member && member.mods ? [...member.mods] : [];
    // styles.push(member.role);

    if (cond.included && styles.includes(cond.id)) {
      // condition expects style to be included
      // condition met continue to member condition
      return true;
    } else if (!cond.included && !styles.includes(cond.id)) {
      // condition expects style to NOT be included
      // condition met continue to member condition
      return true;
    }
  } else if (cond.gen === "parent") {
    if (member.parent !== "root" && member.id !== 'id') {
      
      const parent = members[member.parent];
      // if(!parent) console.log(member)
      // console.log(parent, members)
      const parentStyles = parent.styles;
      // [...parent.mods];

      // parentStyles.push(parent.role.id);
      if (cond.included && parentStyles.includes(cond.id)) {
        // condition expects style to be included
        // condition met continue to member condition
        return true;
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
    const childrenStyles = [];
    for (var childId in children) {
      const child = members[children[childId].id];
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
          toArray(children).length >= cond.number))
    ) {
      // condition expects style to NOT be included
      // condition met continue to member condition
      return true;
    }
  }
  return false;
}

exports.calcCalculatedStats = function(stats) {
  const statsToUpdate = {};
  for (var statId in stats) {
    if (stats[statId].type === "calc") {
      statsToUpdate[statId] = stats[statId];
      statsToUpdate[statId].total = evalCalculated(
        stats[statId].condition,
        stats
      );
    }
  }
  return statsToUpdate;
};

function evalCalculated(cond, stats) {
  if (!(cond && stats)) return 0;
  const values = [];
  if (cond.class === "expression") {
    for (var el in cond.elements) {
      values.push(evalCalculated(cond.elements[el], stats));
    }
    if (values <= []) {
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
    return parseInt(stats[cond.id] ? stats[cond.id].total : 0);
  } else if (cond.class === "number") {
    return parseFloat(cond.value);
  }

  return 0;
}
