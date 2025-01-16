import { ref, computed, onMounted, unref, withCtx, createVNode, withDirectives, vModelText, openBlock, createBlock, createTextVNode, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-DOO5XuOO.js";
import { MagnifyingGlassCircleIcon, ArrowDownCircleIcon, TrashIcon, DocumentIcon, FolderOpenIcon, EllipsisVerticalIcon } from "@heroicons/vue/24/outline";
import "@heroicons/vue/24/solid";
const _sfc_main = {
  __name: "MyFiles",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const fileItems = ref([]);
    const searchQuery = ref("");
    const selectedItems = ref([]);
    const filteredItems = computed(() => {
      if (!searchQuery.value) {
        return fileItems.value;
      }
      const query = searchQuery.value.toLowerCase();
      return fileItems.value.filter(
        (item) => item.name.toLowerCase().includes(query)
      );
    });
    const allSelected = computed(() => {
      return filteredItems.value.length > 0 && selectedItems.value.length === filteredItems.value.length;
    });
    const toggleSelectAll = () => {
      if (allSelected.value) {
        selectedItems.value = [];
      } else {
        selectedItems.value = [...filteredItems.value];
      }
    };
    const toggleSelectItem = (item) => {
      const index = selectedItems.value.indexOf(item);
      if (index === -1) {
        selectedItems.value.push(item);
      } else {
        selectedItems.value.splice(index, 1);
      }
    };
    const fetchItems = async () => {
      try {
        const response = await axios.get(`/api/file-manager?path=${""}`);
        fileItems.value = response.data.items;
        selectedItems.value = [];
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    const deleteItems = async (itemsToDelete) => {
      if (!confirm(
        `Are you sure you want to delete ${itemsToDelete.length} item(s)?`
      ))
        return;
      try {
        await axios.delete("/api/file-manager/delete", {
          data: {
            items: itemsToDelete.map((item) => ({
              path: item.path,
              is_file: item.is_file
            }))
          }
        });
        fetchItems();
      } catch (error) {
        console.error("Error deleting items:", error);
      }
    };
    const downloadItems = (itemsToDownload) => {
      itemsToDownload.forEach((item) => {
        if (item.is_file) {
          window.open(
            `/api/file-manager/download/${encodeURIComponent(item.path)}`,
            "_blank"
          );
        }
      });
    };
    const formatSize = (bytes) => {
      const units = ["B", "KB", "MB", "GB"];
      let size = bytes;
      let unitIndex = 0;
      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }
      return `${size.toFixed(1)} ${units[unitIndex]}`;
    };
    const formatDate = (timestamp) => {
      return new Date(timestamp * 1e3).toLocaleString();
    };
    onMounted(() => {
      fileItems.value = props.items;
      fetchItems();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "My Files" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-[85vh] w-full flex-col gap-4"${_scopeId}><div${_scopeId}><div class="flex justify-center"${_scopeId}></div><div class="mt-4 flex justify-center gap-2"${_scopeId}><label class="input"${_scopeId}><span class="label"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MagnifyingGlassCircleIcon), { class: "size-6" }, null, _parent2, _scopeId));
            _push2(`</span><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Cari.."${_scopeId}></label>`);
            if (selectedItems.value.length > 0) {
              _push2(`<button class="btn btn-success"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ArrowDownCircleIcon), { class: "mr-2 size-5" }, null, _parent2, _scopeId));
              _push2(` Download Selected </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (selectedItems.value.length > 0) {
              _push2(`<button class="btn btn-error"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(TrashIcon), { class: "mr-2 size-5" }, null, _parent2, _scopeId));
              _push2(` Delete Selected </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex-1 overflow-auto"${_scopeId}><table class="table-pin-rows table-pin-cols table-sm table w-full"${_scopeId}><thead class="bg-base-300"${_scopeId}><tr${_scopeId}><th style="${ssrRenderStyle({ "width": "5%" })}"${_scopeId}><input type="checkbox" class="checkbox"${ssrIncludeBooleanAttr(allSelected.value) ? " checked" : ""}${_scopeId}></th><th class="py-3 text-left text-xs font-medium uppercase"${_scopeId}> Name </th><th class="py-3 text-left text-xs font-medium uppercase" style="${ssrRenderStyle({ "width": "10%" })}"${_scopeId}> Size </th><th class="py-3 text-left text-xs font-medium uppercase" style="${ssrRenderStyle({ "width": "10%" })}"${_scopeId}> Last Modified </th><th class="py-3 text-left text-xs font-medium uppercase" style="${ssrRenderStyle({ "width": "5%" })}"${_scopeId}> Actions </th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(filteredItems.value, (item) => {
              _push2(`<tr class="hover"${_scopeId}><td${_scopeId}><input type="checkbox" class="checkbox"${ssrIncludeBooleanAttr(selectedItems.value.includes(item)) ? " checked" : ""}${_scopeId}></td><td class="max-w-[250px] cursor-pointer truncate py-4 text-ellipsis whitespace-nowrap"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
              if (item.is_file) {
                _push2(`<span${_scopeId}>`);
                _push2(ssrRenderComponent(unref(DocumentIcon), { class: "size-5" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              } else {
                _push2(`<span${_scopeId}>`);
                _push2(ssrRenderComponent(unref(FolderOpenIcon), { class: "text-accent size-5" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              }
              _push2(`<span class="tooltip tooltip-bottom"${ssrRenderAttr("data-tooltip", item.name)}${_scopeId}>${ssrInterpolate(item.name)}</span></div></td><td class="py-4 text-sm"${_scopeId}>${ssrInterpolate(item.is_file ? formatSize(item.size) : "-")}</td><td class="py-4 text-sm"${_scopeId}>${ssrInterpolate(item.is_file ? formatDate(item.last_modified) : "-")}</td><td class="py-4 text-sm"${_scopeId}><div class="dropdown dropdown-end"${_scopeId}><button tabindex="0" class="btn btn-ghost"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(EllipsisVerticalIcon), { class: "size-5" }, null, _parent2, _scopeId));
              _push2(`</button><ul tabindex="0" class="menu dropdown-content rounded-box bg-base-200 p-2 shadow"${_scopeId}>`);
              if (item.is_file) {
                _push2(`<li${_scopeId}><button${_scopeId}>`);
                _push2(ssrRenderComponent(unref(MagnifyingGlassCircleIcon), { class: "text-info size-5" }, null, _parent2, _scopeId));
                _push2(` Inspect </button></li>`);
              } else {
                _push2(`<!---->`);
              }
              if (item.is_file) {
                _push2(`<li${_scopeId}><button${_scopeId}>`);
                _push2(ssrRenderComponent(unref(ArrowDownCircleIcon), { class: "text-success size-5" }, null, _parent2, _scopeId));
                _push2(` Download </button></li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<li${_scopeId}><button class="text-error"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(TrashIcon), { class: "text-error size-5" }, null, _parent2, _scopeId));
              _push2(` Delete </button></li></ul></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-[85vh] w-full flex-col gap-4" }, [
                createVNode("div", null, [
                  createVNode("div", { class: "flex justify-center" }),
                  createVNode("div", { class: "mt-4 flex justify-center gap-2" }, [
                    createVNode("label", { class: "input" }, [
                      createVNode("span", { class: "label" }, [
                        createVNode(unref(MagnifyingGlassCircleIcon), { class: "size-6" })
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        type: "text",
                        placeholder: "Cari.."
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ])
                    ]),
                    selectedItems.value.length > 0 ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: ($event) => downloadItems(selectedItems.value),
                      class: "btn btn-success"
                    }, [
                      createVNode(unref(ArrowDownCircleIcon), { class: "mr-2 size-5" }),
                      createTextVNode(" Download Selected ")
                    ], 8, ["onClick"])) : createCommentVNode("", true),
                    selectedItems.value.length > 0 ? (openBlock(), createBlock("button", {
                      key: 1,
                      onClick: ($event) => deleteItems(selectedItems.value),
                      class: "btn btn-error"
                    }, [
                      createVNode(unref(TrashIcon), { class: "mr-2 size-5" }),
                      createTextVNode(" Delete Selected ")
                    ], 8, ["onClick"])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "flex-1 overflow-auto" }, [
                  createVNode("table", { class: "table-pin-rows table-pin-cols table-sm table w-full" }, [
                    createVNode("thead", { class: "bg-base-300" }, [
                      createVNode("tr", null, [
                        createVNode("th", { style: { "width": "5%" } }, [
                          createVNode("input", {
                            type: "checkbox",
                            class: "checkbox",
                            checked: allSelected.value,
                            onClick: toggleSelectAll
                          }, null, 8, ["checked"])
                        ]),
                        createVNode("th", { class: "py-3 text-left text-xs font-medium uppercase" }, " Name "),
                        createVNode("th", {
                          class: "py-3 text-left text-xs font-medium uppercase",
                          style: { "width": "10%" }
                        }, " Size "),
                        createVNode("th", {
                          class: "py-3 text-left text-xs font-medium uppercase",
                          style: { "width": "10%" }
                        }, " Last Modified "),
                        createVNode("th", {
                          class: "py-3 text-left text-xs font-medium uppercase",
                          style: { "width": "5%" }
                        }, " Actions ")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredItems.value, (item) => {
                        return openBlock(), createBlock("tr", {
                          key: item.path,
                          class: "hover"
                        }, [
                          createVNode("td", null, [
                            createVNode("input", {
                              type: "checkbox",
                              class: "checkbox",
                              checked: selectedItems.value.includes(item),
                              onClick: ($event) => toggleSelectItem(item)
                            }, null, 8, ["checked", "onClick"])
                          ]),
                          createVNode("td", { class: "max-w-[250px] cursor-pointer truncate py-4 text-ellipsis whitespace-nowrap" }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              item.is_file ? (openBlock(), createBlock("span", { key: 0 }, [
                                createVNode(unref(DocumentIcon), { class: "size-5" })
                              ])) : (openBlock(), createBlock("span", { key: 1 }, [
                                createVNode(unref(FolderOpenIcon), { class: "text-accent size-5" })
                              ])),
                              createVNode("span", {
                                class: "tooltip tooltip-bottom",
                                "data-tooltip": item.name
                              }, toDisplayString(item.name), 9, ["data-tooltip"])
                            ])
                          ]),
                          createVNode("td", { class: "py-4 text-sm" }, toDisplayString(item.is_file ? formatSize(item.size) : "-"), 1),
                          createVNode("td", { class: "py-4 text-sm" }, toDisplayString(item.is_file ? formatDate(item.last_modified) : "-"), 1),
                          createVNode("td", { class: "py-4 text-sm" }, [
                            createVNode("div", { class: "dropdown dropdown-end" }, [
                              createVNode("button", {
                                tabindex: "0",
                                class: "btn btn-ghost"
                              }, [
                                createVNode(unref(EllipsisVerticalIcon), { class: "size-5" })
                              ]),
                              createVNode("ul", {
                                tabindex: "0",
                                class: "menu dropdown-content rounded-box bg-base-200 p-2 shadow"
                              }, [
                                item.is_file ? (openBlock(), createBlock("li", { key: 0 }, [
                                  createVNode("button", {
                                    onClick: ($event) => unref(router).get(
                                      `/hextable/${encodeURIComponent(item.path)}`
                                    )
                                  }, [
                                    createVNode(unref(MagnifyingGlassCircleIcon), { class: "text-info size-5" }),
                                    createTextVNode(" Inspect ")
                                  ], 8, ["onClick"])
                                ])) : createCommentVNode("", true),
                                item.is_file ? (openBlock(), createBlock("li", { key: 1 }, [
                                  createVNode("button", {
                                    onClick: ($event) => downloadItems([item])
                                  }, [
                                    createVNode(unref(ArrowDownCircleIcon), { class: "text-success size-5" }),
                                    createTextVNode(" Download ")
                                  ], 8, ["onClick"])
                                ])) : createCommentVNode("", true),
                                createVNode("li", null, [
                                  createVNode("button", {
                                    onClick: ($event) => deleteItems([item]),
                                    class: "text-error"
                                  }, [
                                    createVNode(unref(TrashIcon), { class: "text-error size-5" }),
                                    createTextVNode(" Delete ")
                                  ], 8, ["onClick"])
                                ])
                              ])
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/MyFiles.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
