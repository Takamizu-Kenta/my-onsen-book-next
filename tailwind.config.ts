import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // 他にスタイルを適用したいディレクトリがあれば追加
  ],
  // その他の設定...
}
export default config
