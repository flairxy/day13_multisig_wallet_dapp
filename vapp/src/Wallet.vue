<template>
  <div>
    <div class="container">
      <h1 class="text-center">Multisig</h1>

      <div class="row">
        <div class="col-sm-12">
          <p>
            <b>{{ activeAccount }}</b>
          </p>
          <p>
            Balance: <b>{{ activeBalance }}</b> wei
          </p>
        </div>
      </div>

      <div
        class="row"
        v-if="!currentTransfer || currentTransfer.approvals === quorum"
      >
        <div class="col-sm-12">
          <h2>Create transfer</h2>
          <form @submit.prevent="createTransfer">
            <div class="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                v-model="amount"
                class="form-control"
                id="amount"
              />
            </div>
            <div class="form-group">
              <label htmlFor="to">To</label>
              <input
                type="text"
                v-model="address"
                class="form-control"
                id="to"
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <div class="row" v-else>
        <div class="col-sm-12">
          <h2>Approve transfer</h2>
          <ul>
            <li>TransferId: {{ currentTransfer.id }}</li>
            <li>Amount: {{ currentTransfer.amount }}</li>
            <li>Approvals: {{ currentTransfer.approvals }}</li>
          </ul>

          <button
            v-if="!currentTransfer.alreadyApproved"
            type="submit"
            class="btn btn-primary"
            @click.prevent="sendTransfer"
          >
            Submit
          </button>
          <p v-else>Already approved</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    amount: 100,
    address: "",
    key: 0,
  }),
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance"]),
    ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
    ...mapGetters({
      quorum: "getQuorum",
      currentTransfer: "getCurrentTransfer",
    }),
  },
  methods: {
    createTransfer() {
      this.drizzleInstance.contracts.Multisig.methods
        .createTransfer(this.amount, this.address)
        .send({ from: this.activeAccount })
        .then(() => {
          this.updateCurrentTransfer();
        });
    },
    getCurrentTransfer() {
      this.drizzleInstance.contracts.Multisig.methods.transfers().call();
    },
    sendTransfer() {
      this.drizzleInstance.contracts.Multisig.methods
        .sendTransfer(this.currentTransfer.id)
        .send()
        .then(() => {
          this.updateCurrentTransfer();
        });
    },
    async updateCurrentTransfer() {
      const contract = this.drizzleInstance.contracts.Multisig;
      const currentTransferId = (await contract.methods.nextId().call()) - 1;
      if (currentTransferId >= 0) {
        const currentTransfer = await contract.methods
          .transfers(currentTransferId)
          .call();
        const alreadyApproved = await contract.methods
          .approvals(this.activeAccount, currentTransferId)
          .call();
        this.$store.dispatch("setCurrentTransfer", {
          ...currentTransfer,
          alreadyApproved,
        });
      }
      const quorum = await contract.methods.quorum().call();
      this.$store.dispatch("setQuorum", quorum);
    },
  },
  created() {
    this.updateCurrentTransfer();
  },
};
</script>
