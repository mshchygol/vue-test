<script setup lang="ts">
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
} from "@vuelidate/validators";
import CustomModal from "./CustomModal.vue";
import { ref } from "vue";
import { useModalStore } from "@/stores/modal";
import { useSnackbar } from "vue3-snackbar";

const modalStore = useModalStore();
const snackbar = useSnackbar();
const showLoader = ref(false);

const initialForm = {
  name: null,
  email: null,
  phone: null,
  notes: null,
};

const form = reactive({ ...initialForm });

const phoneValidator = helpers.withMessage(
  "Phone must be 10–15 digits",
  helpers.regex(/^\d{10,15}$/),
);
const rules = {
  name: { required, minLength: minLength(2) },
  email: { required, email },
  phone: { required, phoneValidator },
  notes: { maxLength: maxLength(500) },
};
const v$ = useVuelidate(rules, form);

async function submitForm() {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    try {
      showLoader.value = true;
      const res = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      snackbar.add({
        type: "success",
        title: "Submited!",
        text: `Your data was successfully submitted to ${data.url}`,
      });
      closeModal();
    } catch (err) {
      snackbar.add({
        type: "error",
        title: "Not Submited!",
        text: `Your data was not successfully submitted to API, error: ${err}`,
      });
    } finally {
      showLoader.value = false;
    }
  }
}

function closeModal() {
  modalStore.close();
  Object.assign(form, initialForm);
  v$.value.$reset();
}
</script>
<template>
  <Teleport to="body">
    <CustomModal :show="modalStore.showModal" @close="closeModal">
      <template #header>
        <h3>Contact Us</h3>
      </template>
      <template #body>
        <form id="form" @submit.prevent="submitForm" class="form">
          <div v-if="showLoader" class="loader">
            <img
              alt="Vue logo"
              class="logo"
              src="@/assets/logo.svg"
              width="35"
              height="35"
            />
          </div>
          <div>
            <p>
              <label for="name">Name</label>
            </p>
            <input
              v-model="form.name"
              id="name"
              name="name"
              @blur="v$.name.$touch"
              type="text"
              :class="{ 'input-error': v$.name.$invalid && v$.name.$dirty }"
            />
            <p v-if="v$.name.$invalid && v$.name.$dirty">
              <span v-if="v$.name.required.$invalid">Name is required.</span>
              <span v-if="v$.name.minLength.$invalid"
                >Minimum 2 characters.</span
              >
            </p>
          </div>

          <div>
            <p>
              <label for="email">Email</label>
            </p>
            <input
              v-model="form.email"
              id="email"
              name="email"
              @blur="v$.email.$touch"
              type="email"
              :class="{ 'input-error': v$.email.$invalid && v$.email.$dirty }"
            />
            <p v-if="v$.email.$invalid && v$.email.$dirty">
              <span v-if="v$.email.required.$invalid">Email is required.</span>
              <span v-if="v$.email.email.$invalid">Invalid email format.</span>
            </p>
          </div>

          <div>
            <p>
              <label for="phone">Phone</label>
            </p>
            <input
              v-model="form.phone"
              id="phone"
              name="phone"
              @blur="v$.phone.$touch"
              type="text"
              :class="{ 'input-error': v$.phone.$invalid && v$.phone.$dirty }"
            />
            <p v-if="v$.phone.$invalid && v$.phone.$dirty">
              <span v-if="v$.phone.required.$invalid">Phone is required.</span>
              <span v-if="v$.phone.phoneValidator.$invalid"
                >Phone must be 10–15 digits.</span
              >
            </p>
          </div>

          <div>
            <p>
              <label for="notes">Notes</label>
            </p>
            <textarea
              v-model="form.notes"
              id="notes"
              name="notes"
              rows="4"
              @blur="v$.notes.$touch"
              :class="{ 'input-error': v$.notes.$invalid && v$.notes.$dirty }"
            />
            <p v-if="v$.notes.$invalid && v$.notes.$dirty">
              <span v-if="v$.notes.maxLength.$invalid"
                >Notes must be under 500 characters.</span
              >
            </p>
          </div>
        </form>
      </template>
      <template #footer>
        <div class="footer-container">
          <button
            type="submit"
            form="form"
            :disabled="showLoader"
            class="button primary-button"
          >
            Submit
          </button>
          <button
            type="button"
            @click="closeModal"
            class="button secondary-button"
          >
            {{ showLoader ? "Hide" : "Cancel" }}
          </button>
        </div>
      </template>
    </CustomModal>
  </Teleport>
</template>

<style scoped>
form {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

span {
  color: red;
  font-size: 0.875rem;
}

.input-error {
  border: 1px solid red;
  background-color: #ffe6e6;
}

.footer-container {
  display: flex;
  justify-content: space-around;
}

.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
}

.loader img {
  animation: spin 1s linear infinite;
  position: relative;
  top: 50%;
  left: 50%;
  margin-left: -17px;
  margin-top: -17px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 400px) {
  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
</style>
