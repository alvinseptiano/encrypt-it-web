import { ref, onMounted, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-DOO5XuOO.js";
import { usePage, router } from "@inertiajs/vue3";
import axios from "axios";
import { ArrowLeftIcon, DocumentIcon } from "@heroicons/vue/24/solid";
const _sfc_main = {
  __name: "HexTable",
  __ssrInlineRender: true,
  setup(__props) {
    const hexData = ref([]);
    const error = ref(null);
    const fileName = ref("");
    const loading = ref(true);
    const { props } = usePage();
    const loadFileContent = async () => {
      var _a, _b;
      try {
        loading.value = true;
        const filePath = props.filePath;
        const response = await axios.get(
          `/api/file-manager/content/${encodeURIComponent(filePath)}`,
          {
            path: encodeURIComponent(filePath),
            responseType: "arraybuffer"
          }
        );
        const buffer = new Uint8Array(response.data);
        const hexRows = [];
        for (let i = 0; i < buffer.length; i += 16) {
          const chunk = buffer.slice(i, i + 16);
          const hex = Array.from(chunk).map(
            (byte) => byte.toString(16).padStart(2, "0").toUpperCase()
          );
          const text = Array.from(chunk).map(
            (byte) => byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : "."
          ).join("");
          hexRows.push({
            offset: i.toString(16).padStart(8, "0").toUpperCase(),
            hex,
            text
          });
        }
        hexData.value = hexRows;
        fileName.value = props.filePath.split("/").pop();
        error.value = null;
      } catch (err) {
        error.value = ((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || "An error occurred while loading the file";
        hexData.value = [];
      } finally {
        loading.value = false;
      }
    };
    const goBack = () => {
      router.visit("/myfiles");
    };
    onMounted(async () => {
      try {
        const response = await loadFileContent();
        hexData.value = response;
      } catch (error2) {
        console.error("Error fetching data:", error2);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-[85vh] w-full flex-col"${_scopeId}><div class="bg-base-200 flex justify-between overflow-hidden rounded-lg p-4"${_scopeId}><button class="btn btn-ghost gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ArrowLeftIcon), { class: "size-5" }, null, _parent2, _scopeId));
            _push2(` Back </button><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DocumentIcon), { class: "size-5" }, null, _parent2, _scopeId));
            _push2(`<div class="text- w-32 flex-1 truncate text-lg font-medium"${_scopeId}>${ssrInterpolate(fileName.value)}</div></div></div>`);
            if (loading.value) {
              _push2(`<div class="flex flex-1 items-center justify-center"${_scopeId}><span class="loading loading-spinner loading-lg"${_scopeId}></span></div>`);
            } else if (error.value) {
              _push2(`<div class="text-error bg-error/10 rounded-lg p-4"${_scopeId}>${ssrInterpolate(error.value)}</div>`);
            } else if (hexData.value.length) {
              _push2(`<div class="mt-10 flex-1 overflow-auto"${_scopeId}><table class="table-pin-cols table-pin-rows table-sm table w-full font-mono"${_scopeId}><thead class="bg-base-200"${_scopeId}><tr${_scopeId}><th class="p-2 text-left"${_scopeId}>Offset</th><!--[-->`);
              ssrRenderList(16, (i) => {
                _push2(`<th class="p-2 text-center"${_scopeId}>${ssrInterpolate((i - 1).toString(16).padStart(2, "0").toUpperCase())}</th>`);
              });
              _push2(`<!--]--><th class="p-2 pl-4 text-left"${_scopeId}>ASCII</th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(hexData.value, (row) => {
                _push2(`<tr class="hover:bg-base-200"${_scopeId}><td class="text-accent p-2"${_scopeId}>${ssrInterpolate(row.offset)}</td><!--[-->`);
                ssrRenderList(row.hex, (byte, index) => {
                  _push2(`<td class="p-2 text-center font-medium"${_scopeId}>${ssrInterpolate(byte)}</td>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(16 - row.hex.length, (i) => {
                  _push2(`<td class="text-base-content/30 p-2 text-center"${_scopeId}> -- </td>`);
                });
                _push2(`<!--]--><td class="p-2 pl-4 font-medium"${_scopeId}><div class="flex gap-[3.5px]"${_scopeId}><!--[-->`);
                ssrRenderList(row.text, (char, index) => {
                  _push2(`<span class="w-[8.5px] text-center"${_scopeId}>${ssrInterpolate(char)}</span>`);
                });
                _push2(`<!--]--></div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-[85vh] w-full flex-col" }, [
                createVNode("div", { class: "bg-base-200 flex justify-between overflow-hidden rounded-lg p-4" }, [
                  createVNode("button", {
                    onClick: goBack,
                    class: "btn btn-ghost gap-2"
                  }, [
                    createVNode(unref(ArrowLeftIcon), { class: "size-5" }),
                    createTextVNode(" Back ")
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode(unref(DocumentIcon), { class: "size-5" }),
                    createVNode("div", { class: "text- w-32 flex-1 truncate text-lg font-medium" }, toDisplayString(fileName.value), 1)
                  ])
                ]),
                loading.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex flex-1 items-center justify-center"
                }, [
                  createVNode("span", { class: "loading loading-spinner loading-lg" })
                ])) : error.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-error bg-error/10 rounded-lg p-4"
                }, toDisplayString(error.value), 1)) : hexData.value.length ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "mt-10 flex-1 overflow-auto"
                }, [
                  createVNode("table", { class: "table-pin-cols table-pin-rows table-sm table w-full font-mono" }, [
                    createVNode("thead", { class: "bg-base-200" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "p-2 text-left" }, "Offset"),
                        (openBlock(), createBlock(Fragment, null, renderList(16, (i) => {
                          return createVNode("th", {
                            key: i,
                            class: "p-2 text-center"
                          }, toDisplayString((i - 1).toString(16).padStart(2, "0").toUpperCase()), 1);
                        }), 64)),
                        createVNode("th", { class: "p-2 pl-4 text-left" }, "ASCII")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(hexData.value, (row) => {
                        return openBlock(), createBlock("tr", {
                          key: row.offset,
                          class: "hover:bg-base-200"
                        }, [
                          createVNode("td", { class: "text-accent p-2" }, toDisplayString(row.offset), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(row.hex, (byte, index) => {
                            return openBlock(), createBlock("td", {
                              key: index,
                              class: "p-2 text-center font-medium"
                            }, toDisplayString(byte), 1);
                          }), 128)),
                          (openBlock(true), createBlock(Fragment, null, renderList(16 - row.hex.length, (i) => {
                            return openBlock(), createBlock("td", {
                              key: "empty-" + i,
                              class: "text-base-content/30 p-2 text-center"
                            }, " -- ");
                          }), 128)),
                          createVNode("td", { class: "p-2 pl-4 font-medium" }, [
                            createVNode("div", { class: "flex gap-[3.5px]" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.text, (char, index) => {
                                return openBlock(), createBlock("span", {
                                  key: index,
                                  class: "w-[8.5px] text-center"
                                }, toDisplayString(char), 1);
                              }), 128))
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/HexTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
