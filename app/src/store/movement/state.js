export default function () {
  return {
    movement: {
      id: '',
      role: { id: '', label: ''}
    },
    //members related
    members: {},
    memberList: {},
    // user related
    users: {},
    userRequests: {},
    userInvites: {},
    userRoleDefinitions: {},
    //styles
    roles: {},
    mods: {},
    complexStats: {},
    calcStats: {},
    stats: {},
    statTotals: {},
    statImports: [],
    //snapshots
    snapshots: {},
    // tree related
    trees: {},
    currentTree: {},
    roleSortCriteria: [],
    filterVisible: false,
    filterQuery: '',
    sortKey: '',
    //current user permissions
    permissions: {
      
    },
    listeners: [],
    currentTreeListeners:[],
    defaultTree: undefined
  }
}
