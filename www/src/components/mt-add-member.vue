<template>
  <div>
    <q-btn @click="clicked = !clicked" v-if="editor" flat icon="person_add" />
    <!-- <b-modal v-model="show.modal" :title="'New Member in '+movement.name" v-if="userRoles.editor">
          <div slot="modal-title">
          <q-btn type="q-btn" class="btn mx-auto" :class="{'btn-rounded':rounded, 'btn-underline':underline}" :style="'background-color:'+background+'; border-color:'+border+';color:'+color+';'" :key="newMember.name">
              <i class="material-icons">person</i>{{prependIcons}} {{newMember.name}} {{appendIcons}}
            </q-btn>
        </div>
        <b-container class="">
          <b-row class="mb-2">
            <b-col class="mx-auto">

            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" style="font-weight:bold;">Name:</b-col><b-col v-if="!userRoles.editor">
             {{newMember.name}}
            </b-col>
             <b-col v-if="userRoles.editor" @mouseover="show.name = true"
             @mouseleave="show.name =false" style="cursor:pointer;">
             <i class="material-icons float-right" style="position:absolute;" v-show="show.name">edit_outline</i>
            </b-col>

          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" style="font-weight:bold;">Role:</b-col>
            <b-col v-if="!userRoles.editor"> {{movement.roles[newMember.role]?movement.roles[newMember.role].name:""}}
            </b-col>
            <b-col v-if="userRoles.editor && !show.roleEdit" @mouseover="show.role = true"
             @mouseleave="show.role = false" @click="show.role = false;show.roleEdit = true;" style="cursor:pointer;"> {{movement.roles[newMember.role]?movement.roles[newMember.role].name:""}}
             <i class="material-icons float-right" style="position:absolute;" v-show="show.role">edit_outline</i>
            </b-col>
             <b-col v-if="userRoles.editor && show.roleEdit">
               <b-form-select v-model="newMember.role" :options="roles" required @change="show.roleEdit = false;" @blur.native="show.roleEdit = false;" autofocus>
              </b-form-select>
             </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" style="font-weight:bold;">override style:</b-col>
            <b-col v-if="!userRoles.editor"><b-badge pill v-for="overrideStyle in newMember.overrideStyles" :key="overrideStyle" v-if="(overrideStyle !== 'no-overrideStyles')" variant="primary" class="ml-1">{{movement.overrideStyles[overrideStyle]?movement.overrideStyles[overrideStyle].name:""}}</b-badge>
            </b-col>
            <b-col v-if="userRoles.editor && !show.overrideStylesEdit" @mouseover="show.overrideStyles = true"
             @mouseleave="show.overrideStyles = false" @click="show.overrideStyles = false;show.overrideStylesEdit = true;" style="cursor:pointer;">
               <b-badge class="btn btn-primary" variant="light"><i class="material-icons" style="font-size:14px;font-weight:bold;">add</i> Add overrideStyleifier</b-badge>
            </b-col>
             <b-col v-if="userRoles.editor && show.overrideStylesEdit">
               <b-form-select :options="overrideStyles" @change="show.overrideStylesEdit = false;addoverrideStyle($event)" @blur.native="show.overrideStylesEdit = false;" autofocus>
              </b-form-select>
             </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3"></b-col>
            <b-col v-if="userRoles.editor">
              <b-badge pill v-for="overrideStyle in newMember.overrideStyles" :key="overrideStyle.name" class="mr-1" variant="primary" v-if="(overrideStyle !== 'no-overrideStyles')">{{movement.overrideStyles[overrideStyle]?movement.overrideStyles[overrideStyle].name:""}} <i class="material-icons" style="font-size:12px;cursor:pointer;" @click="removeoverrideStyle(movement.overrideStyles[overrideStyle]?movement.overrideStyles[overrideStyle].name:'')">close</i></b-badge>
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
               <b-form-select v-model="newMember.parent" :options="movement.possibleParents" required @change="show.parentEdit = false;" @blur.native="show.parentEdit = false;" autofocus>
              </b-form-select>
             </b-col>
          </b-row>
        </b-container> -->
    <!-- <div class="mx-4 my-4"> -->
    <!-- <br> -->
    <!--       <b-input-group prepend="Name" class="my-2 mr-sm-2 mb-sm-0">
        <b-form-input type="text" v-model="newMember.name" required></b-form-input>
      </b-input-group>

      <b-input-group prepend="Role" class="my-2 mr-sm-2 mb-sm-0">
        <b-form-select v-model="newMember.role" :options="roles" required>
        </b-form-select>
      </b-input-group>
      <b-input-group prepend="override style" class="my-2 mr-sm-2 mb-sm-0" multiple>
        <b-form-select v-model="newMember.overrideStyles" :options="overrideStyles"  multiple required></b-form-select>
      </b-input-group>

      <b-input-group prepend="Parent" class="my-2 mr-sm-2 mb-sm-0">
        <b-form-select v-model="newMember.parent" :options="movement.possibleParents" required></b-form-select>
      </b-input-group>-->
    <!-- </b-modal> -->
  </div>
</template>

<script>
import firebase from "@firebase/app";
require("@firebase/firestore");
import { mapGetters, mapActions } from "vuex";

// import LabelEdit from 'label-edit'
export default {
  props: {
    // user:{},
    // userRoles: {},
    // movement: { roles: {} },
    // overrideStyles: {},
    // roles: {}
    // parentVal:
  },
  data() {
    return {
      clicked: false,
      // show: false,
      newMember: {
        name: "",
        // graduating:null,
        role: "default",
        overrideStyles: [],
        movement: null,
        // parent: 'No Parent'
      },
      // show: {
      //   modal: false,
      //   name: false,
      //   role: false,
      //   roleEdit: false,
      //   overrideStyles: false,
      //   overrideStylesEdit: false,
      //   parent: false,
      //   parentEdit: false
      // }
    };
  },
  created: function () {},
  watch: {},
  methods: {
    ...mapActions(["updateCurrentMember"]),
    openNewMember() {
      // console.log('opening new member drawer a')
      this.updateCurrentMember({
        id: "new",
        name: "",
        role: "default",
        overrideStyles: [],
        parent: "No Parent",
      });
    },
    showmodal() {
      this.newMember = {
        name: "",
        // graduating:null,
        role: null,
        overrideStyles: [],
        movement: this.movement.id,
        parent: null,
      };
      this.newMember.parent = this.parentVal ? this.parentVal : "No Parent";
      // this.show.modal = true
    },
    hidemodal: function () {
      this.show.modal = false;
    },
    createMember: function (event) {
      if (this.newMember.name <= "") {
        this.$toasted.global.toast_error("Creation Failed! Missing Name field");
        return;
      } else if (this.newMember.role <= "") {
        this.$toasted.global.toast_error("Creation Failed! Missing Role field");
        return;
      } else if (!this.newMember.overrideStyles) {
        this.$toasted.global.toast_error(
          "Creation Failed! Missing override style field"
        );
        return;
      } else if (this.newMember.parent <= "") {
        this.$toasted.global.toast_error(
          "Creation Failed! Missing Parent field"
        );
        return;
      } else {
        this.$toasted.global.toast_success(`Creating ${this.newMember.name}`);
        var createMember = firebase.functions().httpsCallable("createMember");
        createMember({ member: this.newMember })
          .then((doc) => {
            this.$toasted.global.toast_success(
              `${this.newMember.name} Created Successfully!`
            );
          })
          .catch((err) => {
            this.$toasted.global.toast_error(`Edit Failed! ${err}`);
          });
      }
      this.show.modal = false;
    },
    // addoverrideStyle (overrideStyleText) {
    //   // console.log(typeof this.newMember.overrideStyles)
    //   // console.log("add overrideStyle, ",overrideStyleText)
    //   if (this.newMember.overrideStyles.indexOf(overrideStyleText) === -1) {
    //     this.newMember.overrideStyles.push(overrideStyleText)
    //   }
    // },
    // removeoverrideStyle (overrideStyleText) {
    //   // console.log("remove overrideStyle, ",overrideStyleText)
    //   var overrideStyleValIndex = this.overrideStyles.map(function (d) { return d['text'] }).indexOf(overrideStyleText)
    //   // console.log(overrideStyleValIndex)
    //   var overrideStyleVal = this.overrideStyles[overrideStyleValIndex].value
    //   // console.log(overrideStyleVal)
    //   var index = this.newMember.overrideStyles.indexOf(overrideStyleVal)
    //   if (index > -1) {
    //     this.newMember.overrideStyles.splice(index, 1)
    //   }
    // }
  },
  computed: {
    ...mapGetters(["pages", "editor", "movement"]),
    // background: function () {
    //   // set background color

    //   if (this.newMember.overrideStyles && this.newMember.overrideStyles !== 'no-overrideStyles' && this.newMember.overrideStyles[0] !== 'no-overrideStyles') {
    //     if (Array.isArray(this.newMember.overrideStyles)) {
    //       for (var key in this.newMember.overrideStyles) {
    //         if (typeof this.movement.overrideStyles[this.newMember.overrideStyles[key]] === 'object') {
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].style) {
    //             if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].style.backgroundOverride === true) {
    //               return this.movement.overrideStyles[this.newMember.overrideStyles[key]].style.background
    //             }
    //           }
    //         }
    //       }
    //     } else {
    //       if (typeof this.movement.overrideStyles[this.newMember.overrideStyles] === 'object') {
    //         if (this.movement.overrideStyles[this.newMember.overrideStyles].style) {
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles].style.backgroundOverride === true) {
    //             return this.movement.overrideStyles[this.newMember.overrideStyles].style.background
    //           }
    //         }
    //       }
    //     }
    //   }

    //   if (this.newMember.role && this.newMember.role > '') {
    //     if (this.movement.roles) {
    //       // console.log(this.movement.roles)
    //       if (typeof this.movement.roles[this.newMember.role] === 'object') {
    //         if (this.movement.roles[this.newMember.role].style) {
    //           return this.movement.roles[this.newMember.role].style.background
    //         }
    //       }
    //     }
    //   }
    //   return 'white'
    // },
    // color: function () {
    //   // set text color
    //   if (this.newMember.overrideStyles && this.newMember.overrideStyles !== 'no-overrideStyles' && this.newMember.overrideStyles[0] !== 'no-overrideStyles') {
    //     if (Array.isArray(this.newMember.overrideStyles)) {
    //       for (var key in this.newMember.overrideStyles) {
    //         if (typeof this.movement.overrideStyles[this.newMember.overrideStyles[key]] === 'object') {
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].style) {
    //             if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].style.colorOverride === true) {
    //               return this.movement.overrideStyles[this.newMember.overrideStyles[key]].style.color
    //             }
    //           }
    //         }
    //       }
    //     } else {
    //       if (typeof this.movement.overrideStyles[this.newMember.overrideStyles] === 'object') {
    //         if (this.movement.overrideStyles[this.newMember.overrideStyles].style) {
    //           // if(this.movement.overrideStyles[this.newMember.overrideStyles].style.colorOverride === true)
    //           // {
    //           return this.movement.overrideStyles[this.newMember.overrideStyles].style.color
    //           // }
    //         }
    //       }
    //     }
    //   }
    //   if (this.newMember.role && this.newMember.role > '') {
    //     if (this.movement.roles) {
    //       if (typeof this.movement.roles[this.newMember.role] === 'object') {
    //         if (this.movement.roles[this.newMember.role].style) {
    //           return this.movement.roles[this.newMember.role].style.color
    //         }
    //       }
    //     }
    //   }
    //   return 'black'
    // },
    // border: function () {
    //   // set border color
    //   if (this.newMember.overrideStyles && this.newMember.overrideStyles !== 'no-overrideStyles' && this.newMember.overrideStyles[0] !== 'no-overrideStyles' && this.newMember.overrideStyles !== 'default' && this.newMember.overrideStyles[0] !== 'default') {
    //     if (Array.isArray(this.newMember.overrideStyles)) {
    //       for (var key in this.newMember.overrideStyles) {
    //         if (typeof this.movement.overrideStyles[this.newMember.overrideStyles[key]] === 'object') {
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].style) {
    //             if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].style.outlineOverride === true) {
    //               return this.movement.overrideStyles[this.newMember.overrideStyles[key]].style.outline
    //             }
    //           }
    //         }
    //       }
    //     } else {
    //       if (typeof this.movement.overrideStyles[this.newMember.overrideStyles] === 'object') {
    //         if (this.movement.overrideStyles[this.newMember.overrideStyles].style) {
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles].style.outlineOverride === true) {
    //             return this.movement.overrideStyles[this.newMember.overrideStyles].style.outline
    //           }
    //         }
    //       }
    //     }
    //   }
    //   if (this.newMember.role && this.newMember.role > '') {
    //     if (this.movement.roles) {
    //       if (typeof this.movement.roles[this.newMember.role] === 'object') {
    //         if (this.movement.roles[this.newMember.role].style) {
    //           // if(this.movement.roles[this.newMember.role].style.outlineOverride === true)
    //           // {
    //           return this.movement.roles[this.newMember.role].style.outline
    //           // }
    //         }
    //       }
    //     }
    //   }
    //   return 'white'
    // },
    // underline: function () {
    //   // console.log(this.movement.newMemberRoles[this.newMember.role].style.outline)
    //   if (this.newMember.overrideStyles && this.newMember.overrideStyles !== 'no-overrideStyles' && this.newMember.overrideStyles[0] !== 'no-overrideStyles') {
    //     if (Array.isArray(this.newMember.overrideStyles)) {
    //       for (var key in this.newMember.overrideStyles) {
    //         if (typeof this.movement.overrideStyles[this.newMember.overrideStyles[key]] === 'object') {
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].style) {
    //             if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].style.underline === true) {
    //               return true
    //             }
    //           }
    //         }
    //       }
    //     } else {
    //       if (typeof this.movement.overrideStyles[this.newMember.overrideStyles] === 'object') {
    //         if (this.movement.overrideStyles[this.newMember.overrideStyles].style) {
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles].style.underline === true) {
    //             return true
    //           }
    //         }
    //       }
    //     }
    //   }
    //   if (this.newMember.role && this.newMember.role > '') {
    //     if (this.movement.roles) {
    //       if (typeof this.movement.roles[this.newMember.role] === 'object') {
    //         if (this.movement.roles[this.newMember.role].style) {
    //           if (this.movement.roles[this.newMember.role].style.underline === true) {
    //             return true
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return false
    // },
    // rounded: function () {
    //   // console.log(this.newMember.overrideStyles)
    //   // console.log(this.newMember.role)
    //   // console.log(this.newMember.overrideStyles && this.newMember.overrideStyles !== "no-overrideStyles" && this.newMember.overrideStyles[0] !== "no-overrideStyles")
    //   if (this.newMember.overrideStyles && this.newMember.overrideStyles !== 'no-overrideStyles' && this.newMember.overrideStyles[0] !== 'no-overrideStyles') {
    //     if (Array.isArray(this.newMember.overrideStyles)) {
    //       for (var key in this.newMember.overrideStyles) {
    //         if (typeof this.movement.overrideStyles[this.newMember.overrideStyles[key]] === 'object') {
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].style) {
    //             if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].style.round === true) {
    //               return true
    //             }
    //           }
    //         }
    //       }
    //     } else {
    //       if (typeof this.movement.overrideStyles[this.newMember.overrideStyles] === 'object') {
    //         if (this.movement.overrideStyles[this.newMember.overrideStyles].style) {
    //           // console.log(this.movement.overrideStyles[this.newMember.overrideStyles].style)
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles].style.round === true) {
    //             return true
    //           }
    //         }
    //       }
    //     }
    //   }
    //   if (this.newMember.role && this.newMember.role > '') {
    //     if (this.movement.roles) {
    //       if (typeof this.movement.roles[this.newMember.role] === 'object') {
    //         if (this.movement.roles[this.newMember.role].style) {
    //           if (this.movement.roles[this.newMember.role].style.round === true) {
    //             return true
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return false
    // },
    // prependIcons: function () {
    //   var res = ''
    //   if (this.newMember.overrideStyles && this.newMember.overrideStyles !== 'no-overrideStyles' && this.newMember.overrideStyles[0] !== 'no-overrideStyles') {
    //     if (Array.isArray(this.newMember.overrideStyles)) {
    //       for (var key in this.newMember.overrideStyles) {
    //         if (typeof this.movement.overrideStyles[this.newMember.overrideStyles[key]] === 'object') {
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].icon > '') {
    //             if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].style.prepend === true) {
    //               res += `[${this.movement.overrideStyles[this.newMember.overrideStyles[key]].icon}]`
    //             }
    //           }
    //         }
    //       }
    //     } else {
    //       if (typeof this.movement.overrideStyles[this.newMember.overrideStyles] === 'object') {
    //         if (this.movement.overrideStyles[this.newMember.overrideStyles].icon > '') {
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles].style.prepend === true) {
    //             res += `[${this.movement.overrideStyles[this.newMember.overrideStyles].icon}]`
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return res
    // },
    // appendIcons: function () {
    //   var res = ''
    //   if (this.newMember.overrideStyles && this.newMember.overrideStyles !== 'no-overrideStyles' && this.newMember.overrideStyles[0] !== 'no-overrideStyles') {
    //     if (Array.isArray(this.newMember.overrideStyles)) {
    //       for (var key in this.newMember.overrideStyles) {
    //         if (typeof this.movement.overrideStyles[this.newMember.overrideStyles[key]] === 'object') {
    //           if (this.movement.overrideStyles[this.newMember.overrideStyles[key]].icon > '') {
    //             if (!this.movement.overrideStyles[this.newMember.overrideStyles[key]].style.prepend) {
    //               res += `[${this.movement.overrideStyles[this.newMember.overrideStyles[key]].icon}]`
    //             }
    //           }
    //         }
    //       }
    //     } else {
    //       if (typeof this.movement.overrideStyles[this.newMember.overrideStyles] === 'object') {
    //         if (this.movement.overrideStyles[this.newMember.overrideStyles].icon > '') {
    //           if (!this.movement.overrideStyles[this.newMember.overrideStyles[key]].style.prepend) {
    //             res += `[${this.movement.overrideStyles[this.newMember.overrideStyles[key]].icon}]`
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return res
    // },
    // parent: function () {
    //   // console.log(this.newMember.parent)
    //   for (var key in this.movement.possibleParents) {
    //     if (this.newMember.parent) {
    //       if (this.movement.possibleParents[key].value === this.newMember.parent) {
    //         return this.movement.possibleParents[key].text
    //       }
    //     } else {
    //       if (this.movement.possibleParents[key].value === this.parentVal) {
    //         return this.movement.possibleParents[key].text
    //       }
    //     }
    //   }
    //   return 'No Parent'
    // }
  },
  components: {
    // LabelEdit
  },
};
</script>
