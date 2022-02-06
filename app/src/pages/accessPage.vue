<template>
  <div>
    <q-drawer
      show-if-above
      mini
      :width="200"
      :breakpoint="1"
      bordered
      style="background-color: #c54210; color: white"
    >
      <q-scroll-area style="height: calc(100vh - 60px)">
        <q-list padding>
          <q-item
            clickable
            v-ripple
            @click="addUserRoleDefinition"
            v-if="permissions.access_userRoles_invite"
          >
            <q-item-section avatar>
              <q-icon name="person_add" />
            </q-item-section>

            <q-item-section>Create User Role</q-item-section>
            <q-tooltip
              class="bg-accent text-grey-10"
              anchor="center right"
              self="center left"
              >Create User Role</q-tooltip
            >
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page>
      <q-scroll-area style="height: calc(100vh - 50px); max-width: 100%">
        <q-tabs
          v-model="tab"
          dense
          indicator-color="yellow"
          class="bg-primary text-white shadow-2"
          inline-label
        >
          <q-tab
            name="userInvites"
            label="Invite"
            v-if="permissions.access_users_invite"
            data-cy="invites-tab"
          />
          <q-tab
            name="users"
            label="Users"
            v-if="
              permissions.access_view ||
              permissions.access_users_invite ||
              permissions.access_users_revoke
            "
            data-cy="users-tab"
          />
          <q-tab
            name="manageUserRoles"
            label="Manage User Role"
            v-if="
              permissions.access_view ||
              permissions.access_userRoles_create ||
              permissions.access_userRoles_edit ||
              permissions.access_userRoles_delete
            "
            data-cy="manage-roles-tab"
          >
            <q-select
              v-model="selectedUserRole"
              :options="userRoleDefinitionsFiltered"
              :color="q.dark.isActive ? 'white' : 'black'"
              borderless
              dense
              class="q-ml-sm"
              map-options
              emit-value
              hide-dropdown-icon
              option-value="id"
              data-cy="selected-role"
            >
              <template v-slot:selected>
                <div class="text-white">
                  {{
                    selectedUserRole
                      ? userRoleDefinitions[selectedUserRole].label
                      : ''
                  }}
                </div>
              </template>
            </q-select>
          </q-tab>
        </q-tabs>
        <q-tab-panels v-model="tab">
          <q-tab-panel name="userInvites">
            <q-card>
              <q-card-section>
                <form data-cy="invite-form" class="row">
                  <div class="text-subtitle2 col-12">Invite People</div>
                  <div class="col-xs-12 col-sm-9" style="display: inline-block">
                    <q-input
                      :disable="!permissions.access_users_invite"
                      v-model="newInvitation.email"
                      type="email"
                      label="Email"
                      hint="For multiple emails, serparate emails using a comma. Example: test@movementtracker.app, test2@movementtracker.app"
                      :color="q.dark.isActive ? 'blue-2' : ''"
                      data-cy="email-field"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-2" style="display: inline-block">
                    <q-select
                      :disable="!permissions.access_users_invite"
                      v-model="newInvitation.role"
                      placeholder="Permission"
                      :options="userRoleDefinitionsFiltered"
                      label="Permission"
                      style="min-width: 100px"
                      :color="q.dark.isActive ? 'blue-2' : ''"
                      data-cy="role-field"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-1" style="display: inline-block">
                    <div class="q-mx-auto" style="width: 32px">
                      <q-btn
                        :disable="!permissions.access_users_invite"
                        dense
                        title="Send Invitation"
                        icon="send"
                        color="positive"
                        @click="sendInvites"
                        data-cy="send-btn"
                      />
                    </div>
                  </div>
                </form>
              </q-card-section>
            </q-card>
            <!--Invites-->
            <q-table
              class="q-mt-md"
              :rows="userInvitesFiltered"
              :columns="userInvitesColumns"
              :rows-per-page-options="[5, 6, 7, 8, 9, 10, 15, 20, 50, 100]"
              row-key="name"
              :filter="userInvitesFilter"
              rows-per-page-label="Users per page:"
              dense
              v-model:pagination="userInvitesPagination"
              data-cy="invites-table"
            >
              <template v-slot:top="props">
                <div class="col-4 q-table__title">Invites</div>

                <q-space />

                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="userInvitesFilter"
                  placeholder="Search"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  data-cy="search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>

                <q-btn
                  flat
                  round
                  dense
                  :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="props.toggleFullscreen"
                  class="q-ml-md"
                  aria-label="Toggle Fullscreen"
                />
              </template>
              <template v-slot:body="props">
                <q-tr
                  :props="props"
                  class="text-bold"
                  :data-cy="'invite-' + props.row.email"
                >
                  <q-td key="name" :props="props" data-cy="name">
                    <q-avatar
                      class="q-mr-md"
                      size="lg"
                      :style="
                        'background-color: ' +
                        (props.row.online ? props.row.online.color : 'black')
                      "
                    >
                      <q-avatar class size="md">
                        <q-img
                          :src="
                            props.row.photoURL
                              ? props.row.photoURL
                              : 'https://avatars.dicebear.com/api/bottts/' +
                                props.row.email +
                                '.svg'
                          "
                        >
                          <template v-slot:error>
                            <q-img
                              :src="
                                'https://avatars.dicebear.com/api/bottts/' +
                                props.row.email +
                                '.svg'
                              "
                            >
                              <template v-slot:error>
                                <div
                                  class="absolute-full flex flex-center bg-negative text-white"
                                >
                                  {{ props.row.name.charAt(0) }}
                                </div>
                              </template>
                            </q-img>
                          </template>
                        </q-img>
                        <!-- <q-badge v-if="props.row.online" color="positive" text-color="positive" floating round label="o" size="xs" /> -->
                      </q-avatar>
                    </q-avatar>
                    <!-- <q-popup-edit v-model="props.row.label">
                  <q-input :model-value="props.row.label > '' ? props.row.label : ''" @update:model-value="updateAccount(props.row.id, 'label', $event)" dense autofocus label="Budget Label" />
                </q-popup-edit>
                <q-tooltip anchor="center right" self="center left" class="bg-accent text-black">
                  <q-icon name="edit"/>
                  Edit
                    </q-tooltip>-->
                  </q-td>
                  <q-td key="email" :props="props" data-cy="email">{{
                    props.row.email
                  }}</q-td>
                  <q-td key="permission" :props="props" data-cy="permission">{{
                    userRoleDefinitions[props.row.role.id].label
                  }}</q-td>
                  <q-td
                    key="actions"
                    :props="props"
                    class="text-negative"
                    data-cy="actions"
                  >
                    <q-btn
                      :disable="!permissions.access_users_invite"
                      dense
                      icon="delete"
                      color="negative"
                      @click="deleteInvite(props.row.email)"
                      aria-label="Delete this Invite"
                      data-cy="delete"
                    />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <q-table
              class="q-mt-md"
              :rows="userRequestsFiltered"
              :columns="userRequestsColumns"
              :rows-per-page-options="[5, 6, 7, 8, 9, 10, 15, 20, 50, 100]"
              row-key="name"
              :filter="usersFilter"
              rows-per-page-label="Users per page:"
              v-model:pagination="usersPagination"
              dense
              data-cy="requests-table"
            >
              <template v-slot:top="props">
                <div class="col-4 q-table__title">Requests</div>

                <q-space />

                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="usersFilter"
                  placeholder="Search"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  data-cy="search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>

                <q-btn
                  flat
                  round
                  dense
                  :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="props.toggleFullscreen"
                  class="q-ml-md"
                  aria-label="Toggle Fullscreen"
                />
              </template>
              <template v-slot:body="props">
                <q-tr
                  :props="props"
                  class="text-bold"
                  :data-cy="'request-' + props.row.email"
                >
                  <q-td key="name" :props="props" data-cy="name">
                    <q-avatar
                      class="q-mr-md"
                      size="lg"
                      :style="
                        'background-color: ' +
                        (props.row.online ? props.row.online.color : 'black')
                      "
                    >
                      <q-avatar class size="md">
                        <q-img
                          :src="
                            props.row.photoURL
                              ? props.row.photoURL
                              : 'https://avatars.dicebear.com/api/bottts/' +
                                props.row.uid +
                                '.svg'
                          "
                        >
                          <template v-slot:error>
                            <q-img
                              :src="
                                'https://avatars.dicebear.com/api/bottts/' +
                                props.row.uid +
                                '.svg'
                              "
                            >
                              <template v-slot:error>
                                <div
                                  class="absolute-full flex flex-center bg-negative text-white"
                                >
                                  {{ props.row.name.charAt(0) }}
                                </div>
                              </template>
                            </q-img>
                          </template>
                        </q-img>
                        <!-- <q-badge v-if="props.row.online" color="positive" text-color="positive" floating round label="o" size="xs" /> -->
                      </q-avatar>
                    </q-avatar>
                    {{ props.row.name ? props.row.name : 'Anonymous' }}
                  </q-td>
                  <q-td key="email" :props="props" data-cy="email">{{
                    props.row.email
                  }}</q-td>
                  <q-td
                    key="actions"
                    :props="props"
                    class="q-gutter-sm"
                    data-cy="actions"
                  >
                    <q-btn
                      :disable="!permissions.access_users_invite"
                      dense
                      icon="done"
                      color="positive"
                      @click="acceptRequest1(props.row)"
                      aria-label="Accept Request"
                      data-cy="accept"
                    />
                    <q-btn
                      :disable="!permissions.access_users_invite"
                      dense
                      icon="delete"
                      color="negative"
                      @click="deleteRequest(props.row)"
                      aria-label="Reject Request"
                      data-cy="delete"
                    />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-tab-panel>
          <!--users-->
          <q-tab-panel name="users">
            <q-table
              :rows="usersFiltered"
              :columns="usersColumns"
              :rows-per-page-options="[5, 6, 7, 8, 9, 10, 15, 20, 50, 100]"
              row-key="uid"
              :filter="usersFilter"
              rows-per-page-label="Users per page:"
              dense
              v-model:pagination="usersPagination"
              class="my-sticky-header-table"
              :style="isFullscreen ? 'height:100vh;' : ''"
              v-model:fullscreen="isFullscreen"
              data-cy="users-table"
            >
              <template v-slot:top="props">
                <div class="col-4 q-table__title"></div>
                <q-space />
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="usersFilter"
                  placeholder="Search"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  data-cy="search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>

                <q-btn
                  flat
                  round
                  dense
                  :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="props.toggleFullscreen"
                  class="q-ml-md"
                  aria-label="Toggle Fullscreen"
                />
              </template>
              <template v-slot:body="props">
                <q-tr
                  :props="props"
                  class="text-bold"
                  :data-cy="'user-' + props.row.email"
                >
                  <q-td key="name" :props="props" data-cy="name">
                    <q-avatar
                      class="q-mr-md"
                      size="lg"
                      :style="
                        'background-color: ' +
                        (props.row.online ? props.row.online.color : 'black')
                      "
                    >
                      <q-avatar class size="md">
                        <q-img
                          :src="
                            props.row.photoURL
                              ? props.row.photoURL
                              : 'https://avatars.dicebear.com/api/bottts/' +
                                props.row.uid +
                                '.svg'
                          "
                        >
                          <template v-slot:error>
                            <q-img
                              :src="
                                'https://avatars.dicebear.com/api/bottts/' +
                                props.row.uid +
                                '.svg'
                              "
                            >
                              <template v-slot:error>
                                <div
                                  class="absolute-full flex flex-center bg-negative text-white"
                                >
                                  {{ props.row.name.charAt(0) }}
                                </div>
                              </template>
                            </q-img>
                          </template>
                        </q-img>
                        <!-- <q-badge v-if="props.row.online" color="positive" text-color="positive" floating round label="o" size="xs" /> -->
                      </q-avatar>
                    </q-avatar>
                    <!-- {{ props.row.online}} -->
                    {{ props.row.name ? props.row.name : 'Anonymous' }}
                    <!-- <q-popup-edit v-model="props.row.label">
                  <q-input :model-value="props.row.label > '' ? props.row.label : ''" @update:model-value="updateAccount(props.row.id, 'label', $event)" dense autofocus label="Budget Label" />
                </q-popup-edit>
                <q-tooltip anchor="center right" self="center left" class="bg-accent text-black">
                  <q-icon name="edit"/>
                  Edit
                    </q-tooltip>-->
                  </q-td>
                  <q-td key="email" :props="props" data-cy="email">
                    {{ props.row.email }}
                    <!--  ${{ props.row.income.toFixed(2) }}
                <q-tooltip class="bg-accent text-black">
                  Auto Calculated
                    </q-tooltip>-->
                  </q-td>
                  <q-td
                    key="permission"
                    :props="props"
                    :class="{
                      'cursor-pointer': user.uid !== props.row.uid,
                    }"
                    data-cy="permission"
                  >
                    {{ props.row.role }}
                    <q-tooltip
                      v-if="user.uid !== props.row.uid"
                      class="bg-info"
                      anchor="center middle"
                      self="center left"
                    >
                      <q-icon name="edit" />
                    </q-tooltip>
                    <!-- {{ user }} -->
                    <q-popup-edit
                      :disable="!permissions.access_users_invite"
                      :model-value="props.row.role"
                      v-if="user.uid !== props.row.uid"
                    >
                      <q-select
                        :options="userRoleDefinitionsFiltered"
                        label="Permission"
                        stack-label
                        :model-value="props.row.role"
                        @update:model-value="updateRole(props.row, $event.id)"
                        :color="q.dark.isActive ? 'blue-2' : ''"
                      />
                    </q-popup-edit>
                  </q-td>
                  <q-td
                    key="actions"
                    :props="props"
                    class="text-negative"
                    data-cy="actions"
                  >
                    <q-btn
                      v-if="user.uid !== props.row.uid"
                      :disable="!permissions.access_users_revoke"
                      dense
                      icon="delete"
                      color="negative"
                      @click="deleteRole(props.row)"
                      aria-label="Delete this User"
                      data-cy="delete"
                    />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-tab-panel>
          <!--Requests-->
          <q-tab-panel name="manageUserRoles">
            <q-list v-if="currentUserRole">
              <div
                v-if="selectedUserRole === 'owner'"
                class="text-center"
                data-cy="not-permitted-owner"
              >
                The Owner role cannot be modified
              </div>
              <div
                v-else-if="!permissions.access_userRoles_edit"
                class="text-center"
                data-cy="not-permitted-own-role"
              >
                You do not have permissions to modify user roles
              </div>
              <div
                v-else-if="
                  movement.role && selectedUserRole === movement.role.id
                "
                class="text-center"
                data-cy="not-permitted-own-role"
              >
                You are not permitted to modify your own role
              </div>

              <q-item data-cy="access-titles">
                <div style="width: 100px">
                  <b>Access</b>
                </div>
                <q-space />
                <div style="width: 100px" class="text-center">View</div>
                <q-space />
                <div style="width: 100px" class="text-center">Invite Users</div>
                <q-space />
                <div style="width: 100px" class="text-center">Remove Users</div>
                <q-space />
                <div style="width: 100px" class="text-center">
                  Create User Roles
                </div>
                <q-space />
                <div style="width: 100px" class="text-center">
                  Edit User Roles
                </div>
                <q-space />
                <div style="width: 100px" class="text-center">
                  Delete User Roles
                </div>
              </q-item>
              <q-item data-cy="access-checkboxes">
                <div style="width: 100px"></div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="view">
                  <span style="width: 40px">
                    <q-checkbox
                      :disable="
                        selectedUserRole === 'owner' ||
                        (movement.role &&
                          selectedUserRole === movement.role.id) ||
                        !permissions.access_userRoles_edit
                      "
                      @update:model-value="
                        updateUserRoleRule($event, `access_view`)
                      "
                      :model-value="currentUserRole.rules.access_view"
                    />
                  </span>
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="invite">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'access_users_invite')
                    "
                    :model-value="currentUserRole.rules.access_users_invite"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="remove">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'access_users_revoke')
                    "
                    :model-value="currentUserRole.rules.access_users_revoke"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="create">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'access_userRoles_create')
                    "
                    :model-value="currentUserRole.rules.access_userRoles_create"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="edit">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'access_userRoles_edit')
                    "
                    :model-value="currentUserRole.rules.access_userRoles_edit"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="delete">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'access_userRoles_delete')
                    "
                    :model-value="currentUserRole.rules.access_userRoles_delete"
                  />
                </div>
              </q-item>
              <q-separator />
              <q-item data-cy="member-titles">
                <div style="width: 100px">
                  <b>Members</b>
                </div>
                <q-space />
                <div style="width: 100px" class="text-center">View</div>
                <q-space />
                <div style="width: 100px" class="text-center">Create</div>
                <q-space />
                <div style="width: 100px" class="text-center">Edit</div>
                <q-space />
                <div style="width: 100px" class="text-center">Delete</div>
                <q-space />
                <div style="width: 100px" class="text-center">Export</div>
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-item data-cy="member-checkboxes">
                <div style="width: 100px"></div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="view">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'members_view')
                    "
                    :model-value="currentUserRole.rules.members_view"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="create">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'members_create')
                    "
                    :model-value="currentUserRole.rules.members_create"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="edit">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'members_edit')
                    "
                    :model-value="currentUserRole.rules.members_edit"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="delete">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'members_delete')
                    "
                    :model-value="currentUserRole.rules.members_delete"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="export">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'members_export')
                    "
                    :model-value="currentUserRole.rules.members_export"
                  />
                </div>
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-separator />
              <q-item data-cy="movement-titles">
                <div style="width: 100px">
                  <b>Movement</b>
                </div>
                <q-space />
                <div style="width: 100px" class="text-center">Edit</div>
                <q-space />
                <div style="width: 100px" class="text-center">Copy</div>
                <q-space />
                <div style="width: 100px" class="text-center">Carbon Copy</div>
                <q-space />
                <div style="width: 100px" class="text-center">Delete</div>
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-item data-cy="movement-checkboxes">
                <div style="width: 100px"></div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="edit">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'movement_edit')
                    "
                    :model-value="currentUserRole.rules.movement_edit"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="copy">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'movement_copy')
                    "
                    :model-value="currentUserRole.rules.movement_copy"
                  />
                </div>
                <q-space />
                <div
                  style="width: 100px; padding-left: 30px"
                  data-cy="carbon-copy"
                >
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'movement_carbonCopy')
                    "
                    :model-value="currentUserRole.rules.movement_carbonCopy"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="delete">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'movement_delete')
                    "
                    :model-value="currentUserRole.rules.movement_delete"
                  />
                </div>
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-separator />
              <q-item data-cy="settings-titles">
                <div style="width: 100px">
                  <b>Settings</b>
                </div>
                <q-space />
                <div style="width: 100px" class="text-center">View</div>
                <q-space />
                <div style="width: 100px" class="text-center">Create</div>
                <q-space />
                <div style="width: 100px" class="text-center">Edit</div>
                <q-space />
                <div style="width: 100px" class="text-center">Delete</div>
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-item data-cy="roles">
                <div style="width: 100px" class="text-caption">Roles</div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="view">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_roles_view')
                    "
                    :model-value="currentUserRole.rules.settings_roles_view"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="create">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_roles_create')
                    "
                    :model-value="currentUserRole.rules.settings_roles_create"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="edit">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_roles_edit')
                    "
                    :model-value="currentUserRole.rules.settings_roles_edit"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="delete">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_roles_delete')
                    "
                    :model-value="currentUserRole.rules.settings_roles_delete"
                  />
                </div>
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-item data-cy="mods">
                <div style="width: 100px" class="text-caption">Modifiers</div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="view">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_mods_view')
                    "
                    :model-value="currentUserRole.rules.settings_mods_view"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="create">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_mods_create')
                    "
                    :model-value="currentUserRole.rules.settings_mods_create"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="edit">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_mods_edit')
                    "
                    :model-value="currentUserRole.rules.settings_mods_edit"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="delete">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_mods_delete')
                    "
                    :model-value="currentUserRole.rules.settings_mods_delete"
                  />
                </div>
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-item data-cy="complex">
                <div style="width: 100px" class="text-caption">Complex</div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="view">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_complex_view')
                    "
                    :model-value="currentUserRole.rules.settings_complex_view"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="create">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_complex_create')
                    "
                    :model-value="currentUserRole.rules.settings_complex_create"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="edit">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_complex_edit')
                    "
                    :model-value="currentUserRole.rules.settings_complex_edit"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="delete">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_complex_delete')
                    "
                    :model-value="currentUserRole.rules.settings_complex_delete"
                  />
                </div>
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-item data-cy="calc">
                <div style="width: 100px" class="text-caption">Calculated</div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="view">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_calc_view')
                    "
                    :model-value="currentUserRole.rules.settings_calc_view"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="create">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_calc_create')
                    "
                    :model-value="currentUserRole.rules.settings_calc_create"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="edit">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_calc_edit')
                    "
                    :model-value="currentUserRole.rules.settings_calc_edit"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="delete">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'settings_calc_delete')
                    "
                    :model-value="currentUserRole.rules.settings_calc_delete"
                  />
                </div>
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-separator />
              <q-item data-cy="snapshots-titles">
                <div style="width: 100px"></div>
                <q-space />
                <div style="width: 100px" class="text-center">View</div>
                <q-space />
                <div style="width: 100px" class="text-center">Update</div>
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-item data-cy="snapshots-checkboxes">
                <div style="width: 100px">
                  <b>Snapshots</b>
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="view">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'snapshots_view')
                    "
                    :model-value="currentUserRole.rules.snapshots_view"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="update">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'snapshots_update')
                    "
                    :model-value="currentUserRole.rules.snapshots_update"
                  />
                </div>
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-separator />
              <q-item data-cy="tree-titles">
                <div style="width: 100px"></div>
                <q-space />
                <div style="width: 100px" class="text-center">View</div>
                <q-space />
                <div style="width: 100px" class="text-center">Create</div>
                <q-space />
                <div style="width: 100px" class="text-center">Export</div>
                <q-space />
                <div style="width: 100px" class="text-center">Delete</div>
                <q-space />
                <div style="width: 100px" class="text-center">Import Trees</div>
                <q-space />
                <div style="width: 100px" class="text-center">
                  Remove Imported Trees
                </div>
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-item data-cy="tree-checkboxes">
                <div style="width: 100px">
                  <b>Trees</b>
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="view">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'trees_view')
                    "
                    :model-value="currentUserRole.rules.trees_view"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="create">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'trees_create')
                    "
                    :model-value="currentUserRole.rules.trees_create"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="export">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'trees_export')
                    "
                    :model-value="currentUserRole.rules.trees_export"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="delete">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'trees_delete')
                    "
                    :model-value="currentUserRole.rules.trees_delete"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="import">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'subTrees_add')
                    "
                    :model-value="currentUserRole.rules.subTrees_add"
                  />
                </div>
                <q-space />
                <div
                  style="width: 100px; padding-left: 30px"
                  data-cy="remove-import"
                >
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'subTrees_remove')
                    "
                    :model-value="currentUserRole.rules.subTrees_remove"
                  />
                </div>
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-separator />
              <q-item data-cy="trends-titles">
                <div style="width: 100px"></div>
                <q-space />
                <div style="width: 100px" class="text-center">View</div>
                <q-space />
                <div style="width: 100px" class="text-center">
                  View Movement Graphs
                </div>
                <q-space />
                <div style="width: 100px" class="text-center">
                  Upload Movement Graphs
                </div>
                <q-space />
                <div style="width: 100px" class="text-center">
                  Delete Movement Graphs
                </div>
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
              </q-item>
              <q-item data-cy="trends-checkboxes">
                <div style="width: 100px">
                  <b>Trends</b>
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="view">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'trends_view')
                    "
                    :model-value="currentUserRole.rules.trends_view"
                  />
                </div>
                <q-space />
                <div style="width: 100px; padding-left: 30px" data-cy="view-mg">
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'trends_movementGraphs_view')
                    "
                    :model-value="
                      currentUserRole.rules.trends_movementGraphs_view
                    "
                  />
                </div>
                <q-space />
                <div
                  style="width: 100px; padding-left: 30px"
                  data-cy="create-mg"
                >
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'trends_movementGraphs_create')
                    "
                    :model-value="
                      currentUserRole.rules.trends_movementGraphs_create
                    "
                  />
                </div>
                <q-space />
                <div
                  style="width: 100px; padding-left: 30px"
                  data-cy="delete-mg"
                >
                  <q-checkbox
                    :disable="
                      selectedUserRole === 'owner' ||
                      (movement.role &&
                        selectedUserRole === movement.role.id) ||
                      !permissions.access_userRoles_edit
                    "
                    @update:model-value="
                      updateUserRoleRule($event, 'trends_movementGraphs_delete')
                    "
                    :model-value="
                      currentUserRole.rules.trends_movementGraphs_delete
                    "
                  />
                </div>
                <q-space />
                <div style="width: 100px" />
                <q-space />
                <div style="width: 100px" />
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
        <q-dialog v-model="confirmRequest" persistent>
          <q-card style="min-width: 350px" data-cy="accept-request-dialog">
            <q-card-section>
              <div class="text-h6">What permissions do you want to grant?</div>
            </q-card-section>

            <q-card-section>
              <q-select
                :options="userRoleDefinitionsFiltered"
                label="Permission"
                stack-label
                :model-value="pendingAcceptRequest.role"
                @update:model-value="setPendingRequestPermission"
                :color="q.dark.isActive ? 'blue-2' : ''"
                data-cy="select-role"
              />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup data-cy="cancel" />
              <q-btn
                flat
                label="Grant Access"
                v-close-popup
                @click="acceptRequest"
                data-cy="accept"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-scroll-area>
    </q-page>
  </div>
</template>

<script>
import { setCurrentScreen, logEvent, getAnalytics } from 'firebase/analytics';
import {
  getFirestore,
  serverTimestamp,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  collection,
  addDoc,
} from '@firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { ref, reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

export default {
  preFetch({ store, currentRoute }) {
    // console.log(Object.keys(store.state.movement.users));
    if (Object.keys(store.state.movement.users).length <= 0) {
      store.dispatch('movement/fetchUsers', {
        movId: currentRoute.params.movId,
      });
    }
    if (Object.keys(store.state.movement.userRoleDefinitions).length <= 0) {
      store.dispatch('movement/fetchUserRoleDefinitions', {
        movId: currentRoute.params.movId,
      });
    }
  },
  setup() {
    const q = useQuasar();
    const store = useStore();
    const route = useRoute();
    setCurrentScreen(getAnalytics(), 'Movement_Access');
    const permissions = computed(() => store.state.movement.permissions);

    const user = computed(() => store.state.auth.user);
    const backgroundColor = computed(() => store.state.movement.user);
    const movement = computed(() => store.state.movement.movement);
    const isFullscreen = ref(false);
    const tab = ref('');
    tab.value = permissions.value.access_users_invite
      ? 'userInvites'
      : permissions.value.access_users_revoke || permissions.value.access_view
      ? 'users'
      : permissions.value.access_userRoles_create ||
        permissions.value.access_userRoles_edit ||
        permissions.value.access_userRoles_delete
      ? 'manageUserRoles'
      : '';
    const newInvitation = reactive({
      name: '',
      email: '',
      role: '',
      accepted: false,
      sent: false,
      movementName: '',
      movId: '',
      fromName: '',
      fromEmail: '',
      style: {},
    });

    const userRoleDefinitions = computed(
      () => store.state.movement.userRoleDefinitions
    );
    const userRoleDefinitionsFiltered = computed(() => {
      return Object.keys(userRoleDefinitions.value)
        .map((i) => userRoleDefinitions.value[i])
        .sort((a, b) => a.label - b.label);
    });
    const selectedUserRole = ref(
      userRoleDefinitionsFiltered.value[0]
        ? userRoleDefinitionsFiltered.value[0].id
        : ''
    );
    function addUserRoleDefinition() {
      let newUserRole = {
        label: 'Untitled User Role',
        rules: {
          snapshots: { view: false, update: false },
          events: { create: false },
          members: {
            create: false,
            export: false,
            edit: false,
            delete: false,
            view: false,
          },
          subTrees: { add: false, remove: false },
          movement: {
            edit: false,
            copy: false,
            carbonCopy: false,
            delete: false,
          },
          trends: {
            view: false,
            movementGraphs: { create: false, delete: false, view: false },
          },
          access: {
            view: false,
            users: { revoke: false, invite: false },
            userRoles: { create: false, delete: false, edit: false },
          },
          trees: { create: false, export: false, view: false },
          settings: {
            view: false,
            calc: { view: false, create: false, edit: false, delete: false },
            complex: { view: false, create: false, delete: false, edit: false },
            mods: { view: false, create: false, delete: false, edit: false },
            roles: { view: false, create: false, delete: false, edit: false },
          },
        },
      };
      addDoc(
        collection(
          getFirestore(),
          `/movements/${movement.id}/user-role-definitions`
        ),
        newUserRole
      ).catch((err) => console.error(err));
    }
    function updateRoleDefinitionRule(value) {
      store.commit('movement/updateRoleDefinitionRule', value);
    }

    function fetchUsers(value) {
      store.dispatch('fetchUsers', value);
    }
    const users = computed(() => {
      // console.log(store.state.movement);
      return store.state.movement.users;
    });
    const usersFilter = ref('');
    const usersFiltered = computed(() => {
      return Object.keys(users.value).map((i) => users.value[i]);
    });
    const usersPagination = computed({
      get: () => {
        q.localStorage.has('adminsTableRows')
          ? q.localStorage.getItem('adminsTableRows')
          : {
              sortBy: 'name',
              descending: false,
              page: 1,
              rowsPerPage: 10,
              // rowsNumber: xx if getting data from a server
            };
      },
      set: ($event) => q.localStorage.set('adminsTableRows', $event),
    });
    const usersColumns = reactive([
      {
        name: 'name',
        align: 'left',
        label: 'Name',
        field: 'name',
        sortable: true,
      },
      {
        name: 'email',
        align: 'left',
        label: 'Email',
        field: 'email',
        sortable: true,
      },
      {
        name: 'permission',
        align: 'left',
        label: 'Permission',
        field: 'permission',
        sortable: true,
      },
      { name: 'actions', align: 'right', label: 'Actions', field: 'actions' },
    ]);

    function updateUserRoleRule(value, key) {
      // console.log(currentUserRole);
      updateRoleDefinitionRule({
        value,
        ruleKey: key,
        userRole: selectedUserRole.value,
      });
    }
    function updateRole(member, role) {
      // console.log(role)
      // member.role = role
      // toasted.global.toast_success(`Making ${member.name} a ${member.role}`)
      const oldRole = member.role;
      updateDoc(
        doc(
          getFirestore(),
          `/movements/${route.params.movId}/users/${member.id}`
        ),
        { role: role }
      )
        .then((res) => {
          // console.log('updated')
          q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Access Updated',
          });
          // updateChangeLog({ msg: `${user.displayName} made ${member.name} a ${role} instead of a ${oldRole}`, movId: route.params.movId })
          if (process.env.DEV)
            logEvent(getAnalytics(), 'access_changed', {
              uid: member.uid,
              permission: role,
              old_permission: oldRole,
            });
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), 'exception', {
              description: err,
              fatal: false,
            });
          console.error(new Error('Oops, something went wrong: ' + err));
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          });
        });
    }
    function deleteRole(role) {
      // console.log(role)
      deleteDoc(
        doc(
          getFirestore(),
          `/movements/${route.params.movId}/users/${
            role.id ? role.id : role.uid
          }`
        )
      )
        .then(() => {
          q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Access Revoked',
          });
          // updateChangeLog({ msg: `${user.displayName} removed ${role.name}`, movId: route.params.movId })
          if (process.env.DEV)
            logEvent(getAnalytics(), 'access_revoked', { uid: role.uid });
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), 'exception', {
              description: err,
              fatal: false,
            });
          console.error(new Error('Oops, something went wrong: ' + err));
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          });
        });
    }

    const userRequests = computed(() => store.state.movement.userRequests);
    const userRequestsFiltered = computed(() => {
      return Object.keys(userRequests.value).map((i) => userRequests.value[i]);
    });
    const userRequestsColumns = reactive([
      {
        name: 'name',
        align: 'left',
        label: 'Name',
        field: 'name',
        sortable: true,
      },
      {
        name: 'email',
        align: 'left',
        label: 'Email',
        field: 'email',
        sortable: true,
      },
      // { name: 'permission', align: 'left', label: 'Permission', field: 'permission', sortable: true },
      { name: 'actions', align: 'right', label: 'Actions', field: 'actions' },
    ]);
    const pendingAcceptRequest = ref({});
    const confirmRequest = ref(false);
    function deleteRequest(request) {
      // console.log(event)
      deleteDoc(
        doc(
          getFirestore(),
          `/movements/${route.params.movId}/requests/${request.email}`
        )
      )
        .then(() => {
          q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Request Rejected',
          });
          // updateChangeLog({ msg: `${user.displayName} removed ${request.email}'s request to join`, movId: route.params.movId })
          if (process.env.DEV)
            logEvent(getAnalytics(), 'request_rejected', {
              email: request.email,
            });
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), 'exception', {
              description: err,
              fatal: false,
            });
          console.error(new Error('Oops, something went wrong: ' + err));
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          });
        });
    }
    function acceptRequest1(request) {
      pendingAcceptRequest.value = request;
      pendingAcceptRequest.value.role = 'viewer';
      confirmRequest.value = true;
    }
    function acceptRequest() {
      httpsCallable(
        getFunctions(),
        'mt-users-acceptRequest'
      )({
        request: {
          email: pendingAcceptRequest.value.email,
          uid: pendingAcceptRequest.value.uid,
          role: pendingAcceptRequest.value.role,
        },
        movId: route.params.movId,
        uid: user.name,
      })
        .then(() => {
          q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Request Accepted',
          });
          // updateChangeLog({ msg: `${user.displayName} accepted ${pendingAcceptRequest.email}'s request to join.`, movId: route.params.movId })
          if (process.env.DEV)
            logEvent(getAnalytics(), 'request_accepted', {
              email: pendingAcceptRequest.value.email,
            });
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), 'exception', {
              description: err,
              fatal: false,
            });
          console.error(new Error('Oops, something went wrong: ' + err));
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          });
        });
    }
    function setPendingRequestPermission(event) {
      // console.log(event)
      pendingAcceptRequest.value.role = event;
    }

    const userInvites = computed(() => store.state.movement.userInvites);
    const userInvitesFilter = ref('');
    const userInvitesFiltered = computed(() => {
      return Object.keys(userInvites.value).map((i) => userInvites.value[i]);
    });
    const userInvitesColumns = reactive([
      {
        name: 'name',
        align: 'left',
        label: 'Name',
        field: 'name',
        sortable: true,
      },
      {
        name: 'email',
        align: 'left',
        label: 'Email',
        field: 'email',
        sortable: true,
      },
      {
        name: 'permission',
        align: 'left',
        label: 'Permission',
        field: 'permission',
        sortable: true,
      },
      { name: 'actions', align: 'right', label: 'Actions', field: 'actions' },
    ]);
    const userInvitesPagination = computed({
      get: () => {
        return q.localStorage.has('userInvitesPagination')
          ? q.localStorage.getItem('userInvitesPagination')
          : {
              sortBy: 'name',
              descending: false,
              page: 1,
              rowsPerPage: 10,
              // rowsNumber: xx if getting data from a server
            };
      },
      set: (value) => {
        q.localStorage.set('userInvitesTableRows', value);
      },
    });
    const currentUserRole = computed(() => {
      return userRoleDefinitions.value[selectedUserRole.value];
    });
    function sendInvites() {
      // console.log(newInvitation.email);
      const emailList = newInvitation.email;
      const role = {
        id: newInvitation.role.id,
        label: newInvitation.role.label,
      };
      const emails = emailList.match(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
      );
      // const emails = emailList.replace(/\s/g, '').split(',')
      // const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      for (var i = 0; i < emails.length; i++) {
        // if (emails[i] === '' || !regex.test(emails[i])) {
        // } else {
        sendInvite({ email: emails[i], role });
        // }
      }
    }
    function sendInvite(invitation) {
      // console.log(invitation)
      if (invitation.email <= '') {
        q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'Oops, Missing Email Field!',
        });
        return;
      } else if (invitation.role <= '') {
        q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'Oops, Missing Permission Field!',
        });
        return;
      }
      for (var key in users.value) {
        // console.log('test', invitation.email, users.value[key])
        if (invitation.email === users.value[key].email) {
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Invite Already Sent',
          });
          return;
        }
      }
      for (key in userInvites.value) {
        // console.log('userInvites', invitation, userInvites[key])
        if (invitation.email === userInvites.value[key].email) {
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Invite Already Sent!',
          });
          return;
        }
      }
      // console.log(user.value);
      // console.log(movement)
      invitation.movementName = movement.value.name;
      invitation.movId = route.params.movId;
      // invitation.style.backgroundColor = backgroundColor
      invitation.accepted = false;
      invitation.sent = false;
      invitation.fromName = user.value.displayName;
      invitation.fromEmail = user.value.email;
      invitation.timestamp = serverTimestamp();
      // var date = new Date
      // console.log(invitation);
      // newInvitation.date = new Date()
      // console.log(newInvitation)
      // console.log(
      //   `/movements/${route.params.movId}/invites/${newInvitation.email}`,
      //   invitation
      // );
      return setDoc(
        doc(
          getFirestore(),
          `/movements/${route.params.movId}/invites/${invitation.email}`
        ),
        invitation
      )
        .then((res) => {
          q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Invitation Sent',
          });
          // updateChangeLog({ msg: `${user.displayName} sent an invite to ${invitation.email}`, movId: route.params.movId })
          if (process.env.DEV)
            logEvent(getAnalytics(), 'movement_shared', {
              email: invitation.email,
              permission: invitation.role,
            });
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), 'exception', {
              description: err,
              fatal: false,
            });
          console.error(new Error('Oops, something went wrong: ' + err));
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          });
        });
    }
    function deleteInvite(invite) {
      deleteDoc(
        doc(
          getFirestore(),
          `/movements/${route.params.movId}/invites/${invite}`
        )
      )
        .then(() => {
          q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Invitation Deleted',
          });
          // updateChangeLog({ msg: `${user.displayName} deleted ${invite}'s invite`, movId: route.params.movId })
          if (process.env.DEV)
            logEvent(getAnalytics(), 'invite_deleted', { email: invite });
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), 'exception', {
              description: err,
              fatal: false,
            });
          console.error(new Error('Oops, something went wrong: ' + err));
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          });
        });
    }

    watch(
      movement,
      (newVal, oldVal) => {
        if (movement) {
          if (movement.name && users.length <= 0) {
            fetchUsers({
              movementDoc: doc(
                getFirestore(),
                `/movements/${route.params.movId}`
              ),
            });
          }
        }
      },
      { immediate: true }
    );
    watch(
      userRoleDefinitionsFiltered,
      (newVal, oldVal) => {
        if (!newVal || !oldVal || newVal.length !== oldVal.length) {
          selectedUserRole.value = userRoleDefinitionsFiltered.value[0]
            ? userRoleDefinitionsFiltered.value[0].id
            : '';
        }
      },
      { immediate: true }
    );
    return {
      q,
      tab,
      movement,
      permissions,
      isFullscreen,
      confirmRequest,
      selectedUserRole,
      currentUserRole,
      updateUserRoleRule,
      userRoleDefinitions,
      userRoleDefinitionsFiltered,
      userInvitesFilter,
      userInvitesColumns,
      userInvitesFiltered,
      userInvitesPagination,
      pendingAcceptRequest,
      setPendingRequestPermission,
      userRequestsFiltered,
      userRequestsColumns,
      usersPagination,
      newInvitation,
      usersFilter,
      usersFiltered,
      usersColumns,
      users,
      user,
      sendInvites,
      deleteInvite,
      acceptRequest,
      acceptRequest1,
      deleteRequest,
      updateRole,
      deleteRole,
    };
  },
};
</script>

<style lang="sass" scoped>
.my-sticky-header-table
  /* height or max-height is important */
  height: calc(100vh - 86px)

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
