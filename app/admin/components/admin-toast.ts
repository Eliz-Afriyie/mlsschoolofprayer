import type { AdminActionState } from "../actions";

export const adminToastEvent = "admin-toast";

export function showAdminToast(state: AdminActionState) {
  window.dispatchEvent(
    new CustomEvent<AdminActionState>(adminToastEvent, {
      detail: state,
    })
  );
}
