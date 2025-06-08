import Color from "color";

let lastPrimaryColor = "";
export const syncColor = () => {
  const colorVariables = [
    { name: "light-3", mixColor: "#fff", weight: 0.3 },
    { name: "light-5", mixColor: "#fff", weight: 0.5 },
    { name: "light-7", mixColor: "#fff", weight: 0.7 },
    { name: "light-8", mixColor: "#fff", weight: 0.8 },
    { name: "light-9", mixColor: "#fff", weight: 0.9 },
    { name: "dark-2", mixColor: "#000", weight: 0.2 },
  ];
  let dom = document.documentElement;
  const primaryColor = getComputedStyle(dom)
    .getPropertyValue("--el-color-primary")
    .trim();
  if (!primaryColor || primaryColor === lastPrimaryColor) return;

  let baseColor = Color(primaryColor);
  // 生成衍生颜色
  colorVariables.forEach(({ name, mixColor, weight }) => {
    const varName = `--el-color-primary-${name}`;
    const newColor = baseColor.mix(Color(mixColor), weight);
    dom.style.setProperty(varName, newColor.rgb().string());
  });
};
