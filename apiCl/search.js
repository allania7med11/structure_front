const globby = require("globby")
// eslint-disable-next-line no-unused-vars
const search = async function() {
  const rtn = await globby([
    ".nuxt/dist/client/*.js",
    ".nuxt/dist/client/img/*.png"
  ])
  return rtn.map(cv2 => cv2.replace(".nuxt/dist/client", "_nuxt"))
}
export { search }
