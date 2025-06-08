import ConfirmVue from "./index.vue";
import { h, render } from "vue";
import type { ConfirmOptions } from "./type";
import { appContext } from "@/utils/appContext.ts";

export function Confirm<T>(options: ConfirmOptions<T>) {
  return new Promise<T | null>((resolve, reject) => {
    const container = document.createElement("div");
    const instance = h(ConfirmVue<T>, {
      title: options.title,
      content: options.content,
      icon: options.icon,
      onOk: options.onOk,
      destroy: () => {
        render(null, container);
        document.body.removeChild(container);
      },
      resolve: (res: T | null) => {
        options.onClose?.(res);
        resolve(res);
      },
    });

    instance.appContext = appContext.value!;

    document.body.appendChild(container);
    render(instance, container);
  });
}
