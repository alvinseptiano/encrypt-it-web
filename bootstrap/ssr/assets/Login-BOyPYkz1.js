import { computed, mergeProps, useSSRContext, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./GuestLayout-UngZep-1.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5 } from "./TextInput-Dg4nfphw.js";
import { P as PrimaryButton } from "./PrimaryButton-CbzYxQ0I.js";
import { usePage, useForm, Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      required: true
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
        class: "checkbox"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  setup(__props) {
    const page = usePage();
    const form = useForm({
      email: "",
      password: "",
      remember: false,
      _token: page.props.csrf
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent2, _scopeId));
            if (_ctx.$page.props.flash.message) {
              _push2(`<div class="alert"${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.message)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.status) {
              _push2(`<div class="mb-4 text-sm font-medium"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-base-100 flex justify-center"${_scopeId}><div class="mx-64 mt-20 min-w-96 rounded-xl p-4"${_scopeId}><h1 class="text-center text-3xl font-extrabold"${_scopeId}>Sign in</h1><form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 block"${_scopeId}><label class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "remember",
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="ms-2 text-sm"${_scopeId}>Remember me</span></label></div><div class="mt-16 block"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex flex-col items-start gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/register",
              class: "text-sm underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create new account`);
                } else {
                  return [
                    createTextVNode("Create new account")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "text-sm underline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forgot your password? `);
                  } else {
                    return [
                      createTextVNode(" Forgot your password? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log in `);
                } else {
                  return [
                    createTextVNode(" Log in ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></form></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Log in" }),
              _ctx.$page.props.flash.message ? (openBlock(), createBlock("div", {
                key: 0,
                class: "alert"
              }, toDisplayString(_ctx.$page.props.flash.message), 1)) : createCommentVNode("", true),
              __props.status ? (openBlock(), createBlock("div", {
                key: 1,
                class: "mb-4 text-sm font-medium"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("div", { class: "bg-base-100 flex justify-center" }, [
                createVNode("div", { class: "mx-64 mt-20 min-w-96 rounded-xl p-4" }, [
                  createVNode("h1", { class: "text-center text-3xl font-extrabold" }, "Sign in"),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$3, {
                        for: "email",
                        value: "Email"
                      }),
                      createVNode(_sfc_main$4, {
                        id: "email",
                        type: "email",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        required: "",
                        autofocus: "",
                        autocomplete: "username"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.email
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(_sfc_main$3, {
                        for: "password",
                        value: "Password"
                      }),
                      createVNode(_sfc_main$4, {
                        id: "password",
                        type: "password",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: "",
                        autocomplete: "current-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.password
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mt-4 block" }, [
                      createVNode("label", { class: "flex items-center" }, [
                        createVNode(_sfc_main$1, {
                          name: "remember",
                          checked: unref(form).remember,
                          "onUpdate:checked": ($event) => unref(form).remember = $event
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("span", { class: "ms-2 text-sm" }, "Remember me")
                      ])
                    ]),
                    createVNode("div", { class: "mt-16 block" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "flex flex-col items-start gap-3" }, [
                          createVNode(unref(Link), {
                            href: "/register",
                            class: "text-sm underline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Create new account")
                            ]),
                            _: 1
                          }),
                          __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                            key: 0,
                            href: _ctx.route("password.request"),
                            class: "text-sm underline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Forgot your password? ")
                            ]),
                            _: 1
                          }, 8, ["href"])) : createCommentVNode("", true)
                        ]),
                        createVNode(PrimaryButton, {
                          class: { "opacity-25": unref(form).processing },
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Log in ")
                          ]),
                          _: 1
                        }, 8, ["class", "disabled"])
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
