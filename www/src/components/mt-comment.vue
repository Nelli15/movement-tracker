<template>
	<div>
		<b-button
          variant="outline-primary"
          class="float-left ml-2 mr-0"
          @click=""
          v-if="userRoles.editor">
          <i class="material-icons">add_comment</i>
        </b-button>
        <b-modal v-model="memberModal" :title="member.name+' in '+movement.name">
			<div slot="modal-title">
				<button type="button" class="btn size mx-auto" :class="{'btn-rounded':rounded, 'btn-underline':underline}" :style="'background-color:'+background+'; border-color:'+border+';color:'+color+';'+'font-size:'+size+'%;'" :key="member.name">
						<i class="material-icons">person</i>{{prependIcons}} {{member.name}} {{appendIcons}}
					</button>
			</div>
			<b-container class="">
				<b-row class="mb-2">
					<b-col class="mx-auto">

					</b-col>
				</b-row>
				<b-row class="mb-2">
					<b-col sm="3" style="font-weight:bold;">Name:</b-col><b-col v-if="!userRoles.editor">
					 {{member.name}}
					</b-col>
					 <b-col v-if="userRoles.editor" @mouseover="show.name = true"
					 @mouseleave="show.name =false" style="cursor:pointer;">
					 <label-edit v-bind:text="member.name" placeholder="Member Name" v-on:text-updated-blur="member.name=$event;editMember($event)" v-on:text-updated-enter="member.name=$event;editMember($event)" class="float-left">
					 </label-edit>
					 <i class="material-icons float-right" style="position:absolute;" v-show="show.name">edit_outline</i>
					</b-col>

				</b-row>
				<b-row class="mb-2">
					<b-col sm="3" style="font-weight:bold;">Role:</b-col>
					<b-col v-if="!userRoles.editor"> {{movement.roles[member.role]?movement.roles[member.role].name:""}}
					</b-col>
					<b-col v-if="userRoles.editor && !show.roleEdit" @mouseover="show.role = true"
					 @mouseleave="show.role = false" @click="show.role = false;show.roleEdit = true;" style="cursor:pointer;"> {{movement.roles[member.role]?movement.roles[member.role].name:""}}
					 <i class="material-icons float-right" style="position:absolute;" v-show="show.role">edit_outline</i>
					</b-col>
					 <b-col v-if="userRoles.editor && show.roleEdit">
					 	<b-form-select v-model="member.role" :options="roles" required @change="show.roleEdit = false;editMember($event)" @blur.native="show.roleEdit = false;" autofocus>
						</b-form-select>
					 </b-col>
				</b-row>
				<b-row>
					<b-col sm="3" style="font-weight:bold;">Modifiers:</b-col>
					<b-col v-if="!userRoles.editor"><b-badge pill v-for="mod in member.mods" :key="mod" v-if="(mod != 'no-mods')" variant="primary" class="ml-1">{{movement.mods[mod]?movement.mods[mod].name:""}}</b-badge>
					</b-col>
					<b-col v-if="userRoles.editor && !show.modsEdit" @mouseover="show.mods = true"
					 @mouseleave="show.mods = false" @click="show.mods = false;show.modsEdit = true;" style="cursor:pointer;">
					 	<b-badge class="btn btn-primary" variant="light"><i class="material-icons" style="font-size:14px;font-weight:bold;">add</i> Add Modifier</b-badge>
					</b-col>
					 <b-col v-if="userRoles.editor && show.modsEdit">
					 	<b-form-select :options="mods" @change="show.modsEdit = false;addMod($event)" @blur.native="show.modsEdit = false;" autofocus>
						</b-form-select>
					 </b-col>
				</b-row>
				<b-row class="mb-2">
					<b-col sm="3"></b-col>
					<b-col v-if="userRoles.editor">
						<b-badge pill v-for="mod in member.mods" :key="mod.name" class="mr-1" variant="primary" v-if="(mod != 'no-mods')">{{movement.mods[mod]?movement.mods[mod].name:""}} <i class="material-icons" style="font-size:12px;cursor:pointer;" @click="removeMod(movement.mods[mod]?movement.mods[mod].name:'')">close</i></b-badge>
					</b-col>
				</b-row>
				<b-row class="">
					<b-col sm="3" style="font-weight:bold;">Parent:</b-col>
					<b-col v-if="!userRoles.editor">{{parent}}
					</b-col>
					<b-col v-if="userRoles.editor && !show.parentEdit" @mouseover="show.parent = true"
					 @mouseleave="show.parent = false" @click="show.parent = false;show.parentEdit = true;" style="cursor:pointer;">{{parent}}
					 <i class="material-icons float-right" style="position:absolute;" v-show="show.parent">edit_outline</i>
					</b-col>
					 <b-col v-if="userRoles.editor && show.parentEdit">
					 	<b-form-select v-model="member.parent" :options="movement.possibleParents" required @change="show.parentEdit = false;editMember($event)" @blur.native="show.parentEdit = false;" autofocus>
						</b-form-select>
					 </b-col>
				</b-row>
			</b-container>
			<div slot="modal-footer" class="w-100">
				<b-button
		          variant=""
		          class="float-right ml-2 mr-0"
		          @click="toggleMemberModal">
		          <i class="material-icons">close</i>
		        </b-button>

		        <mt-add-member
		          class="float-left ml-auto"
		          v-if="userRoles.editor" :movement="movement" :userRoles="userRoles" :mods="mods" :roles="roles" :parentVal="member.id">
		      	</mt-add-member>
		        <b-button
		          variant="outline-primary"
		          class="float-left ml-2 mr-0"
		          @click=""
		          v-if="userRoles.editor">
		          <i class="material-icons">add_comment</i>
		        </b-button>

		        <b-button
			          variant="danger"
			          class="float-left ml-2"
			          @click="showConfirmDelete"
			          v-if="userRoles.superEditor">
			          <i class="material-icons">delete</i>
			        </b-button>
	        </div>
		</b-modal>
    </div>
</template>

<script>

</script>
