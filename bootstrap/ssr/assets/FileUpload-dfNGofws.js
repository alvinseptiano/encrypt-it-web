import { ref, onMounted, withCtx, unref, createTextVNode, createVNode, withDirectives, vModelText, withModifiers, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import axios from "axios";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-DOO5XuOO.js";
import { _ as _sfc_main$2 } from "./Heading-BV5XIhQ-.js";
import { useForm, Head } from "@inertiajs/vue3";
import { TrashIcon } from "@heroicons/vue/24/solid";
const _sfc_main = {
  __name: "FileUpload",
  __ssrInlineRender: true,
  emits: ["upload-success"],
  setup(__props, { emit: __emit }) {
    const loading = ref(false);
    const success = ref(false);
    const error = ref(null);
    const uploading = ref(false);
    const fileInput = ref(null);
    const progress = ref(0);
    const startTime = ref(null);
    const processingTime = ref(0);
    const uploadSpeed = ref(0);
    const estimatedTimeRemaining = ref(0);
    const emit = __emit;
    onMounted(() => {
      var _a;
      const token = (_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.content;
      if (token) {
        axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
      }
    });
    const form = useForm({
      files: [],
      // Holds the files for upload
      passphrase: "",
      nonce: ""
    });
    const formatTime = (seconds) => {
      if (seconds < 60) {
        return `${seconds.toFixed(1)} seconds`;
      }
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds.toFixed(0)}s`;
    };
    const calculateSpeed = (loaded, elapsed) => {
      const speed = loaded / (elapsed / 1e3);
      if (speed > 1e6) {
        return `${(speed / 1e6).toFixed(2)} MB/s`;
      }
      if (speed > 1e3) {
        return `${(speed / 1e3).toFixed(2)} KB/s`;
      }
      return `${speed.toFixed(2)} B/s`;
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const handleFileSelect = (event) => {
      const files = Array.from(event.target.files);
      form.files = files;
      error.value = null;
      success.value = false;
      progress.value = 0;
      processingTime.value = null;
      uploadSpeed.value = 0;
      estimatedTimeRemaining.value = null;
    };
    const removeFile = (index) => {
      form.files.splice(index, 1);
      if (form.files.length === 0) {
        fileInput.value.value = "";
      }
      processingTime.value = null;
      uploadSpeed.value = 0;
      estimatedTimeRemaining.value = null;
    };
    const uploadFile = async () => {
      if (!form.files.length) return;
      uploading.value = true;
      loading.value = true;
      form.post("/api/file-manager/upload", {
        onUploadProgress: (progressEvent) => {
          progress.value = Math.round(
            progressEvent.loaded * 100 / progressEvent.total
          );
          const currentTime = Date.now();
          const elapsed = (currentTime - startTime.value) / 1e3;
          progress.value = Math.round(
            progressEvent.loaded * 100 / progressEvent.total
          );
          uploadSpeed.value = calculateSpeed(
            progressEvent.loaded,
            currentTime - startTime.value
          );
          const remainingBytes = progressEvent.total - progressEvent.loaded;
          const bytesPerSecond = progressEvent.loaded / elapsed;
          estimatedTimeRemaining.value = remainingBytes / bytesPerSecond;
        },
        preserveScroll: true,
        // Prevent scrolling on submission
        onFinish: () => {
          uploading.value = false;
          progress.value = 0;
          fileInput.value.value = "";
          form.reset();
          success.value = true;
          loading.value = false;
          emit("upload-success", []);
          processingTime.value = (Date.now() - startTime.value) / 1e3;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Upload File" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`File Upload`);
                } else {
                  return [
                    createTextVNode("File Upload")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex h-screen w-full flex-col"${_scopeId}><div class="flex flex-col gap-8 overflow-auto md:flex-row"${_scopeId}><div class="flex flex-1 flex-col gap-4"${_scopeId}><label class="input"${_scopeId}><span class="label min-w-24"${_scopeId}>Passphrase</span><input type="text" id="passphrase"${ssrRenderAttr("value", unref(form).passphrase)}${ssrIncludeBooleanAttr(!unref(form).files.length) ? " disabled" : ""} placeholder=". . . ."${_scopeId}></label><label class="input"${_scopeId}><span class="label min-w-24"${_scopeId}>Nonce</span><input class="" type="text" id="nonce"${ssrRenderAttr("value", unref(form).nonce)}${ssrIncludeBooleanAttr(!unref(form).files.length) ? " disabled" : ""} placeholder=". . . ."${_scopeId}></label><input type="file" multiple class="file-input file-input-bordered"${_scopeId}><button class="btn btn-primary w-fit"${ssrIncludeBooleanAttr(unref(form).files.length === 0 || uploading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(uploading.value ? "Uploading..." : "Upload & Encrypt")}</button><div class="my-4 flex-1"${_scopeId}><div class="bg-base-300 min-h-48 w-full rounded-lg p-4"${_scopeId}><div class="flex flex-col"${_scopeId}><div class="mb-4 flex items-center gap-2"${_scopeId}><div class="badge font-bold"${_scopeId}>Output:</div></div><div class="flex flex-1 flex-col justify-between md:flex-row"${_scopeId}><div class="flex flex-col gap-4"${_scopeId}><div${_scopeId}><span${_scopeId}>${ssrInterpolate(progress.value === 0 ? "Tidak ada proses.." : progress.value < 100 ? "Mengunggah berlangsung.." : "Selesai mengunggah..")}</span>`);
            if (loading.value) {
              _push2(`<span class="loading loading-spinner text-primary ml-4"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><span${_scopeId}>Speed: ${ssrInterpolate(uploadSpeed.value)}</span></div><div class="font-mono"${_scopeId}> ETA: ${ssrInterpolate(formatTime(
              estimatedTimeRemaining.value ?? 0
            ))}</div></div><div class="radial-progress text-primary mr-10" style="${ssrRenderStyle({
              "--value": progress.value,
              "--size": "6rem",
              "--thickness": "1rem"
            })}" role="progressbar"${_scopeId}>${ssrInterpolate(progress.value)}% </div></div></div></div></div></div><div class="flex flex-1 flex-col"${_scopeId}><div class="h-full w-full rounded-lg"${_scopeId}>`);
            if (unref(form).files.length > 0) {
              _push2(`<div class="w-full"${_scopeId}><h3 class="text-center text-lg font-semibold"${_scopeId}> Selected Files </h3><div class="h-[500px] overflow-y-auto"${_scopeId}><ul class="menu menu-md rounded-box w-full justify-start"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).files, (file, index) => {
                _push2(`<li class="flex flex-row items-center justify-start rounded-lg p-3"${_scopeId}><div class="flex min-w-0 flex-1 flex-col items-start justify-start gap-1"${_scopeId}><span class="max-w-[200px] truncate overflow-hidden text-left text-sm text-ellipsis hover:overflow-visible hover:whitespace-normal"${ssrRenderAttr("title", file.name)}${_scopeId}>${ssrInterpolate(file.name)}</span><span class="badge badge-outline text-left text-xs"${_scopeId}>${ssrInterpolate(formatFileSize(file.size))}</span></div><button class="btn btn-ghost" type="button"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(TrashIcon), { class: "text-error size-5" }, null, _parent2, _scopeId));
                _push2(`</button></li>`);
              });
              _push2(`<!--]--></ul></div></div>`);
            } else {
              _push2(`<div class="mt-4 w-full text-center text-gray-500"${_scopeId}> No files selected. </div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Upload File" }),
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createTextVNode("File Upload")
                ]),
                _: 1
              }),
              createVNode("div", { class: "flex h-screen w-full flex-col" }, [
                createVNode("div", { class: "flex flex-col gap-8 overflow-auto md:flex-row" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-4" }, [
                    createVNode("label", { class: "input" }, [
                      createVNode("span", { class: "label min-w-24" }, "Passphrase"),
                      withDirectives(createVNode("input", {
                        type: "text",
                        id: "passphrase",
                        "onUpdate:modelValue": ($event) => unref(form).passphrase = $event,
                        disabled: !unref(form).files.length,
                        placeholder: ". . . ."
                      }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                        [vModelText, unref(form).passphrase]
                      ])
                    ]),
                    createVNode("label", { class: "input" }, [
                      createVNode("span", { class: "label min-w-24" }, "Nonce"),
                      withDirectives(createVNode("input", {
                        class: "",
                        type: "text",
                        id: "nonce",
                        "onUpdate:modelValue": ($event) => unref(form).nonce = $event,
                        disabled: !unref(form).files.length,
                        placeholder: ". . . ."
                      }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                        [vModelText, unref(form).nonce]
                      ])
                    ]),
                    createVNode("input", {
                      ref_key: "fileInput",
                      ref: fileInput,
                      type: "file",
                      multiple: "",
                      class: "file-input file-input-bordered",
                      onChange: handleFileSelect
                    }, null, 544),
                    createVNode("button", {
                      onClick: withModifiers(uploadFile, ["prevent"]),
                      class: "btn btn-primary w-fit",
                      disabled: unref(form).files.length === 0 || uploading.value
                    }, toDisplayString(uploading.value ? "Uploading..." : "Upload & Encrypt"), 9, ["disabled"]),
                    createVNode("div", { class: "my-4 flex-1" }, [
                      createVNode("div", { class: "bg-base-300 min-h-48 w-full rounded-lg p-4" }, [
                        createVNode("div", { class: "flex flex-col" }, [
                          createVNode("div", { class: "mb-4 flex items-center gap-2" }, [
                            createVNode("div", { class: "badge font-bold" }, "Output:")
                          ]),
                          createVNode("div", { class: "flex flex-1 flex-col justify-between md:flex-row" }, [
                            createVNode("div", { class: "flex flex-col gap-4" }, [
                              createVNode("div", null, [
                                createVNode("span", null, toDisplayString(progress.value === 0 ? "Tidak ada proses.." : progress.value < 100 ? "Mengunggah berlangsung.." : "Selesai mengunggah.."), 1),
                                loading.value ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "loading loading-spinner text-primary ml-4"
                                })) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("span", null, "Speed: " + toDisplayString(uploadSpeed.value), 1)
                              ]),
                              createVNode("div", { class: "font-mono" }, " ETA: " + toDisplayString(formatTime(
                                estimatedTimeRemaining.value ?? 0
                              )), 1)
                            ]),
                            createVNode("div", {
                              class: "radial-progress text-primary mr-10",
                              style: {
                                "--value": progress.value,
                                "--size": "6rem",
                                "--thickness": "1rem"
                              },
                              role: "progressbar"
                            }, toDisplayString(progress.value) + "% ", 5)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col" }, [
                    createVNode("div", { class: "h-full w-full rounded-lg" }, [
                      unref(form).files.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "w-full"
                      }, [
                        createVNode("h3", { class: "text-center text-lg font-semibold" }, " Selected Files "),
                        createVNode("div", { class: "h-[500px] overflow-y-auto" }, [
                          createVNode("ul", { class: "menu menu-md rounded-box w-full justify-start" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).files, (file, index) => {
                              return openBlock(), createBlock("li", {
                                key: index,
                                class: "flex flex-row items-center justify-start rounded-lg p-3"
                              }, [
                                createVNode("div", { class: "flex min-w-0 flex-1 flex-col items-start justify-start gap-1" }, [
                                  createVNode("span", {
                                    class: "max-w-[200px] truncate overflow-hidden text-left text-sm text-ellipsis hover:overflow-visible hover:whitespace-normal",
                                    title: file.name
                                  }, toDisplayString(file.name), 9, ["title"]),
                                  createVNode("span", { class: "badge badge-outline text-left text-xs" }, toDisplayString(formatFileSize(file.size)), 1)
                                ]),
                                createVNode("button", {
                                  onClick: ($event) => removeFile(index),
                                  class: "btn btn-ghost",
                                  type: "button"
                                }, [
                                  createVNode(unref(TrashIcon), { class: "text-error size-5" })
                                ], 8, ["onClick"])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-4 w-full text-center text-gray-500"
                      }, " No files selected. "))
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FileUpload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
