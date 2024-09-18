/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "cinza-padrao": "#E0DCE4",
        "cinza-habilitado": "#6B6572",
        "roxo-padrao": "#5518D9",
        "roxo-desabilitado": "#DDD2EF",
        "laranja-padrao": "#F28627",
        "laranja-desabilitado": "#F9D9B4",
        "verde-padrao": "#2D6C4A",
        "verde-desabilitado": "#BFE3D0",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

