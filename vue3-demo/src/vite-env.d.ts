/// <reference types="vite/client" />
/// <reference types="../components.d.ts" />

// 声明vue文件类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
