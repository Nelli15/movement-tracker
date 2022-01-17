const admin = require("../../../utils/test-admin");
const environment = require("../../../environments/environment.test.js");
const context = {
  admin,
  environment
};

const Func = require("../create.js");
const db = admin.firestore();

const movCol = db.collection(environment.schema.movements);

describe("movements: create", () => {
  let func;
  let funcContext;
  let data;

  beforeEach(async () => {
    func = Func(context);
    funcContext = {
      auth: {
        uid: "testUserId",
        token: {
          name: "test user",
          email: "test@user.com"
        }
      }
    };
  });

  it("should create a movement doc", async () => {
    // 
    const date = admin.firestore.Timestamp.fromDate(new Date());

    // run the function
    const response = await func(data, funcContext);
    //get the movement doc
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .get();
      // get the data from the doc
    const output = doc.data();

    
    expect(doc.id).toBe(response.movId);
    expect(output.name).toBe("Untitled Movement");
    expect(output.last_modified._seconds).toBeGreaterThanOrEqual(date._seconds);
  });

  it("should create a user role doc", async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("users")
      .doc(response.roleDoc)
      .get();
    const output = doc.data();
    expect(doc.id).toBe(funcContext.auth.uid);
    expect(output.uid).toBe(funcContext.auth.uid);
    expect(output.name).toBe(funcContext.auth.token.name);
    expect(output.email).toBe(funcContext.auth.token.email);
    expect(output.role).toBe("owner");
  });

  it("should create an example role", async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("styles")
      .doc("example-role")
      .get();
    const output = doc.data();
    expect(output).toStrictEqual({
      label: "Example Role",
      desc:
        "This is a Role. Each Member of the Movement must have a role applied to it. Create/Edit/Delete Roles in the Role tab on the Settings page.",
      type: "role",
      style: {
        background: "#ffffff",
        color: "#000000",
        outline: "#ffffff",
        shape: "not-round",
        underline: false
      }
    });
  });

  it("should create an example modifier", async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("styles")
      .doc("example-mod")
      .get();
    const output = doc.data();
    expect(output).toStrictEqual({
      label: "Example Modifier",
      desc:
        "This is a Modifier (Optional). Each Member of the Movement can have multiple Modifiers applied to it. Create/Edit/Delete Modifiers in the Modifiers tab on the Settings page. The Modifiers override the default styling of a Member's Role. They provide an easy way to tag Members with simple information. Be careful when setting up your modifiers, a Member with multiple conflicting Modifiers will use the first Modifier that overrides a particular element of a Member's style. Having conflicting styles may cause a Member's style to be inconsistant and unpredictable.",
      type: "mod",
      style: {
        background: "#ffffff",
        backgroundOverride: false,
        color: "#000000",
        colorOverride: false,
        outline: "#ffffff",
        outlineOverride: false,
        shape: "not-round",
        shapeOverride: false,
        underline: false,
        underlineOverride: false,
        prepend: false
      }
    });
  });

  it("should create an example complex statistic", async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("styles")
      .doc("example-complex")
      .get();
    const output = doc.data();
    expect(output).toStrictEqual({
      label: "Example Complex Statistic",
      desc:
        "This is a Complex Statistic. Each Role and Modifier automatically counts the number of Members with the Role or Modifier. The Compex Statistic allows you to define a theoretical Member of the Movement and then find and count the number of times that the theoretical Member exists in the Movement. Create/Edit/Delete Complex Statistics in the Complex tab on the Settings page.",
      type: "complex",
      condition: {
        class: "expression",
        elements: [
          {
            gen: "member",
            class: "condition",
            id: "example-role",
            included: true
          },
          {
            gen: "member",
            class: "condition",
            id: "example-mod",
            included: false
          }
        ],
        operator: "AND"
      }
    });
  });

    it("should create an example calculated statistic", async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("styles")
      .doc("example-calc")
      .get();
    const output = doc.data();
    expect(output).toStrictEqual({
      label: "Example Calculated Statistic",
      desc:
        "This is a Calculated Statistic. The Calculted Statistic allows you to matematically calculate statistics based on real time Role|Modifier|Complex values. Create/Edit/Delete Calculated Statistics in the Calculated tab on the Settings page.",
      type: "calc",
      condition: {
         class: "expression",
         elements: [
           {
             class: "expression",
             elements: [
               {
                 class: "condition",
                 id: "example-complex",
               },
               {
                 class: "condition",
                 id: "treeTotal",
               },
             ],
             operator: "divide",
           },
           {
             class: "number",
             value: "100",
           },
         ],
         operator: "multiply",
       }
    });
  });

  it("should create an example root member", async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("members")
      .doc("example-member")
      .get();
    const output = doc.data();
    expect(output).toStrictEqual({
      name: "Example Member",
      role: "example-role",
      mods: ["example-mod"],
      notes:
        "This is a Member of the Movement who is a first level Member of the Movement",
        trees: [
         "main-tree",
       ],
    });
  });

  it("should create an example member with a parent", async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("members")
      .doc("example-parent-member")
      .get();
    const output = doc.data();
    expect(output).toStrictEqual({
      name: "Example Member with Parent",
      role: "example-role",
      mods: [],
      notes:
        "This is a Member of the Movement who is connected to the Movement through another Member of the Movement (aka Parent).",
        trees: [
         "main-tree",
       ],
    });
  });

  it("should create an example member without a parent", async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("members")
      .doc("example-no-parent-member")
      .get();
    const output = doc.data();

    expect(output).toStrictEqual({
      name: "Example No Parent Member",
      role: "example-role",
      mods: [],
      notes:
        "This is a Member of the Movement who is not a first level Member of the Movement but also doesn't have a parent who is in the Movement.",
        trees: [
         "noParents",
       ],
    });
  });

  it('should create an owner definition doc', async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("user-role-definitions")
      .doc("owner")
      .get();
    const output = doc.data();

    expect(output).toStrictEqual({
    label: "Owner",
    rules: {
      snapshots_view: true,
      snapshots_update: true,
      events_create: true,
      members_create: true,
      members_export: true,
      members_edit: true,
      members_delete: true,
      members_view: true,
      subTrees_add: true,
      subTrees_remove: true,
      movement_edit: true,
      movement_copy: true,
      movement_carbonCopy: true,
      movement_delete: true,
      trends_view: true,
      trends_movementGraphs_create: true,
      trends_movementGraphs_delete: true,
      trends_movementGraphs_view: true,
      access_view: true,
      access_users_revoke: true,
      access_users_invite: true,
      access_userRoles_create: true,
      access_userRoles_delete: true,
      access_userRoles_edit: true,
      trees_create: true,
      trees_export: true,
      trees_delete: true,
      trees_view: true,
      settings_view: true,
      settings_calc_view: true,
      settings_calc_create: true,
      settings_calc_edit: true,
      settings_calc_delete: true,
      settings_complex_view: true,
      settings_complex_create: true,
      settings_complex_delete: true,
      settings_complex_edit: true,
      settings_mods_view: true,
      settings_mods_create: true,
      settings_mods_delete: true,
      settings_mods_edit: true,
      settings_roles_view: true,
      settings_roles_create: true,
      settings_roles_delete: true,
      settings_roles_edit: true
    }});
  });
  it('should create a super editor definition doc', async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("user-role-definitions")
      .doc("superEditor")
      .get();
    const output = doc.data();

    expect(output).toStrictEqual({
    label: "Super Editor",
    rules: {
      snapshots_view: true,
      snapshots_update: true,
      events_create: true,
      members_create: true,
      members_export: true,
      members_edit: true,
      members_delete: true,
      members_view: true,
      subTrees_add: true,
      subTrees_remove: true,
      movement_edit: true,
      movement_copy: true,
      movement_carbonCopy: true,
      movement_delete: false,
      trends_view: true,
      trends_movementGraphs_create: true,
      trends_movementGraphs_delete: true,
      trends_movementGraphs_view: true,
      access_view: true,
      access_users_revoke: true,
      access_users_invite: true,
      access_userRoles_create: true,
      access_userRoles_delete: true,
      access_userRoles_edit: true,
      trees_create: true,
      trees_export: true,
      trees_delete: true,
      trees_view: true,
      settings_view: true,
      settings_calc_view: true,
      settings_calc_create: true,
      settings_calc_edit: true,
      settings_calc_delete: true,
      settings_complex_view: true,
      settings_complex_create: true,
      settings_complex_delete: true,
      settings_complex_edit: true,
      settings_mods_view: true,
      settings_mods_create: true,
      settings_mods_delete: true,
      settings_mods_edit: true,
      settings_roles_view: true,
      settings_roles_create: true,
      settings_roles_delete: true,
      settings_roles_edit: true
    }
  });
  });
  it('should create an editor definition doc', async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("user-role-definitions")
      .doc("editor")
      .get();
    const output = doc.data();

    expect(output).toStrictEqual({
    label: "Editor",
    rules: {
      snapshots_view: true,
      snapshots_update: false,
      events_create: true,
      members_create: true,
      members_export: false,
      members_edit: true,
      members_delete: false,
      members_view: true,
      subTrees_add: true,
      subTrees_remove: true,
      movement_edit: true,
      movement_copy: true,
      movement_carbonCopy: false,
      movement_delete: false,
      trends_view: true,
      trends_movementGraphs_create: false,
      trends_movementGraphs_delete: false,
      trends_movementGraphs_view: true,
      access_view: true,
      access_users_revoke: false,
      access_users_invite: false,
      access_userRoles_create: false,
      access_userRoles_delete: false,
      access_userRoles_edit: false,
      trees_create: true,
      trees_export: false,
      trees_delete: false,
      trees_view: true,
      settings_view: true,
      settings_calc_view: true,
      settings_calc_create: false,
      settings_calc_edit: false,
      settings_calc_delete: false,
      settings_complex_view: true,
      settings_complex_create: false,
      settings_complex_delete: false,
      settings_complex_edit: false,
      settings_mods_view: true,
      settings_mods_create: false,
      settings_mods_delete: false,
      settings_mods_edit: false,
      settings_roles_view: true,
      settings_roles_create: false,
      settings_roles_delete: false,
      settings_roles_edit: false
    }
  });
  });
  it('should create a viewer definition doc', async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("user-role-definitions")
      .doc("viewer")
      .get();
    const output = doc.data();

    expect(output).toStrictEqual({
    label: "Viewer",
    rules: {
      snapshots_view: true,
      snapshots_update: false,
      events_create: false,
      members_create: false,
      members_export: false,
      members_edit: false,
      members_delete: false,
      members_view: true,
      subTrees_add: false,
      subTrees_remove: false,
      movement_edit: false,
      movement_copy: false,
      movement_carbonCopy: false,
      movement_delete: false,
      trends_view: true,
      trends_movementGraphs_create: false,
      trends_movementGraphs_delete: false,
      trends_movementGraphs_view: false,
      access_view: true,
      access_users_revoke: false,
      access_users_invite: false,
      access_userRoles_create: false,
      access_userRoles_delete: false,
      access_userRoles_edit: false,
      trees_create: false,
      trees_export: false,
      trees_delete: false,
      trees_view: true,
      settings_view: true,
      settings_calc_view: true,
      settings_calc_create: false,
      settings_calc_edit: false,
      settings_calc_delete: false,
      settings_complex_view: true,
      settings_complex_create: false,
      settings_complex_delete: false,
      settings_complex_edit: false,
      settings_mods_view: true,
      settings_mods_create: false,
      settings_mods_delete: false,
      settings_mods_edit: false,
      settings_roles_view: true,
      settings_roles_create: false,
      settings_roles_delete: false,
      settings_roles_edit: false
    }
  });
  });

  it('should create a member list doc', async () => {
    const response = await func(data, funcContext);
    const doc = await db
      .collection(environment.schema.movements)
      .doc(response.movId)
      .collection("lists")
      .doc("members")
      .get();
    const output = doc.data();

    expect(output).toStrictEqual({
      "example-member": {
        id: "example-member",
        name: "Example Member"
      },
      "example-no-parent-member": {
        id: "example-no-parent-member",
        name: "Example No Parent Member"
      },
      "example-parent-member": {
        id: "example-parent-member",
        name: "Example Member with Parent"
      }

    });
  });
  it.todo('should create a styles list doc');
  it.todo('should create a trees list doc');

  describe('should create a main tree', () => {
    it.todo('should create a tree doc');
    it.todo('should create a parents component doc');
    it.todo('should create a stats component doc');
    it.todo('should create a tree component doc');
  });

  describe('should create a no parent tree', () => {
    it.todo('should create a tree doc');
    it.todo('should create a parents component doc');
    it.todo('should create a stats component doc');
    it.todo('should create a tree component doc');
  });


  afterAll(async () => {
    // delete all data from db
    // await nowRef.delete()
    // console.log(movDoc)
    // if (movDoc) await movDoc.delete()
    const col = await movCol.get();
    col.forEach(doc => {
      doc.ref.delete();
    });
    // console.log(await movCol.listDocuments())
    // const movements = await movCol.listDocuments()
    // console.log(movements)
    //
    // await styleRef.delete()
  });
});
