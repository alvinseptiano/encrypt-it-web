import { mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString, useSSRContext, ref, onMounted, watch } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderSlot } from "vue/server-renderer";
import { Link, usePage } from "@inertiajs/vue3";
import { HomeIcon, ArrowUpOnSquareStackIcon, DocumentDuplicateIcon, UserIcon, ExclamationCircleIcon, SunIcon, MoonIcon } from "@heroicons/vue/24/solid";
const _sfc_main$3 = {
  __name: "MenuItem",
  __ssrInlineRender: true,
  props: {
    icon: {
      type: Object,
      required: true
    },
    isOpen: { type: Boolean },
    link: { type: String },
    tip: { type: String },
    name: { type: String, required: true }
  },
  setup(__props) {
    const isActive = (path) => {
      return window.location.pathname.startsWith(path) || window.location.pathname === "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: "tooltip tooltip-top z-50 text-center",
        "data-tip": __props.tip
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/${__props.link}`,
        class: [
          "flex flex-col items-center justify-center rounded-lg text-center",
          {
            "bg-primary/10": isActive(`/${__props.link}`)
          }
        ]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(__props.icon), {
              class: [
                "size-6",
                {
                  "text-primary": isActive(`/${__props.link}`)
                }
              ]
            }, null), _parent2, _scopeId);
            _push2(`<span class="${ssrRenderClass([{ "text-primary": isActive(`/${__props.link}`) }, "mt-1 text-xs"])}"${_scopeId}>${ssrInterpolate(__props.name)}</span>`);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(__props.icon), {
                class: [
                  "size-6",
                  {
                    "text-primary": isActive(`/${__props.link}`)
                  }
                ]
              }, null, 8, ["class"])),
              createVNode("span", {
                class: [{ "text-primary": isActive(`/${__props.link}`) }, "mt-1 text-xs"]
              }, toDisplayString(__props.name), 3)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/MenuItem.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "NavItem",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(HomeIcon),
        link: "dashboard",
        tip: "Dashboard",
        name: "Home"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(ArrowUpOnSquareStackIcon),
        link: "uploadfile",
        tip: "Upload File",
        name: "Upload"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(DocumentDuplicateIcon),
        link: "myfiles",
        tip: "My Files",
        name: "Files"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(UserIcon),
        link: "profile",
        tip: "Profile",
        name: "Profile"
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "TopBar",
  __ssrInlineRender: true,
  setup(__props) {
    const user = usePage().props.auth.user;
    usePage();
    const currentTheme = ref("nord");
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme && (savedTheme === "nord" || savedTheme === "dim")) {
        applyTheme(savedTheme);
      } else {
        applyTheme("nord");
      }
    };
    const applyTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      currentTheme.value = theme;
      localStorage.setItem("theme", theme);
    };
    onMounted(() => {
      initializeTheme();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="navbar"><div class="navbar-start"><div class="dropdown"><div tabindex="0" role="button" class="btn btn-circle btn-ghost pl-1">`);
      _push(ssrRenderComponent(unref(ExclamationCircleIcon), { class: "h-6 w-6" }, null, _parent));
      _push(`</div><ul tabindex="0" class="menu dropdown-content rounded-box bg-base-200 z-[1] mt-3 w-52 p-2"><li><button onclick="about_modal.showModal()"> Tentang </button></li></ul></div></div><div class="navbar-center"><a class="btn btn-ghost text-xl">Encrypt it</a></div><div class="navbar-end"><div class="dropdown dropdown-end"><div tabindex="0" role="button" class="btn rounded-btn">${ssrInterpolate(unref(user).name)}</div><ul tabindex="0" class="menu dropdown-content rounded-box bg-base-200 z-[1] mt-4 w-52 p-2"><li><form><button type="submit">Logout</button></form></li></ul></div><label class="swap swap-rotate mx-4"><input type="checkbox" class="theme-controller hidden"${ssrIncludeBooleanAttr(currentTheme.value === "dim") ? " checked" : ""}>`);
      _push(ssrRenderComponent(unref(SunIcon), { class: "swap-off size-5" }, null, _parent));
      _push(ssrRenderComponent(unref(MoonIcon), { class: "swap-on size-5" }, null, _parent));
      _push(`</label></div></div><dialog id="about_modal" class="modal"><div class="modal-box"><h3 class="text-lg font-bold">Tentang Encrypt It</h3><p class="py-4"> Aplikasi web untuk mengenkripsi dan dekripsi file menggunakan algoritma <b><i>ChaCha20-Poly1305</i></b>. <br><br><cite>Alvin Septiano</cite></p><div class="modal-action"><form method="dialog"><button class="btn">Tutup</button></form></div></div></dialog><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TopBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(localStorage.getItem("sidebarOpen") === "true" || false);
    watch(isOpen, (newValue) => {
      localStorage.setItem("sidebarOpen", newValue);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-base-100 fixed size-full min-h-svh" }, _attrs))}><div class="bg-base-300 fixed top-0 right-0 left-0 z-50 m-4 rounded-lg">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><div class="md:bg-base-300 hidden justify-center md:fixed md:top-24 md:left-0 md:ml-4 md:flex md:h-[calc(100vh-7rem)] md:flex-col md:rounded-lg"><ul class="menu w-14 gap-5">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</ul></div><div class="flex h-full flex-col gap-4 overflow-auto pt-20 md:pl-20"><main class="flex-1 p-8 pb-28 md:ml-4 md:pb-8 md:pl-4">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><div class="bg-base-300 fixed right-0 bottom-0 left-0 z-50 md:hidden"><div class="flex flex-row justify-center p-2"><ul class="menu menu-horizontal bg-base-300 rounded-box justify-center gap-5">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</ul></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
