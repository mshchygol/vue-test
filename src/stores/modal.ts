import { ref } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const showModal = ref(false);

  function open() {
    showModal.value = true;
  }

  function close() {
    showModal.value = false;
  }

  return { showModal, open, close };
});
