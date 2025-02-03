import { withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-UngZep-1.js";
import { _ as _sfc_main$2 } from "./InputError-D7Pvlg8p.js";
import { useForm, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center"${_scopeId}><div class="mx-64 mt-10 min-w-96 rounded-xl p-4"${_scopeId}><form${_scopeId}><fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"${_scopeId}><legend class="fieldset-legend text-2xl"${_scopeId}> Sign Up </legend><label class="fieldset-label"${_scopeId}>Name</label><input id="name" type="text" class="input"${ssrRenderAttr("value", unref(form).name)} placeholder="name" required${_scopeId}><label class="fieldset-label"${_scopeId}>Email</label><input id="email" type="email" class="input"${ssrRenderAttr("value", unref(form).email)} placeholder="Email" required${_scopeId}><label class="fieldset-label"${_scopeId}>Password</label><input id="password" type="password" class="input"${ssrRenderAttr("value", unref(form).password)} required${_scopeId}><label class="fieldset-label"${_scopeId}>Confirm Password</label><input id="password_confirmation" type="password" class="input"${ssrRenderAttr("value", unref(form).password_confirmation)} required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-8 block"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex flex-col items-start gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "rounded-md text-sm underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Already registered? `);
                } else {
                  return [
                    createTextVNode(" Already registered? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "btn btn-neutral mt-4"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Register </button></fieldset></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center" }, [
                createVNode("div", { class: "mx-64 mt-10 min-w-96 rounded-xl p-4" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("fieldset", { class: "fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" }, [
                      createVNode("legend", { class: "fieldset-legend text-2xl" }, " Sign Up "),
                      createVNode("label", { class: "fieldset-label" }, "Name"),
                      withDirectives(createVNode("input", {
                        id: "name",
                        type: "text",
                        class: "input",
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        placeholder: "name",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).name]
                      ]),
                      createVNode("label", { class: "fieldset-label" }, "Email"),
                      withDirectives(createVNode("input", {
                        id: "email",
                        type: "email",
                        class: "input",
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        placeholder: "Email",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).email]
                      ]),
                      createVNode("label", { class: "fieldset-label" }, "Password"),
                      withDirectives(createVNode("input", {
                        id: "password",
                        type: "password",
                        class: "input",
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).password]
                      ]),
                      createVNode("label", { class: "fieldset-label" }, "Confirm Password"),
                      withDirectives(createVNode("input", {
                        id: "password_confirmation",
                        type: "password",
                        class: "input",
                        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).password_confirmation]
                      ]),
                      createVNode(_sfc_main$2, {
                        class: "mt-2",
                        message: unref(form).errors.password
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$2, {
                        class: "mt-2",
                        message: unref(form).errors.name
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$2, {
                        class: "mt-2",
                        message: unref(form).errors.email
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$2, {
                        class: "mt-2",
                        message: unref(form).errors.password
                      }, null, 8, ["message"]),
                      createVNode(_sfc_main$2, {
                        class: "mt-2",
                        message: unref(form).errors.password_confirmation
                      }, null, 8, ["message"]),
                      createVNode("div", { class: "mt-8 block" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex flex-col items-start gap-3" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("login"),
                              class: "rounded-md text-sm underline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Already registered? ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ])
                      ]),
                      createVNode("button", {
                        class: ["btn btn-neutral mt-4", { "opacity-25": unref(form).processing }],
                        disabled: unref(form).processing
                      }, " Register ", 10, ["disabled"])
                    ])
                  ], 32)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
