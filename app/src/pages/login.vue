<template>
  <q-page>
    <!-- <q-parallax
      style="background-color:black
    ;min-height:100vh"
      class="landing-wrapper"
    > -->
    <!-- <template v-slot:media> -->
    <img
      class="orientation-landscape"
      :src="login_image_url"
      :srcset="login_image_srcset"
      sizes="(max-width: 400px) 400w,
            (min-width: 400px) and (max-width: 1050px) 1050w,
            (min-width: 1050px) and (max-width: 1300px) 1300w,
            (min-width: 1300px) and (max-width: 1400px) 1400w,
            (min-width: 1400px) and (max-width: 2000px) 2000w,
            (min-width: 2000px) 4000w"
      style="
        opacity: 0.5;
        filter: alpha(opacity=50);
        min-height: 100vh;
        height: 100vh;
        max-height: 100vh;
        min-width: 100vw;
        object-fit: cover;
      "
    />
    <img
      class="orientation-portrait"
      :src="login_image_url_portrait"
      :srcset="login_image_srcset_portrait"
      sizes="(max-width: 400px) 400w,
            (min-width: 400px) and (max-width: 1050px) 1050w,
            (min-width: 1050px) and (max-width: 1300px) 1300w,
            (min-width: 1300px) and (max-width: 1400px) 1400w,
            (min-width: 1400px) and (max-width: 2000px) 2000w,
            (min-width: 2000px) 4000w"
      style="
        opacity: 0.5;
        filter: alpha(opacity=50);
        min-height: 100vh;
        height: 100vh;
        max-height: 100vh;
        min-width: 100vw;
        width: 100vw;
        max-width: 100vw;
        object-fit: cover;
      "
    />
    <!-- </template> -->

    <!-- <template v-slot:content="scope" style="background-color:black"> -->
    <div
      class="absolute column"
      :style="{
        top: 'calc(40vh - 115px)',
        left: 0,
        right: 0
      }"
    >
      <q-card style="margin-left: auto; margin-right: auto">
        <q-card class="shadow-0" data-cy="login-card">
          <q-card-section>
            <h6 class="text-center q-my-sm" data-cy="login-welcome">
              Welcome to Movement Tracker
            </h6>
            <div class="text-center q-mb-lg" data-cy="instructions">
              Select one of the options below to sign in.
            </div>

            <q-form @submit="signInWithEmail()">
              <div class="row q-gutter-sm q-mx-auto" style="max-width: 250px">
                <q-input
                  filled
                  v-model="login.email"
                  label="Email"
                  lazy-rules
                  type="email"
                  :rules="[val => !!val || 'Email is missing', isValidEmail]"
                  :color="q.dark.isActive ? 'white' : ''"
                  class="full-width"
                  data-cy="signin-email"
                />
                <q-input
                  filled
                  v-model="login.password"
                  label="Password"
                  lazy-rules
                  :type="!pwdVisible ? 'password' : 'text'"
                  :rules="[val => !!val || 'Password is missing']"
                  :color="q.dark.isActive ? 'white' : ''"
                  class="full-width"
                  data-cy="signin-password"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="!pwdVisible ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="pwdVisible = !pwdVisible"
                      data-cy="pwd-visibility"
                    />
                  </template>
                </q-input>
                <q-btn
                  class="full-width"
                  data-cy="signin-submit"
                  no-caps
                  type="submit"
                  style="background-color: #db4437; color: #fff"
                >
                  <img
                    class="firebaseui-idp-icon q-mr-sm"
                    alt=""
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg"
                  />
                  Sign in with Email
                </q-btn>
                <!-- </div> -->

                <q-btn
                  class="full-width"
                  no-caps
                  style="background-color: #fff; color: #000"
                  @click="signInWithProvider('google')"
                  data-cy="signin-with-google"
                >
                  <img
                    class="firebaseui-idp-icon q-mr-sm"
                    alt=""
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  />
                  Sign in with Google
                </q-btn>
                <q-btn
                  class="full-width"
                  no-caps
                  style="background-color: #333333; color: #fff"
                  @click="signInWithProvider('github')"
                  data-cy="signin-with-github"
                >
                  <img
                    class="firebaseui-idp-icon q-mr-sm"
                    alt=""
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg"
                  />
                  Sign in with Github
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
          <q-inner-loading :showing="loginPending" data-cy="login-pending">
            <q-spinner-gears color="primary" size="3em" />
          </q-inner-loading>
        </q-card>
      </q-card>
    </div>
    <!-- </template> -->
    <!-- </q-parallax> -->
  </q-page>
</template>
<script>
// import { httpsCallable } from "firebase/functions";
import { getAnalytics, logEvent } from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  browserPopupRedirectResolver,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail
} from '@firebase/auth';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';

export default {
  setup() {
    const q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const pwdVisible = ref(false);
    const login_image_url = ref('');
    const login_image_srcset = ref('');
    const login_image_url_portrait = ref('');
    const login_image_srcset_portrait = ref('');
    const loginPending = ref(true);
    const login = reactive({
      email: '',
      password: ''
    });

    onMounted(async () => {
      const loginObject = {
        400: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Flogin-background-400.jpg?alt=media&token=d72065ae-7242-4e8e-84bb-f35980efaeb5',
        1050: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Flogin-background-1050.jpg?alt=media&token=61b9fe48-25c2-47f0-aaaa-cffed9b754f7',
        1300: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Flogin-background-1300.jpg?alt=media&token=cbfeb245-f556-4c3d-8a75-1208181887cb',
        1400: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Flogin-background-1400.jpg?alt=media&token=a215e34f-fb12-44d2-82e9-4dcd19a640a6',
        2000: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Flogin-background-2000.jpg?alt=media&token=2fb1726f-ff41-4e2b-a2eb-b17d49c6dfe0',
        4000: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Flogin-background-4000.jpg?alt=media&token=2dfbe02e-89c2-4b16-9004-55beb3403acf'
      };
      const loginObjectPortrait = {
        400: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%201%2Ftyler-nix-KLLcTHE20bI-unsplash-400_x_599.jpg?alt=media&token=0d17a3bb-7bf3-47f1-952f-fe104a8715d5',
        1050: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%201%2Ftyler-nix-KLLcTHE20bI-unsplash-1050_x_1575.jpg?alt=media&token=5acfb1c4-5f16-4046-8e38-53d9abcf5830',
        1300: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%201%2Ftyler-nix-KLLcTHE20bI-unsplash-1300_x_1949.jpg?alt=media&token=8da7f760-ab06-40d3-91ae-eedf9ceb2e0a',
        1400: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%201%2Ftyler-nix-KLLcTHE20bI-unsplash-1400_x_2099.jpg?alt=media&token=7042b883-b804-4e89-ad01-038fdc68c125',
        2000: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%201%2Ftyler-nix-KLLcTHE20bI-unsplash-2000_x_2999.jpg?alt=media&token=1ab11297-dade-443f-807b-264aa4519ac5',
        4000: 'https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%201%2Ftyler-nix-KLLcTHE20bI-unsplash-4000_x_5999.jpg?alt=media&token=fa277515-17a9-4a91-898b-40f341b4759c'
      };
      if (loginObject) {
        login_image_url.value = loginObject['400'];
        login_image_srcset.value = `${loginObject['400']} 400w,
            ${loginObject['1050']} 1050w,
            ${loginObject['1300']} 1300w,
            ${loginObject['1400']} 1400w,
            ${loginObject['2000']} 2000w,
            ${loginObject['4000']} 4000w`;
      }
      if (loginObjectPortrait) {
        login_image_url_portrait.value = loginObjectPortrait['400'];
        login_image_srcset_portrait.value = `${loginObjectPortrait['400']} 400w,
            ${loginObjectPortrait['1050']} 1050w,
            ${loginObjectPortrait['1300']} 1300w,
            ${loginObjectPortrait['1400']} 1400w,
            ${loginObjectPortrait['2000']} 2000w,
            ${loginObjectPortrait['4000']} 4000w`;
        const result = await getRedirectResult(getAuth());
        if (result) {
          // This is the signed-in user
          const user = result.user;
          // This gives you a Facebook Access Token.
          signInSuccessWithAuthResult(result, '/home');
        } else {
          loginPending.value = false;
        }
      }
    });

    function signInWithEmail() {
      // console.log("logging in with email and password");
      return fetchSignInMethodsForEmail(getAuth(), login.email).then(
        methods => {
          console.log(methods);
          if (methods.includes('password')) {
            return signInWithEmailAndPassword(
              getAuth(),
              login.email,
              login.password
            )
              .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                // console.log("Signed in with email: ", userCredential);
                // ...
                console.log('ready to redirect');
                router.push('/home');
              })
              .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(error);
                // if (errorCode === "auth/user-not-found") {
                //   console.log("user not found");
                // }
              });
          } else {
            return createAccountEmail();
          }
        }
      );
    }
    async function signInWithProvider(providerText) {
      // console.log("Signing in with Auth provider");
      let provider = null;
      if (providerText === 'google') {
        provider = new GoogleAuthProvider();
      } else if (providerText === 'github') {
        provider = new GithubAuthProvider();
      }
      signInWithRedirect(getAuth(), provider, browserPopupRedirectResolver)
        .then(res => {
          // console.log("returned");
        })
        .catch(function(error) {
          // An error happened.
          if (error.code === 'auth/account-exists-with-different-credential') {
            // Step 2.
            // User's email already exists.
            // The pending Google credential.
            var pendingCred = error.credential;
            // The provider account's email address.
            var email = error.email;
            // Get sign-in methods for this email.
            fetchSignInMethodsForEmail(getAuth(), email).then(function(
              methods
            ) {
              // Step 3.
              // If the user has several sign-in methods,
              // the first method in the list will be the "recommended" method to use.
              if (methods[0] === 'password') {
                // Asks the user their password.
                // In real scenario, you should handle this asynchronously.
                var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
                auth
                  .signInWithEmailAndPassword(login.email, login.password)
                  .then(function(result) {
                    // Step 4a.
                    return result.user.linkWithCredential(pendingCred);
                  })
                  .then(function() {
                    // Google account successfully linked to the existing Firebase user.
                    goToApp();
                  });
                return;
              }
              // All the other cases are external providers.
              // Construct provider object for that provider.
              // TODO: implement getProviderForProviderId.
              var provider = getProviderForProviderId(methods[0]);
              // At this point, you should let the user know that they already has an account
              // but with a different provider, and let them validate the fact they want to
              // sign in with this provider.
              // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
              // so in real scenario you should ask the user to click on a "continue" button
              // that will trigger the signInWithRedirect.
              signInWithRedirect(provider).then(function(result) {
                // Remember that the user may have signed in with an account that has a different email
                // address than the first one. This can happen as Firebase doesn't control the provider's
                // sign in flow and the user is free to login using whichever account they own.
                // Step 4b.
                // Link to Google credential.
                // As we have access to the pending credential, we can directly call the link method.
                result.user
                  .linkAndRetrieveDataWithCredential(pendingCred)
                  .then(function(usercred) {
                    // Google account successfully linked to the existing Firebase user.
                    goToApp();
                  });
              });
            });
          }
        });
    }
    function signInSuccessWithAuthResult(authResult, redirectUrl) {
      // console.log("blah blah blah");
      // $store.dispatch('fetchCreds')
      // console.log(authResult);
      // var onUserSignIn = httpsCallable($functions, "onUserSignIn");
      // onUserSignIn({ user: getAuth().currentUser })
      //   .then(res => {
      //     // $toasted.global.toast_success("User Signed In!")
      //     return true;
      //   })
      //   .catch(err => {
      //     if (process.env.PROD) logEvent(getAnalytics(), "exception", {
      //       description: err,
      //       fatal: false
      //     });
      //     console.error(new Error("Oops, something went wrong: " + err));
      //   });
      // console.log(authResult)

      if (process.env.DEV)
        logEvent(getAnalytics(), 'login', {
          method: authResult.providerId
        });
      if (
        route.query.signInSuccessUrl &&
        route.query.signInSuccessUrl !== 'login'
      ) {
        router.push(route.query.signInSuccessUrl);
      } else {
        router.push('/home');
      }
    }
    function isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    }
    async function createAccountEmail() {
      // console.log('create account not yet setup');
      return createUserWithEmailAndPassword(
        getAuth(),
        login.email,
        login.password
      )
        .then(() => {
          // Signed in
          router.push('/home');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(error);
          if (error.code === 'auth/account-exists-with-different-credential') {
            // Step 2.
            // User's email already exists.
            // The pending Google credential.
            var pendingCred = error.credential;
            // The provider account's email address.
            var email = error.email;
            // Get sign-in methods for this email.
            fetchSignInMethodsForEmail(getAuth(), email).then(function(
              methods
            ) {
              // console.log(methods);
              // Step 3.
              // If the user has several sign-in methods,
              // the first method in the list will be the "recommended" method to use.
              if (methods[0] === 'password') {
                // Asks the user their password.
                // In real scenario, you should handle this asynchronously.
                var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
                signInWithEmailAndPassword(login.email, login.password)
                  .then(function(result) {
                    // Step 4a.
                    return result.user.linkWithCredential(pendingCred);
                  })
                  .then(function() {
                    // Google account successfully linked to the existing Firebase user.
                    goToApp();
                  });
                return;
              }
              // All the other cases are external providers.
              // Construct provider object for that provider.
              // TODO: implement getProviderForProviderId.
              var provider = getProviderForProviderId(methods[0]);
              // At this point, you should let the user know that they already has an account
              // but with a different provider, and let them validate the fact they want to
              // sign in with this provider.
              // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
              // so in real scenario you should ask the user to click on a "continue" button
              // that will trigger the signInWithRedirect.
              signInWithRedirect(provider).then(function(result) {
                // Remember that the user may have signed in with an account that has a different email
                // address than the first one. This can happen as Firebase doesn't control the provider's
                // sign in flow and the user is free to login using whichever account they own.
                // Step 4b.
                // Link to Google credential.
                // As we have access to the pending credential, we can directly call the link method.
                result.user
                  .linkAndRetrieveDataWithCredential(pendingCred)
                  .then(function(usercred) {
                    // Google account successfully linked to the existing Firebase user.
                    goToApp();
                  });
              });
            });
          }
        });
    }

    return {
      q,
      login_image_url,
      login_image_srcset,
      login_image_url_portrait,
      login_image_srcset_portrait,
      login,
      pwdVisible,
      signInWithEmail,
      signInWithProvider,
      isValidEmail,
      loginPending
    };
  }
};
</script>

<style>
.firebaseui-callback-indicator-container {
  width: 100vh;
  height: 3px;
  position: fixed;
  top: 0px;
  left: 0px;
}

.firebaseui-id-page-callback {
  opacity: 0;
}

.firebaseui-idp-icon {
  border: none;
  display: inline-block;
  vertical-align: middle;
}
.firebaseui-idp-icon {
  height: 18px;
  width: 18px;
}
</style>
