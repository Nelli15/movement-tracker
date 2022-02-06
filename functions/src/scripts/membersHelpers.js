exports.groupMembersByParent = function(members) {
  // takes an array of members and returns them grouped by their parent key
  const membersByParent = {};
  for (const ii in members) {
    if (!membersByParent[members[ii].parent]) {
      membersByParent[members[ii].parent] = [];
    }
    membersByParent[members[ii].parent].push({
      parent: members[ii].parent,
      id: members[ii].id
    });
    if (members[ii].alt) {
      if (!membersByParent[members[ii].alt]) {
        membersByParent[members[ii].alt] = [];
      }
      membersByParent[members[ii].alt].push({
        parent: members[ii].parent,
        id: members[ii].id,
        alt: true
      });
    }
  }
  return membersByParent;
};

exports.getMembersOrigins = function(members, origin) {
  // returns the members with the origin of the member included in the .origin key
  let currentMember;
  let watchdog;
  let member;
  const toObject = (array, key) =>
    array.reduce(
      (obj, item) => ({
        ...obj,
        [item[key]]: item
      }),
      {}
    );
  if (Array.isArray(members)) {
    members = toObject(members, "id");
  }
  // console.log(Array.isArray(members), members)
  for (var key in members) {
    member = members[key];
    const memberId = member.id;
    watchdog = 0;
    currentMember = members[memberId];
    while (currentMember.parent !== origin && watchdog < 5000) {
      let path = memberId;
      tempMember = members[currentMember.parent];
      path = currentMember.parent + "/" + path;
      if (!tempMember) {
        currentMember.parent = "No Parent";
      } else {
        currentMember = tempMember;
      }
      if (path.indexOf(currentMember.parent) !== -1) {
        console.error(
          new Error(
            "Infinite loop found: moving" +
              currentMember.name +
              "to --No Parent--!"
          )
        );
        // admin.analytics().logEvent('exception', { description: 'Infinite loop found: moving' + currentMember.name + 'to --No Parent--!', fatal: false })
        watchdog = 5000;
      }
      watchdog++;
    }
    members[memberId].origin = currentMember.parent;
  }
  return members;
};

exports.getMemberStylesData = async function(member, movRef, styles) {
  // get all of the related styles as needed
  const all = [];
  const memberStyles = Array.isArray(member.mods) ? member.mods.slice(0) : [];
  memberStyles.push(member.role);

  for (var style of memberStyles) {
    const styleId = style ? (style.id ? style.id : style) : null;
    if (styleId && !all.includes(styleId)) {
      all.push(
        movRef
          .collection("styles")
          .doc(styleId)
          .get()
      );
    }
  }
  const stylesDocs = await Promise.all(all).catch(err => {
    console.error(new Error("Oops, something went wrong: " + err));
  });
  // console.log(stylesDocs)
  stylesDocs.forEach(doc => {
    if (doc.exists) {
      const data = doc.data();
      data.id = doc.id;
      styles[doc.id] = data;
    }
  });
  return styles;
};

// The following functions are duplicates of ./src/scripts/member.js
exports.getDisplayData = async function(member, styles) {
  // console.log('styles', member, styles)
  // determine appropriate styles
  member.display = {
    label: getLabel(member, styles),
    background: getBackground(member, styles),
    color: getColor(member, styles),
    outline: getOutline(member, styles),
    underline: checkUnderline(member, styles),
    shape: checkShape(member, styles)
  };
  return member;
};

const getBackground = function(member, styles) {
  // set background color

  if (member.mods) {
    if (!Array.isArray(member.mods)) {
      member.mods = [member.mods];
    }
    for (var key in member.mods) {
      if (typeof styles[member.mods[key]] === "object") {
        if (styles[member.mods[key]].style) {
          if (styles[member.mods[key]].style.backgroundOverride === true) {
            return styles[member.mods[key]].style.background;
          }
        }
      }
    }
  }
  if (member.role > "") {
    if (typeof styles[member.role] === "object") {
      if (styles[member.role].style) {
        return styles[member.role].style.background;
      }
    }
  }
  return "white";
};
exports.getBackground = getBackground;

const getColor = function(member, styles) {
  // set text color
  if (!Array.isArray(member.mods)) {
    member.mods = [member.mods];
  }
  for (var key in member.mods) {
    if (typeof styles[member.mods[key]] === "object") {
      if (styles[member.mods[key]].style.colorOverride === true) {
        return styles[member.mods[key]].style.color;
      }
    }
  }
  if (member.role > "") {
    if (typeof styles[member.role] === "object") {
      return styles[member.role].style.color;
    }
  }
  return "black";
};
exports.getColor = getColor;

const getOutline = function(member, styles) {
  // set border color
  if (!Array.isArray(member.mods)) {
    member.mods = [member.mods];
  }
  for (var key in member.mods) {
    if (typeof styles[member.mods[key]] === "object") {
      if (styles[member.mods[key]].style.outlineOverride === true) {
        return styles[member.mods[key]].style.outline;
      }
    }
  }
  if (member.role && member.role > "") {
    if (typeof styles[member.role] === "object") {
      return styles[member.role].style.outline;
    }
  }
  return "white";
};
exports.getOutline = getOutline;

const checkUnderline = function(member, styles) {
  if (!Array.isArray(member.mods)) {
    member.mods = [member.mods];
  }
  for (var key in member.mods) {
    if (typeof styles[member.mods[key]] === "object") {
      if (styles[member.mods[key]].style.underlineOverride === true) {
        return styles[member.mods[key]].style.underline;
      }
    }
  }
  if (member.role && member.role > "") {
    if (typeof styles[member.role] === "object") {
      return styles[member.role].style.underline;
    }
  }
  return false;
};
exports.checkUnderline = checkUnderline;

const checkShape = function(member, styles) {
  if (!Array.isArray(member.mods)) {
    member.mods = [member.mods];
  }
  for (var key in member.mods) {
    if (typeof styles[member.mods[key]] === "object") {
      if (styles[member.mods[key]].style.shapeOverride === true) {
        if (styles[member.mods[key]].style.shape) {
          return styles[member.mods[key]].style.shape;
        }
      }
      if (styles[member.mods[key]].style.roundOverride === true) {
        if (styles[member.mods[key]].style.round === true) {
          return "round";
        }
      }
    }
  }
  if (member.role && member.role > "") {
    if (typeof styles[member.role] === "object") {
      if (styles[member.role].style.shape) {
        return styles[member.role].style.shape;
      }
      if (styles[member.role].style.round) {
        return "round";
      }
    }
  }
  return "not-round";
};
exports.checkShape = checkShape;

const getLabel = function(member, styles) {
  var res = "";
  // if override styles is not an array make it one
  if (member.mods && !Array.isArray(member.mods)) {
    member.mods = [member.mods];
  }
  let spaceAdded = false;
  for (var key in member.mods) {
    if (typeof styles[member.mods[key]] === "object") {
      if (styles[member.mods[key]].icon > "") {
        if (styles[member.mods[key]].style.prepend === true) {
          // if (!spaceAdded) {
          //   res += " ";
          //   spaceAdded = true;
          // }
          res += `[${styles[member.mods[key]].icon}]`;
        }
      }
    }
  }
  if (res > "") res += " ";
  res += member.name;
  spaceAdded = false;
  for (key in member.mods) {
    if (typeof styles[member.mods[key]] === "object") {
      if (styles[member.mods[key]].icon > "") {
        if (!styles[member.mods[key]].style.prepend) {
          if (!spaceAdded) {
            res += " ";
            spaceAdded = true;
          }
          res += `[${styles[member.mods[key]].icon}]`;
        }
      }
    }
  }
  return res;
};
exports.getLabel = getLabel;
