import { ref, onMounted, withCtx, createTextVNode, useSSRContext, unref, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./AuthenticatedLayout-DOO5XuOO.js";
import { Head } from "@inertiajs/vue3";
import { Chart, Title, Tooltip, Legend, ArcElement, PieController } from "chart.js";
import { _ as _sfc_main$2 } from "./Heading-BV5XIhQ-.js";
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
    const totalStorage = ref(0);
    const usedStorage = ref(0);
    const availableStorage = ref(0);
    const fetchStorageData = async () => {
      try {
        const response = await fetch("/api/file-manager/storage-sizes");
        const { usedStorage: usedStorage2, availableStorage: availableStorage2 } = await response.json();
        usedStorage2.value = usedStorage2.images + usedStorage2.documents + usedStorage2.videos;
        storageData.value = [
          usedStorage2.images,
          usedStorage2.videos,
          usedStorage2.documents,
          availableStorage2
        ];
        drawChart();
      } catch (error) {
        console.error("Failed to fetch storage sizes:", error);
      }
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-618a2b0f>`);
      _push(ssrRenderComponent(_sfc_main$2, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Storage Usage`);
          } else {
            return [
              createTextVNode("Storage Usage")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<canvas data-v-618a2b0f></canvas><p data-v-618a2b0f>Total Storage: ${ssrInterpolate(formatSize(totalStorage.value))}</p><p data-v-618a2b0f>Used Storage: ${ssrInterpolate(formatSize(usedStorage.value))}</p><p data-v-618a2b0f>Available Storage: ${ssrInterpolate(formatSize(availableStorage.value))}</p></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PieChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PieChart = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-618a2b0f"]]);
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$3, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(PieChart, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Dashboard" }),
              createVNode("div", null, [
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
