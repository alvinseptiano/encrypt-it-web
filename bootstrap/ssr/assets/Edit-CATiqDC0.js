import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CUNQJe2q.js";
import _sfc_main$4 from "./DeleteUserForm-DrswXCa_.js";
import _sfc_main$3 from "./UpdatePasswordForm-9wPlcJov.js";
import _sfc_main$2 from "./UpdateProfileInformationForm-0HMAXwKh.js";
import { Head } from "@inertiajs/vue3";
import "@heroicons/vue/24/solid";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./InputError-D7Pvlg8p.js";
import "./TextInput-C_DOY57T.js";
import "./PrimaryButton-CbzYxQ0I.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Profile" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-4"${_scopeId}><h2 class="divider text-xl font-bold"${_scopeId}>Edit Akun</h2><div class="flex h-full flex-col overflow-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              "must-verify-email": __props.mustVerifyEmail,
              status: __props.status,
              class: "max-w-xl pl-2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { class: "my-8 max-w-xl pl-2" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, { class: "max-w-xl pl-2" }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode("h2", { class: "divider text-xl font-bold" }, "Edit Akun"),
                createVNode("div", { class: "flex h-full flex-col overflow-auto" }, [
                  createVNode(_sfc_main$2, {
                    "must-verify-email": __props.mustVerifyEmail,
                    status: __props.status,
                    class: "max-w-xl pl-2"
                  }, null, 8, ["must-verify-email", "status"]),
                  createVNode(_sfc_main$3, { class: "my-8 max-w-xl pl-2" }),
                  createVNode(_sfc_main$4, { class: "max-w-xl pl-2" })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
