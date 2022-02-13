export default function () {
  // eslint-disable-next-line no-console
  console.log('moduleのテスト')

  this.nuxt.hook('ready', async nuxt => {
    // eslint-disable-next-line no-console
    // console.log(this)
    // eslint-disable-next-line no-console
    console.log('Nuxt is ready')
  })
}
