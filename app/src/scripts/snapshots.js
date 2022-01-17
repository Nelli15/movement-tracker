import { getFirestore, setDoc, doc } from "@firebase/firestore";
import { Loading, Notify } from 'quasar'

export function updateSnapshot () {
addSnapshot() {
      // start loading
      Loading.show();

      // get snapshot details
      const tempSnap = {
        // title: this.snapshotDetails.title,
        color: this.color,
        backgroundColor: this.backgroundColor,
        trees: this.trees,
        // roles: this.roles,
        // mods: this.mods,
        complexStats: this.complexStats,
        roleStats: this.roleStats,
        modStats: this.modStats,
        // calcStats: this.calcStats,
        totals: this.totalStats,
        // date: new Date(),
        createdBy: this.user,
        // deleted: false,
        members: this.members,
        // title: '',
        // desc: '',
        date: new Date()
      };
      // console.log(tempSnap)
      // create snapshot on server
      const nowDate = new Date();
      // console.log(
      //   `/movements/${this.$route.params.movId}/snapshots`,
      //   nowDate.getMonth() + "-" + nowDate.getFullYear(),
      //   tempSnap
      // );
      setDoc(
        doc(
          getFirestore(),
          `/movements/${
            this.$route.params.movId
          }/snapshots/${nowDate.getMonth()}-${nowDate.getFullYear()}`
        ),
        tempSnap,
        { merge: true }
      )
        .then(res => {
          // stop loading
          Loading.hide();
          // show notification

          // close menu and reset snapshot details
          Notify.create({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Snapshot Saved"
          });
          if (this.$route.name !== "snapshots")
            this.$router.push({ name: "snapshots" });
          this.fetchSnapshots({ id: this.$route.params.movId });
          return true;
        })
        .catch(err => {
          Loading.hide();
          if (process.env.PROD) logEvent(getAnalytics(), "exception", {
            description: err,
            fatal: false
          });
          console.error(new Error("Oops, something went wrong: " + err));

          Notify.create({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!"
          });
          return false;
        });
    }
}