import { ref, onMounted, useSSRContext, withCtx, unref, createTextVNode, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./AuthenticatedLayout-CUNQJe2q.js";
import { _ as _sfc_main$3 } from "./Heading-BV5XIhQ-.js";
import { Head, Link } from "@inertiajs/vue3";
import { Chart, Title, Tooltip, Legend, ArcElement, PieController } from "chart.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@heroicons/vue/24/solid";
const _sfc_main$1 = {
  __name: "PieChart",
  __ssrInlineRender: true,
  setup(__props) {
    Chart.register(Title, Tooltip, Legend, ArcElement, PieController);
    const chartCanvas = ref(null);
    const storageData = ref([]);
    const labels = ["Images", "Videos", "Documents"];
    const colors = ["#FF6384", "#36A2EB", "#FFCE56"];
    ref(0);
    ref(0);
    ref(0);
    const fetchStorageData = async () => {
      try {
        const response = await fetch("/api/file-manager/storage-sizes");
        const { usedStorage, availableStorage } = await response.json();
        usedStorage.value = usedStorage.images + usedStorage.documents + usedStorage.videos;
        storageData.value = [
          // usedStorage.images,
          // usedStorage.videos,
          50,
          30,
          60
          // usedStorage.documents,
          // availableStorage,
        ];
        drawChart();
      } catch (error) {
        console.error("Failed to fetch storage sizes:", error);
      }
    };
    const drawChart = () => {
      if (!chartCanvas.value) return;
      const ctx = chartCanvas.value.getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              data: storageData.value,
              backgroundColor: colors
            }
          ]
        }
      });
    };
    onMounted(() => {
      fetchStorageData();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-b4b149ef><canvas data-v-b4b149ef></canvas></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PieChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PieChart = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b4b149ef"]]);
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="hero min-h-screen"${_scopeId}><div class="hero-content -mt-50 text-center"${_scopeId}><div class="max-w-lg"${_scopeId}><h1 class="text-5xl font-bold capitalize"${_scopeId}> Sistem Keamanan Data dengan menggunakan <i${_scopeId}>ChaCHa20-Poly1305</i></h1><p class="py-6"${_scopeId}> Aplikasi berbasis web untuk mengenkripsi dan dekripsi file menggunakan algoritma ChaCha20-Poly1305. </p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/uploadfile",
              class: "btn btn-primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Upload File`);
                } else {
                  return [
                    createTextVNode("Upload File")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Penyimpanan`);
                } else {
                  return [
                    createTextVNode("Penyimpanan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="h-96 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(PieChart, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Dashboard" }),
              createVNode("div", { class: "hero min-h-screen" }, [
                createVNode("div", { class: "hero-content -mt-50 text-center" }, [
                  createVNode("div", { class: "max-w-lg" }, [
                    createVNode("h1", { class: "text-5xl font-bold capitalize" }, [
                      createTextVNode(" Sistem Keamanan Data dengan menggunakan "),
                      createVNode("i", null, "ChaCHa20-Poly1305")
                    ]),
                    createVNode("p", { class: "py-6" }, " Aplikasi berbasis web untuk mengenkripsi dan dekripsi file menggunakan algoritma ChaCha20-Poly1305. "),
                    createVNode(unref(Link), {
                      href: "/uploadfile",
                      class: "btn btn-primary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Upload File")
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              createVNode(_sfc_main$3, null, {
                default: withCtx(() => [
                  createTextVNode("Penyimpanan")
                ]),
                _: 1
              }),
              createVNode("div", { class: "h-96 w-full" }, [
                createVNode(PieChart)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
